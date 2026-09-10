/*
  A picture of a map, not a map. The shield eats clicks, drags and two-finger
  scroll, so it cannot pan, zoom or trap the page scroll on a phone.
*/

export default function VenueMap({ venue }) {
  const at = `${venue.lat},${venue.lng}`
  // ll= centres the embed so the pin overlay lands on Google's own marker.
  // t=m forces the road map over satellite.
  const src = `https://www.google.com/maps?q=${at}&ll=${at}&hl=no&z=15&t=m&output=embed`

  return (
    <div className="map-frame">
      <iframe
        src={src}
        title={`Kart over ${venue.name}`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <span className="map-shield" aria-hidden="true" />
      <span className="map-pin" aria-hidden="true" />
    </div>
  )
}
