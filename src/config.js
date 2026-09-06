// ---------------------------------------------------------------------------
// Alt innhold på siden bor her. Endre tekst, tider og lenker her — ikke i
// komponentene.
//
//   ⚠️  = plassholder som må erstattes før siden deles. Dette er opplysninger
//         ingen andre enn dere kan fylle inn: sted, adresse, telefonnumre og
//         lenken til svarskjemaet.
//
// Brødteksten er ikke lenger fyllstoff. Den er skrevet slik at den står på egne
// bein om dere ikke rører den, og slik at ingenting i den påstår noe vi ikke
// vet — ingen avstander, ingen priser, ingen løfter om vær. Bytt den gjerne ut
// med deres egne ord; det er den som gir siden stemme.
// ---------------------------------------------------------------------------

export const couple = {
  one: 'Susan',
  two: 'Skage',
  // Vises på banneret bak flyet. Hold det kort — det er håndmalt på lerret.
  banner: 'SUSAN & SKAGE',
}

export const wedding = {
  // ⚠️ Sett riktig dato. ISO-format, brukes til nedtelling.
  dateISO: '2027-06-26T14:00:00+02:00',
  dateLong: '26. juni 2027',
  dateStamp: '26 . 06 . 2027',
  place: 'St. Paulus kirke, Oslo',
  invitation:
    'Vi gifter oss, og vi vil ha dere med. Vielsen er i St. Paulus kirke midt ' +
    'i Oslo, og vi har tenkt å bruke god tid på dagen. Alt dere trenger å vite ' +
    'står her: når, hvor, veien dit — og et skjema dere kan svare på når dere vet.',
}

export const venue = {
  name: 'St. Paulus kirke',
  address: 'Akersveien 5, 0177 Oslo', // ⚠️ dobbeltsjekk
  lat: 59.9186, // ⚠️ dobbeltsjekk
  lng: 10.7452, // ⚠️ dobbeltsjekk
}

// Skjemaet ligger hos Google, og siden lenker dit i stedet for å bygge det inn.
// Det var en iframe før: tolv hundre piksler skjema inni en ramme inni et kort,
// og Google-skjemaet har en minstebredde det ikke går under — på mobil ble hele
// siden det ene skjemaet, klemt sammen. Et skjema er et dokument man går og
// fyller ut.
//
// ID-en er den lange strengen i skjemaets egen URL: åpne skjemaet → Send →
// fanen `< >`, og kopier delen mellom `/d/e/` og `/viewform`.
// ⚠️ Bytt til IDen fra deres eget skjema.
const FORM_ID = '1FAIpQLSfVEK1IYehIc0w_YYGv1gDRxS78U_AbbL57ifmhEHGpMT2A7w'

export const rsvp = {
  openUrl: `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`,
  deadlineLabel: 'Svar innen 1. mai', // ⚠️
  // Kort, fordi den står midtstilt under et ikon nå. Den sa «skjemaet under»
  // så lenge skjemaet lå i siden; det gjør det ikke lenger.
  blurb:
    'Vi trenger å vite hvor mange vi skal dekke på til, og om det er noe dere ' +
    'ikke tåler. Skjemaet tar under ett minutt.',
}

export const contacts = [
  { role: 'Toastmaster', name: 'Ola Nordmann', phone: '+47 400 00 000' }, // ⚠️
  { role: 'Forlover', name: 'Kari Nordmann', phone: '+47 400 00 001' }, // ⚠️
]
