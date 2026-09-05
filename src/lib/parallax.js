import { useEffect, useRef } from 'react'

/* ---------------------------------------------------------------------------
   The falling camera.

   One rAF-throttled scroll pass writes four numbers and lets CSS do the rest:

     --sy  on :root — how far the page has fallen, in px. The sky layers read
           it directly, each with its own coefficient, so the far clouds creep
           and the near ones rush.

   and, on every registered element:

     --p   0 the moment its top edge appears at the bottom of the screen,
           1 the moment its bottom edge leaves at the top
     --s   the same thing signed: -1 below, 0 dead centre, +1 above. This is
           the useful one — multiply it by an angle and a card tips towards you
           on the way up and away from you on the way out.
     --c   1 - |s|: how centred the element is. Drives the slight swell as a
           pass passes the lens.

   Nothing here animates anything itself. It publishes where things are and
   the stylesheets decide what that means, which keeps the motion vocabulary
   in one place — CSS — instead of split across two languages.
--------------------------------------------------------------------------- */

const items = new Set()
let queued = false
let listening = false

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n)

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

  document.documentElement.style.setProperty(
    '--sy',
    `${Math.round(globalThis.scrollY)}px`,
  )

  for (const [el, top, height] of reads) {
    const p = clamp01((vh - top) / (height + vh))
    const s = p * 2 - 1
    el.style.setProperty('--p', p.toFixed(3))
    el.style.setProperty('--s', s.toFixed(3))
    el.style.setProperty('--c', (1 - Math.abs(s)).toFixed(3))
  }
}

function schedule() {
  if (queued) return
  queued = true
  requestAnimationFrame(tick)
}

function listen(on) {
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

/** Someone who has asked for less motion gets a camera that holds still. */
export const stillCamera = () =>
  globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

/** @returns {() => void} an unregister function. */
export function register(el) {
  items.add(el)
  listen(true)
  schedule()

  return () => {
    items.delete(el)
    for (const prop of ['--p', '--s', '--c']) el.style.removeProperty(prop)
    if (!items.size) listen(false)
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
