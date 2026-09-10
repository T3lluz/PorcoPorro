import { Navigation } from 'lucide-react'
import { wedding } from '../config.js'
import directionsUrl from '../lib/directions.js'
import Panel from './Panel.jsx'
import VenueMap from './VenueMap.jsx'

/*
  One address on a boarding pass. The date repeats on every card so nobody has
  to scroll back from the party card to find out which day it is.
*/

export default function VenueCard({ venue }) {
  return (
    <Panel
      id={venue.id}
      eyebrow={venue.eyebrow}
      title={venue.name}
      code={venue.code}
      tilt={venue.tilt}
      className="venue"
    >
      <dl className="venue-meta">
        <div className="venue-field">
          <dt>Dato</dt>
          <dd>{wedding.dateLong}</dd>
        </div>
        <div className="venue-field">
          <dt>Klokken</dt>
          <dd className="tabular">{venue.time}</dd>
        </div>
      </dl>

      <p className="venue-address">{venue.address}</p>

      <VenueMap venue={venue} />

      <p className="map-actions">
        <a
          className="btn btn-rosso"
          href={directionsUrl(venue)}
          target="_blank"
          rel="noreferrer"
        >
          {/* Two on the page, so the label names its own destination. */}
          <span aria-hidden="true">Veibeskrivelse</span>
          <span className="sr-only">Veibeskrivelse til {venue.name}</span>
          <Navigation size={15} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </p>
    </Panel>
  )
}
