import { hours, wedding } from '../config.js'
import Panel from './Panel.jsx'

/* ---------------------------------------------------------------------------
   When, and no more than that.

   This was a seven-row timeline with a dotted spine, which is a programme, not
   an answer — and a programme is the one thing nobody needs on the way in.

   The date is the card's own title rather than a line underneath one. It used
   to say «Tid» in the heading and then give the date below it, which is the
   same word twice: the stub already says NÅR, so a title that also says "time"
   spends a whole line saying nothing.
--------------------------------------------------------------------------- */

export default function When() {
  return (
    <Panel
      id="naar"
      eyebrow="Når"
      title={wedding.dateLong}
      code="SK 02"
      tilt={-0.9}
    >
      <ul className="hours">
        {hours.map((h) => (
          <li key={h.time}>
            <span className="hours-time tabular">{h.time}</span>
            <span className="hours-what">{h.what}</span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
