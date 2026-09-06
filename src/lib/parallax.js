import { useEffect, useRef } from 'react'

/* ---------------------------------------------------------------------------
   The falling camera.

   One rAF-throttled scroll pass writes a handful of numbers and lets CSS do the
   rest. On :root:

     --sy        how far the page has fallen, in px. The sky layers read it
                 directly, each with its own coefficient, so the far clouds
                 creep and the near ones rush.
     --fall      the same thing over the first viewport only, 0 to 1. The hero
                 lettering sinks and fades on this, so it is gone before the
                 first pass has finished covering it and never resurfaces in the
                 gap between two cards.
     --bank-top  where the top edge of the painted cloud bank is right now, in
                 viewport pixels — negative once it is above the fold. The
                 drifting vector clouds are masked off just above that line, so
                 they stop where the painting starts instead of being drawn over
                 the top of it.

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
let sky = false // whether anyone still wants --bank-top
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

  const root = document.documentElement
  const y = globalThis.scrollY
  const docH = root.scrollHeight

  // How tall the painted cloud bank is, in two cases — because styles/sky.css
  // sizes it two ways: off the page width at the artwork's true aspect, and, on
  // a phone where that comes out shorter than the footer's sea and the painting
  // would never be seen at all, off the viewport height instead. Taking the
  // larger covers both without asking which rule is live, and where they
  // disagree it only ever errs tall, which cuts the clouds a little early.
  const bankH = Math.max((globalThis.innerWidth || 0) * 0.5927, vh * 0.56)
  // Its top edge, in viewport coordinates. Published even under reduced motion:
  // this is not movement, it is where the floor is.
  root.style.setProperty('--bank-top', `${Math.round(docH - bankH - y)}px`)

  // The rest is motion, and a visitor who has asked for none gets none. Leaving
  // these unset is what keeps the sky still and the hero unpinned — every rule
  // that reads them falls back to 0.
  if (!stillCamera()) {
    root.style.setProperty('--sy', `${Math.round(y)}px`)
    root.style.setProperty('--fall', clamp01(y / vh).toFixed(3))
  }

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

/** Listen exactly while something still wants the numbers. */
function listen() {
  const on = sky || items.size > 0
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
 * Keep --bank-top up to date for as long as the sky is on the page.
 * @returns {() => void} a stop function, so it can be passed straight to useEffect.
 */
export function watchSky() {
  sky = true
  listen()
  schedule()

  return () => {
    sky = false
    listen()
  }
}

/** @returns {() => void} an unregister function. */
export function register(el) {
  items.add(el)
  listen()
  schedule()

  return () => {
    items.delete(el)
    for (const prop of ['--p', '--s', '--c']) el.style.removeProperty(prop)
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
