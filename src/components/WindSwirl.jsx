/*
  A wind curl: a lead line hooking into a spiral, plus two shorter wisps. Three
  strokes at different speeds, because one line reads as a scratch.

  Every path runs left to right and ends where the wind is going, so one
  gradient can fade them all (#wind-fade in CloudSprite.jsx). Never mirror them
  horizontally: `fy` flips vertically and is fine, but `fx` of -1 puts the wake
  in front of the gust. pathLength="1000" normalises the dash rule.
*/

const STROKES = [
  // lead line: sweeps up and right, then curls in on itself
  'M2 84C64 82 116 58 172 44C216 33 268 34 288 56C306 78 296 104 270 104C248 104 238 88 246 74C253 63 270 63 274 74',
  // low wisp
  'M16 110C78 106 124 90 180 84C214 80 238 82 250 90',
  // short streak above
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
