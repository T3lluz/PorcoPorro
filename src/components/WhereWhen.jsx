import { Navigation } from 'lucide-react'
import { venue, wedding } from '../config.js'
import directionsUrl from '../lib/directions.js'
import Panel from './Panel.jsx'

/* ---------------------------------------------------------------------------
   Hvor & når, on one card.

   These were two passes — a «Hvor» with the map and a «Når» with three times —
   and splitting them was the wrong cut. A guest asks one question, "where do I
   have to be, and at what time", and answering it across two cards separated by
   a whole screen of open sky made them scroll to find the other half of a
   sentence.

   So: the date is the title, the place sits under it, and the map and
   «Veibeskrivelse» close the card.

   Nothing else is on it. A row of three times — arrive, ceremony, last taxi —
   was a programme, and a paragraph about parking and walking distances was
   advice nobody had asked for yet; both answered questions the guest does not
   have on the way in, on the card that has to answer the two they do. Date,
   church, map, route. Anything else can be asked.

   The map is a picture, not a tool: no panning, no zooming, no accidental
   scroll capture on a phone. Everything you can actually do with it lives in
   the button underneath, which hands the trip to whichever map app the
   visitor's device already uses.
--------------------------------------------------------------------------- */

export default function WhereWhen() {
  const at = `${venue.lat},${venue.lng}`
  // ll= keeps the map centred on the venue, so the crimson overlay pin lands on
  // the same spot Google marks. t=m forces the road map over satellite.
  const map = `https://www.google.com/maps?q=${at}&ll=${at}&hl=no&z=15&t=m&output=embed`

  return (
    <Panel
      id="hvor"
      eyebrow={'Hvor & når'}
      title={wedding.dateLong}
      code="SK 01"
      tilt={1.2}
    >
      <h3 className="venue-name">{venue.name}</h3>
      <p className="venue-address">{venue.address}</p>

      <div className="map-frame">
        <iframe
          src={map}
          title={`Kart over ${venue.name}`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* swallows every pointer event before it reaches the embed */}
        <span className="map-shield" aria-hidden="true" />
        <span className="map-pin" aria-hidden="true" />
      </div>

      <p className="map-actions">
        <a
          className="btn btn-rosso"
          href={directionsUrl(venue)}
          target="_blank"
          rel="noreferrer"
        >
          Veibeskrivelse
          <Navigation size={15} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </p>
    </Panel>
  )
}
