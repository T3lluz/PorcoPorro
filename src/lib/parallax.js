import { useEffect, useRef } from 'react'

/* ---------------------------------------------------------------------------
   The falling camera.

   One rAF-throttled scroll pass measures where things are and publishes a
   handful of numbers; CSS decides what they mean. Nothing here animates
   anything itself, which keeps the motion vocabulary in one place — the
   stylesheets — instead of split across two languages.

   The numbers, all of them optional at every point of use:

     --sy    how far the page has fallen, in px. The sky layers read it, each
             with its own coefficient, so the far clouds creep and the near ones
             rush.
     --fall  the same thing over the first viewport only, 0 to 1. The hero
             lettering sinks and fades on this, so it is gone before the first
             pass has finished covering it.
     --lift  --fall eased out — 1 - (1 - f)². The boarding passes ride up on it
             so they climb faster than the page for exactly as long as the hero
             is in the way. Its slope at f = 1 is zero, so the extra speed bleeds
             away to nothing as the hero lets go; a linear ramp would arrive at
             the handover still moving and the page would visibly change gear.
     --s     per element: 0 dead centre, -1 below the frame, +1 above. Multiply
             it by an angle and a card tips towards you on the way up and away
             on the way out.
     --c     per element: 1 - |s|, how centred it is. Drives the slight swell as
             a pass passes the lens.

   WHERE these get written is the performance story, and it is the whole reason
   this file is shaped the way it is.

   They used to go on :root. Custom properties inherit, so a write to :root
   invalidates style for every element in the document — on a phone, sixty times
   a second, for a page with a live map embed in it. That was most of the scroll
   jank, and no amount of tuning the values fixes it, because the cost is not in
   the numbers, it is in who has to be told about them.

   So each value is written on the smallest element whose subtree actually reads
   it: --sy on the two cloud layers, --fall on .hero (its lettering, rig and
   prop-wash are all inside it), --lift on <main>. Nothing outside those
   subtrees is disturbed by a scroll. See watch(), below.
--------------------------------------------------------------------------- */

const items = new Set() // elements wanting --s / --c
const cams = new Map() // element -> { names, last }
let queued = false
let listening = false

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n)

/** Someone who has asked for less motion gets a camera that holds still. */
export const stillCamera = () =>
  globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

function tick() {
  queued = false
  const vh = globalThis.innerHeight || 1

  // Read every rect before writing a single property. Interleaving reads and
  // writes would invalidate layout on each pass and force a reflow per element.
  const reads = []
  for (const el of items) {
    const { top, height } = el.getBoundingClientRect()
    reads.push([el, top, height])
  }

  // A visitor who has asked for no motion gets none. Leaving these unwritten is
  // what keeps the sky still and the hero unpinned — every rule that reads them
  // falls back to 0.
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
        // Nothing is written unless it actually changed. --fall and --lift stop
        // moving after the first viewport and --sy stops when you stop, so most
        // frames of a long scroll touch one element instead of three.
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
 * Have the camera write the named values on this element, and only this
 * element. Pick the shallowest node whose subtree needs them — that subtree is
 * exactly what a scroll will cost.
 * @param {Element} el
 * @param {...('sy'|'fall'|'lift')} names
 * @returns {() => void} a stop function, so it can be returned from useEffect.
 */
export function watch(el, ...names) {
  cams.set(el, { names, last: {} })
  listen()
  schedule()

  return () => {
    cams.delete(el)
    for (const name of names) el.style.removeProperty(`--${name}`)
    listen()
  }
}

/** Ref-flavoured `watch`. */
export function useCamera(...names) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return watch(el, ...names)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

/** @returns {() => void} an unregister function. */
export function register(el) {
  items.add(el)
  listen()
  schedule()

  return () => {
    items.delete(el)
    for (const prop of ['--s', '--c']) el.style.removeProperty(prop)
    listen()
  }
}

/** Ref-flavoured `register`, for components that only need the one element. */
export default function useParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || stillCamera()) return
    return register(el)
  }, [])

  return ref
}
