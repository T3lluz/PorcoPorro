import { FileText, ExternalLink } from 'lucide-react'
import { rsvp } from '../config.js'
import Panel from './Panel.jsx'

/* ---------------------------------------------------------------------------
   Svar.

   This used to embed the form itself — a twelve-hundred-pixel iframe inside a
   frame inside a card, wrapped in a route line and a rubber stamp. On a phone
   that single card was most of the page, and Google's form has a minimum width
   it will not go below anyway, so it spent the whole time squeezed.

   A form is a document you go and fill in. The card says that once and hands
   over the link.
--------------------------------------------------------------------------- */

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
