import { BedDouble, Bus, Navigation, SquareParking } from 'lucide-react'
import { travel, venue } from '../config.js'
import directionsUrl from '../lib/directions.js'
import Panel from './Panel.jsx'

const ICONS = {
  parking: SquareParking,
  bus: Bus,
  bed: BedDouble,
}

/* ---------------------------------------------------------------------------
   The map is a picture, not a tool: no panning, no zooming, no accidental
   scroll capture on a phone. Everything you can actually do with it lives in
   the «Veibeskrivelse» button underneath, which hands the trip to whichever
   map app the visitor's device already uses.
--------------------------------------------------------------------------- */

export default function Where() {
  const at = `${venue.lat},${venue.lng}`
  // ll= keeps the map centred on the venue, so the crimson overlay pin lands on
  // the same spot Google marks. t=m forces the road map over satellite.
  const map = `https://www.google.com/maps?q=${at}&ll=${at}&hl=no&z=15&t=m&output=embed`

  return (
    <Panel
      id="hvor"
      eyebrow="Hvor"
      title="Sted og vei dit"
      code="SK 02"
      tilt={1.2}
    >
      <h3 className="venue-name">{venue.name}</h3>
      <p className="venue-address">{venue.address}</p>
      <p className="venue-blurb">{venue.blurb}</p>

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

      <div className="travel">
        {travel.map((t) => {
          const Icon = ICONS[t.icon]
          return (
            <div className="travel-card" key={t.title}>
              <span className="travel-icon">
                <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h4>{t.title}</h4>
              <p>{t.body}</p>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
