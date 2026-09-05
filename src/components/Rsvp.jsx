import { TicketCheck } from 'lucide-react'
import { couple, rsvp, wedding } from '../config.js'
import Panel from './Panel.jsx'

/* ---------------------------------------------------------------------------
   Svar — the widest pass on the page, and the one that leans furthest.

   It used to draw a little boarding pass inside a panel; now that every
   section *is* a boarding pass, that second card was a card inside a card. The
   route line and the stamp moved up onto the pass itself instead.
--------------------------------------------------------------------------- */

const isPlaceholder = rsvp.embedUrl.includes('PLACEHOLDER')

function FormPlaceholder() {
  return (
    <div className="form-placeholder">
      <TicketCheck className="placeholder-mark" strokeWidth={1.4} aria-hidden="true" />
      <strong>Svarskjemaet kommer</strong>
      <p>
        Her dukker skjemaet opp så snart lenken er på plass. Bytt ut{' '}
        <code>rsvp.embedUrl</code> i <code>src/config.js</code> med din egen
        Google Forms-adresse.
      </p>
    </div>
  )
}

export default function Rsvp() {
  return (
    <Panel
      id="svar"
      eyebrow="Svar"
      title="Gi oss beskjed"
      code="SK 04"
      tilt={1.6}
      wide
      className="rsvp"
    >
      <span className="pennant">{rsvp.deadlineLabel}</span>

      <div className="route">
        <span className="route-name">
          {couple.one} &amp; {couple.two}
        </span>
        <span className="route-rule" aria-hidden="true" />
        <span className="route-date tabular">{wedding.dateStamp}</span>
        <span className="stamp">Gi beskjed</span>
      </div>

      <p className="route-blurb">{rsvp.blurb}</p>

      <div className="form-frame">
        <div className="form-inner">
          {isPlaceholder ? (
            <FormPlaceholder />
          ) : (
            <iframe
              src={rsvp.embedUrl}
              title="Svarskjema"
              loading="lazy"
              width="100%"
              height="1100"
            >
              Laster inn skjema …
            </iframe>
          )}
        </div>
      </div>

      <div className="form-fallback">
        <p>Får du ikke opp skjemaet her? Åpne det i sin egen fane.</p>
        <a
          className="btn btn-rosso"
          href={rsvp.openUrl}
          target="_blank"
          rel="noreferrer"
        >
          Åpne skjemaet i ny fane
        </a>
      </div>
    </Panel>
  )
}
