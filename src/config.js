// Alt innhold på siden bor her. Endre tekst, tider og lenker her, ikke i
// komponentene.
//
//   ⚠️ = plassholder som må erstattes før siden deles.

export const couple = {
  one: 'Susan',
  two: 'Skage',
  // Vises på banneret bak flyet. Hold det kort.
  banner: 'SUSAN & SKAGE',
}

export const wedding = {
  dateLong: '26. juni 2027',
  dateStamp: '26 . 06 . 2027',
  place: 'St. Paulus kirke, Oslo',
}

export const venue = {
  name: 'St. Paulus kirke',
  address: 'Akersveien 5, 0177 Oslo', // ⚠️ dobbeltsjekk
  lat: 59.9186, // ⚠️ dobbeltsjekk
  lng: 10.7452, // ⚠️ dobbeltsjekk
}

// Siden lenker til et Google-skjema i stedet for å bygge det inn.
// IDen er delen av skjemaets URL mellom `/d/e/` og `/viewform`:
// åpne skjemaet → Send → fanen `< >`.
const FORM_ID = '1FAIpQLSfVEK1IYehIc0w_YYGv1gDRxS78U_AbbL57ifmhEHGpMT2A7w' // ⚠️

export const rsvp = {
  openUrl: `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`,
  deadlineLabel: 'Svar innen 1. mai', // ⚠️
  blurb:
    'Vi trenger å vite hvor mange vi skal dekke på til, og om det er noe dere ' +
    'ikke tåler. Skjemaet tar under ett minutt.',
}

export const contacts = [
  { role: 'Toastmaster', name: 'Ola Nordmann', phone: '+47 400 00 000' }, // ⚠️
  { role: 'Forlover', name: 'Kari Nordmann', phone: '+47 400 00 001' }, // ⚠️
]
