import { useLayoutEffect, useRef } from 'react'

/*
  One rAF-throttled scroll pass publishes numbers as custom properties; CSS
  decides what they mean. Nothing here animates anything itself.

    --sy    scroll offset in px. Each cloud layer reads it with its own rate.
    --fall  the same over the first viewport only, 0 to 1.
    --lift  --fall eased out, 1 - (1 - f)². Slope is 0 at f = 1, so the passes
            stop climbing without a visible change of gear.
    --s     per element: 0 centred, -1 below the frame, +1 above.
    --c     per element: 1 - |s|.

  Each value goes on the shallowest element whose subtree reads it, never on
  :root. Custom properties inherit, so a write to :root invalidates style for
  the whole document sixty times a second, map iframe included.

  Registering ticks synchronously and the hooks are layout effects, so the first
  values land before the first paint. Left on requestAnimationFrame they arrived
  a frame late, and a reload part-way down the page painted one frame with the
  sky at its top position and the passes unlifted before snapping into place.
*/

const items = new Set() // elements wanting --s / --c
const cams = new Map() // element -> { names, last }
let queued = false
let listening = false

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n)

export const stillCamera = () =>
  globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

function tick() {
  queued = false
  const vh = globalThis.innerHeight || 1

  // Every read before any write, or each write forces a reflow for the next.
  const reads = []
  for (const el of items) {
    const { top, height } = el.getBoundingClientRect()
    reads.push([el, top, height])
  }

  // Leaving these unwritten is what holds the sky still under reduced motion:
  // every rule that reads them falls back to 0.
  if (!stillCamera()) {
    const y = globalThis.scrollY
    const fall = clamp01(y / vh)
    const value = {
      sy: `${Math.round(y)}px`,
      fall: fall.toFixed(3),
      lift: (1 - (1 - fall) ** 2).toFixed(3),
    }

    for (const [el, cam] of cams) {
      for (const name of cam.names) {
        const next = value[name]
        // --fall and --lift stop moving after one viewport, so most frames of a
        // long scroll touch one element instead of three.
        if (cam.last[name] === next) continue
        cam.last[name] = next
        el.style.setProperty(`--${name}`, next)
      }
    }
  }

  for (const [el, top, height] of reads) {
    const s = clamp01((vh - top) / (height + vh)) * 2 - 1
    el.style.setProperty('--s', s.toFixed(3))
    el.style.setProperty('--c', (1 - Math.abs(s)).toFixed(3))
  }
}

function schedule() {
  if (queued) return
  queued = true
  requestAnimationFrame(tick)
}

/** Listen exactly while something still wants the numbers. */
function listen() {
  const on = cams.size > 0 || items.size > 0
  if (on === listening) return
  listening = on
  if (on) {
    globalThis.addEventListener('scroll', schedule, { passive: true })
    globalThis.addEventListener('resize', schedule)
  } else {
    globalThis.removeEventListener('scroll', schedule)
    globalThis.removeEventListener('resize', schedule)
  }
}

/**
 * Write the named values on this element only. Pick the shallowest node whose
 * subtree needs them: that subtree is what a scroll costs.
 * @param {Element} el
 * @param {...('sy'|'fall'|'lift')} names
 * @returns {() => void} stop function, for the layout effect below.
 */
export function watch(el, ...names) {
  cams.set(el, { names, last: {} })
  listen()
  tick()

  return () => {
    cams.delete(el)
    for (const name of names) el.style.removeProperty(`--${name}`)
    listen()
  }
}

/** Ref-flavoured `watch`. */
export function useCamera(...names) {
  const ref = useRef(null)
  // The rest array is a new object every render, so key the effect on the names.
  const key = names.join(',')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    return watch(el, ...key.split(','))
  }, [key])

  return ref
}

/** @returns {() => void} unregister function. */
export function register(el) {
  items.add(el)
  listen()
  tick()

  return () => {
    items.delete(el)
    for (const prop of ['--s', '--c']) el.style.removeProperty(prop)
    listen()
  }
}

/** Ref-flavoured `register`, for components needing only the one element. */
export default function useParallax() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || stillCamera()) return
    return register(el)
  }, [])

  return ref
}
