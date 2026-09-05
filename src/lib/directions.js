/* ---------------------------------------------------------------------------
   «Veibeskrivelse» skal åpne kartet folk faktisk bruker, ikke det vi liker
   best: Apple Maps på iPhone/iPad/Mac, Google Maps overalt ellers. Begge
   URL-ene er universelle — trykker du på dem på mobil, tar app-en over; på
   desktop åpner de nettversjonen.
--------------------------------------------------------------------------- */

const isApple = () => {
  const ua = globalThis.navigator?.userAgent ?? ''
  // iPadOS 13+ rapporterer seg som «Macintosh», så Mac og iPad havner i samme
  // gren — begge har Apple Maps som standard.
  return /iPhone|iPad|iPod|Macintosh/.test(ua)
}

/**
 * @param {{ address: string, lat: number, lng: number }} venue
 * @returns {string} en lenke som åpner standardkartet med kjørerute dit.
 */
export default function directionsUrl({ address, lat, lng }) {
  const dest = encodeURIComponent(address)
  const at = `${lat},${lng}`

  return isApple()
    ? `https://maps.apple.com/?daddr=${dest}&ll=${at}&dirflg=d`
    : `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`
}
