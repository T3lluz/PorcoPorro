import { faq } from '../config.js'
import useParallax from '../lib/parallax.js'
import Panel from './Panel.jsx'

/* ---------------------------------------------------------------------------
   The FAQ as a pinboard: every answer is already on the wall, so nobody has to
   click six times to find the one line that concerns them.

   Each note is taped at the top edge and hangs from it, which decides both
   motions. On the way down the page the board's --s swings every note about
   that tape — at its own rate, so the wall ripples rather than pivoting as one
   sheet. On hover only the far edge lifts: the paper peels up off the board
   while the tape stays exactly where it is stuck.

   Tone cycles on a 4, tilt on a 5, sway on a 3 — coprime, so the pattern never
   lines up into visible rows.
--------------------------------------------------------------------------- */

const TILT = [-1.6, 1.1, -0.5, 1.8, -1.2]
const SWAY = [2.6, 4.1, 3.2]

export default function Practical() {
  const board = useParallax()

  return (
    <Panel
      id="praktisk"
      eyebrow="Praktisk"
      title="Det dere lurer på"
      code="SK 05"
      tilt={-1.3}
    >
      <div className="board" ref={board}>
        <ul className="notes">
          {faq.map((item, i) => (
            <li
              className={`note tone-${i % 4}`}
              key={item.q}
              style={{
                '--tilt': `${TILT[i % 5]}deg`,
                '--sway': `${SWAY[i % 3]}deg`,
              }}
            >
              <div className="note-paper">
                <h3 className="note-q">{item.q}</h3>
                <p className="note-a">{item.a}</p>
              </div>
              <span className="note-tape" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}
