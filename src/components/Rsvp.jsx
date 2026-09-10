import { FileText, ExternalLink } from 'lucide-react'
import { rsvp } from '../config.js'
import Panel from './Panel.jsx'

/* One mark, one sentence, one button, centred. */

export default function Rsvp() {
  return (
    <Panel
      id="svar"
      eyebrow="Svar"
      title="Gi oss beskjed"
      code="SK 03"
      tilt={1.6}
      className="rsvp"
    >
      <div className="rsvp-card">
        <FileText className="rsvp-mark" strokeWidth={1.2} aria-hidden="true" />

        <p className="rsvp-blurb">{rsvp.blurb}</p>

        <a
          className="btn btn-rosso"
          href={rsvp.openUrl}
          target="_blank"
          rel="noreferrer"
        >
          Åpne svarskjemaet
          <ExternalLink size={15} strokeWidth={2.2} aria-hidden="true" />
        </a>

        <p className="rsvp-deadline">{rsvp.deadlineLabel}</p>
      </div>
    </Panel>
  )
}
