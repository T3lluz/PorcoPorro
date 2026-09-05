import { schedule } from '../config.js'
import Panel from './Panel.jsx'

/** The timeline: fixed time column, dotted spine, a crimson dot per row. */
export default function When() {
  return (
    <Panel
      id="naar"
      eyebrow="Når"
      title="Dagen, time for time"
      code="SK 03"
      tilt={-0.9}
    >
      <ol className="timeline">
        {schedule.map((row) => (
          <li className="tl-row" key={row.time + row.title}>
            <time className="tl-time tabular">{row.time}</time>
            <span className="tl-dot" aria-hidden="true" />
            <div className="tl-body">
              <h3 className="tl-title">{row.title}</h3>
              <p className="tl-where">{row.where}</p>
              {row.note && <p className="tl-note">{row.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  )
}
