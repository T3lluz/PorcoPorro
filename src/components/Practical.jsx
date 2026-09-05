import { faq } from '../config.js'
import useParallax from '../lib/parallax.js'
import Panel from './Panel.jsx'

/* ---------------------------------------------------------------------------
   The FAQ as a pinboard: every answer is already on the wall, so nobody has to
   click six times to find the one line that concerns them.

   Each note is taped along its top edge and hangs from it, and that tape is the
   only thing holding it — so the one thing the air can do to a note is lift its
   free bottom edge. That is the whole motion now. The notes used to swing as
   well, which turned the entire wall as the page moved and read as the board
   rotating rather than as paper on it; what is left is the gust, and it is the
   same gesture hovering one has always given.

   Every note reads the camera itself rather than sharing the board's reading,
   so a note low on the wall is only beginning to lift while one above it has
   already settled — the wall ripples instead of rising like a single sheet.
   Tone cycles on a 4, pinned angle on a 5, gust strength on a 3 — coprime, so
   the pattern never lines up into visible rows.
--------------------------------------------------------------------------- */

const TILT = [-2.2, 1.5, -0.7, 2.4, -1.6]
// how far each note peels off the board at the top of its gust, and how far it
// rides up while it does
const GUST = [11, 16, 13]
const RISE = [5, 9, 6]

function Note({ item, i }) {
  const ref = useParallax()

  return (
    <li
      ref={ref}
      className={`note tone-${i % 4}`}
      style={{
        '--tilt': `${TILT[i % 5]}deg`,
        '--gust': `${GUST[i % 3]}deg`,
        '--rise': `${RISE[i % 3]}px`,
      }}
    >
      <div className="note-paper">
        <h3 className="note-q">{item.q}</h3>
        <p className="note-a">{item.a}</p>
      </div>
      <span className="note-tape" aria-hidden="true" />
    </li>
  )
}

export default function Practical() {
  return (
    <Panel
      id="praktisk"
      eyebrow="Praktisk"
      title="Det dere lurer på"
      code="SK 05"
      tilt={-1.3}
    >
      <div className="board">
        <ul className="notes">
          {faq.map((item, i) => (
            <Note key={item.q} item={item} i={i} />
          ))}
        </ul>
      </div>
    </Panel>
  )
}
