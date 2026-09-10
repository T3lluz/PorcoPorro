// Alt innhold på siden. Endre tekst, tider og lenker her, ikke i komponentene.
// TODO-merkede felt må fylles inn før siden deles.

export const couple = {
  one: 'Susan',
  two: 'Skage',
  banner: 'SUSAN & SKAGE', // står på banneret bak flyet, så hold det kort
}

export const wedding = {
  dateLong: '26. juni 2027',
  dateStamp: '26 . 06 . 2027',
  place: 'St. Paulus kirke, Oslo',
}

// Ett lokasjonskort per post, i rekkefølgen de står. En tredje adresse er en ny
// post her, ikke en ny komponent. `code` er stubnummeret og må telle videre;
// svarkortet er SK 03. `time` er bare klokkeslettet, kortet setter «Klokken»
// foran. `tilt` veksler fortegn, ellers heller stabelen.
export const venues = [
  {
    id: 'hvor',
    code: 'SK 01',
    eyebrow: 'Vielsen',
    name: 'St. Paulus kirke',
    time: '13.00',
    address: 'Thorvald Meyers gate 31, 0555 Oslo',
    lat: 59.92636,
    lng: 10.75834,
    tilt: 1.2,
  },
  {
    id: 'fest',
    code: 'SK 02',
    eyebrow: 'Festen',
    name: 'Vespa og Humla',
    time: 'Lorem ipsum', // TODO: klokkeslett
    address: 'Københavngata 2, 0553 Oslo',
    lat: 59.92477,
    lng: 10.76288,
    tilt: -1.1,
  },
]

// IDen er delen av skjemaets URL mellom /d/e/ og /viewform.
const FORM_ID = '1FAIpQLSfVEK1IYehIc0w_YYGv1gDRxS78U_AbbL57ifmhEHGpMT2A7w' // TODO

export const rsvp = {
  openUrl: `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`,
  deadlineLabel: 'Svar innen Lorem ipsum', // TODO: frist
  blurb:
    'Vi trenger å vite hvor mange vi skal dekke på til, og om det er noe dere ' +
    'ikke tåler. Skjemaet tar under ett minutt.',
}
