import { couple } from '../config.js'
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js'

/*
  The towed banner. The geometry is generated rather than hand-drawn, because
  what makes a towed banner read as cloth is a rule, not a shape:

    - the leading edge is held by a rigid pole, so it barely moves;
    - the disturbance travels away from the tow, down the length of the cloth:
      a travelling wave, not a flap in place;
    - amplitude grows toward the free trailing edge;
    - as each crest passes, the cloth twists edge-on and its silhouette narrows.

  All four fall out of one wave sampled at FRAMES phases. Cloth, pole, both
  bridle ropes and the invisible centreline the lettering rides are sampled from
  that same wave at the same phases, which is why the letters ripple with the
  cloth rather than sitting on top of it.
*/

const X0 = 230 // leading edge (the pole)
const X1 = 880 // free trailing edge
const MID = 130 // the cloth's rest centreline
const H = 54 // half-height at rest
const LAMBDA = 520 // one wavelength, in viewBox units
const K = (Math.PI * 2) / LAMBDA
const A_NEAR = 2 // amplitude at the pole, near enough to nothing
const A_FAR = 27 // amplitude at the free end
const STEPS = 24 // samples along the cloth
const FRAMES = 10 // phase snapshots per cycle
const DUR = '3.6s'

// Where the tow rope from the tail meets the two bridle legs.
const KNOT = { x: 170, y: 126 }

const XS = Array.from({ length: STEPS + 1 }, (_, i) => X0 + ((X1 - X0) * i) / STEPS)

// Amplitude ramps super-linearly, so the last third of the banner does most of
// the moving, which is where the eye expects it.
const amp = (x) => {
  const u = (x - X0) / (X1 - X0)
  return A_NEAR + (A_FAR - A_NEAR) * u ** 1.7
}

const r = (n) => Math.round(n * 10) / 10

/** One phase of the wave, sampled along the cloth. */
function sample(t) {
  return XS.map((x) => {
    const phase = K * x - t
    const y = MID + amp(x) * Math.sin(phase)
    // silhouette narrows as the cloth turns edge-on under each crest
    const half = H * (0.84 + 0.16 * Math.cos(phase))
    return { x: r(x), top: r(y - half), bot: r(y + half), mid: r(y) }
  })
}

const cloth = (p) =>
  `M${p[0].x} ${p[0].top}` +
  p.slice(1).map((s) => `L${s.x} ${s.top}`).join('') +
  [...p].reverse().map((s) => `L${s.x} ${s.bot}`).join('') +
  'Z'

const spine = (p) =>
  `M${p[0].x} ${p[0].mid}` + p.slice(1).map((s) => `L${s.x} ${s.mid}`).join('')

const pole = (p) => `M${p[0].x} ${p[0].top}L${p[0].x} ${p[0].bot}`
const bridleTop = (p) => `M${KNOT.x} ${KNOT.y}L${p[0].x} ${p[0].top}`
const bridleBot = (p) => `M${KNOT.x} ${KNOT.y}L${p[0].x} ${p[0].bot}`

// One extra frame, identical to the first, so the loop closes seamlessly.
const PHASES = Array.from({ length: FRAMES + 1 }, (_, i) =>
  sample(((i % FRAMES) * Math.PI * 2) / FRAMES),
)

const track = (fn) => PHASES.map(fn).join(';')
const KEY_TIMES = PHASES.map((_, i) => r(i / FRAMES)).join(';')

/** A travelling wave moves at a constant rate, hence calcMode="linear". */
function Wave({ to }) {
  return (
    <animate
      attributeName="d"
      values={track(to)}
      keyTimes={KEY_TIMES}
      calcMode="linear"
      dur={DUR}
      repeatCount="indefinite"
    />
  )
}

export default function Banner() {
  const still = usePrefersReducedMotion()
  const rest = PHASES[0]

  return (
    <svg
      className="banner"
      viewBox="0 0 900 260"
      role="img"
      aria-label={couple.banner}
    >
      <defs>
        <linearGradient id="cloth-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".55" stopColor="#fbfdff" />
          <stop offset="1" stopColor="#e3eef6" />
        </linearGradient>

        <path id="banner-spine" d={spine(rest)} fill="none">
          {!still && <Wave to={spine} />}
        </path>
      </defs>

      {/* tow rope from the tail, then two bridle legs onto the pole */}
      <path className="banner-rope" d={`M0 112C56 110 118 116 ${KNOT.x} ${KNOT.y}`} />
      <path className="banner-rope" d={bridleTop(rest)}>
        {!still && <Wave to={bridleTop} />}
      </path>
      <path className="banner-rope" d={bridleBot(rest)}>
        {!still && <Wave to={bridleBot} />}
      </path>

      {/* the cloth: one path, filled and edged in the same pass */}
      <path className="banner-cloth" d={cloth(rest)}>
        {!still && <Wave to={cloth} />}
      </path>

      {/* the rigid leading pole */}
      <path className="banner-pole" d={pole(rest)}>
        {!still && <Wave to={pole} />}
      </path>

      <text className="banner-text" dy="22" aria-hidden="true">
        <textPath href="#banner-spine" startOffset="52%" textAnchor="middle">
          {couple.banner}
        </textPath>
      </text>
    </svg>
  )
}
