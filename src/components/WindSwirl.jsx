/* ---------------------------------------------------------------------------
   A Ghibli wind curl.

   Three strokes, not one: a long lead line that hooks into an open spiral, and
   two shorter wisps riding beside it. A single line reads as a scratch; the
   parallel wisps at different speeds are what make it read as moving air.

   Each stroke is drawn twice — a wide, faint halo under a crisp line — so the
   edges feather instead of ending in a hard cap. `pathLength="1000"` normalises
   every path to the same length, so one dash rule in CSS governs all of them
   regardless of their real geometry.

   Every path runs left to right and ends where the wind is going, which is what
   lets a single gradient do the fading: the strokes are painted with
   #wind-fade (CloudSprite.jsx), transparent at the tail and full strength at
   the head, so the straight run behind the curl thins away and the spiral is
   what you actually see. Nothing here may be mirrored horizontally — `fy`
   flips these vertically and that is fine, but an `fx` of -1 would point the
   fade the wrong way and leave a gust with its wake in front of it.

   Motion is layered the same way weather is: the wrapper carries the curl
   across the sky and fades it in and out at the ends of that pass, while the
   dash flows along each stroke several times faster, so the line looks like it
   is being redrawn by the air rather than dragged through it.
--------------------------------------------------------------------------- */

const STROKES = [
  // the lead line — sweeps up and to the right, then curls in on itself
  'M2 84C64 82 116 58 172 44C216 33 268 34 288 56C306 78 296 104 270 104C248 104 238 88 246 74C253 63 270 63 274 74',
  // a low wisp running under it
  'M16 110C78 106 124 90 180 84C214 80 238 82 250 90',
  // a short streak above
  'M52 52C100 46 134 28 178 22',
]

export default function WindSwirl({
  w = '260px',
  top,
  left,
  dur = '26s',
  delay = '0s',
  travel = '60vw',
  rise = '-34px',
  op = 0.45,
  fx = 1,
  fy = 1,
}) {
  const strokes = STROKES.map((d, i) => (
    <path key={i} d={d} pathLength="1000" />
  ))

  return (
    <div
      className="wind"
      style={{
        '--w': w,
        '--dur': dur,
        '--delay': delay,
        '--travel': travel,
        '--rise': rise,
        '--op': op,
        '--fx': fx,
        '--fy': fy,
        top,
        left,
      }}
    >
      <svg viewBox="0 0 320 120" aria-hidden="true" focusable="false">
        <g className="wind-halo">{strokes}</g>
        <g className="wind-line">{strokes}</g>
      </svg>
    </div>
  )
}
