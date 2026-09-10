// Åpner kartet folk faktisk bruker: Apple Maps på Apple, Google Maps ellers.
// Begge URL-ene tar app-en på mobil og nettversjonen på desktop.

const isApple = () => {
  // iPadOS 13+ melder seg som Macintosh, så Mac og iPad deler denne grenen.
  const ua = globalThis.navigator?.userAgent ?? ''
  return /iPhone|iPad|iPod|Macintosh/.test(ua)
}

/**
 * @param {{ address: string, lat: number, lng: number }} venue
 * @returns {string} kjørerute i standardkartet.
 */
export default function directionsUrl({ address, lat, lng }) {
  const dest = encodeURIComponent(address)
  const at = `${lat},${lng}`

  return isApple()
    ? `https://maps.apple.com/?daddr=${dest}&ll=${at}&dirflg=d`
    : `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`
}
