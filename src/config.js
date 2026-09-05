// ---------------------------------------------------------------------------
// Alt innhold på siden bor her. Endre tekst, tider og lenker her — ikke i
// komponentene.
//
//   ⚠️  = plassholder som må erstattes før siden deles.
//   📝  = lorem ipsum. Navn, datoer, klokkeslett, adresser og overskrifter er
//         ekte; all løpende brødtekst er bevisst fyllstoff i denne runden, slik
//         at ingen forveksler den med ferdig tekst. Bytt den ut når ordlyden
//         er klar.
// ---------------------------------------------------------------------------

const LOREM = {
  invitation:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  venue:
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
  parking:
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
  transit:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.',
  lodging:
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
  rsvp:
    'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.',
}

export const couple = {
  one: 'Susan',
  two: 'Skage',
  // Vises på banneret bak flyet. Hold det kort — det er håndmalt på lerret.
  banner: 'SUSAN & SKAGE',
}

export const wedding = {
  // ⚠️ Sett riktig dato. ISO-format, brukes til nedtelling.
  dateISO: '2027-06-12T14:00:00+02:00',
  dateLong: '12. juni 2027',
  dateStamp: '12 . 06 . 2027',
  place: 'Sandefjord, ved sjøen', // ⚠️
  invitation: LOREM.invitation, // 📝
}

export const venue = {
  name: 'Midtåsen', // ⚠️
  address: 'Midtåsveien 30, 3223 Sandefjord', // ⚠️
  blurb: LOREM.venue, // 📝
  lat: 59.1206, // ⚠️
  lng: 10.2372, // ⚠️
}

export const travel = [
  { icon: 'parking', title: 'Parkering', body: LOREM.parking }, // 📝
  { icon: 'bus', title: 'Kollektivt', body: LOREM.transit }, // 📝
  { icon: 'bed', title: 'Overnatting', body: LOREM.lodging }, // 📝
]

export const schedule = [
  { time: '14:00', title: 'Ankomst', where: 'Hagen', note: 'Lorem ipsum dolor sit amet.' },
  { time: '15:00', title: 'Vielse', where: 'Under eika', note: 'Consectetur adipiscing elit.' },
  { time: '16:00', title: 'Fotografering & mingling', where: 'Ved vannet', note: null },
  { time: '18:00', title: 'Middag', where: 'Låven', note: 'Sed do eiusmod tempor incididunt.' },
  { time: '21:00', title: 'Kaken & første dans', where: 'Låven', note: null },
  { time: '22:00', title: 'Fest', where: 'Låven', note: 'Ut labore et dolore magna aliqua.' },
  { time: '02:00', title: 'Siste taxi', where: 'Oppkjørselen', note: 'Quis nostrud exercitation.' },
]

export const rsvp = {
  // ⚠️ Lim inn din egen Google Forms-lenke.
  // Åpne skjemaet → Send → «< >» → kopier src-URL-en (den slutter på ?embedded=true).
  embedUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSf_PLACEHOLDER_FORM_ID/viewform?embedded=true',
  // Samme skjema, uten ?embedded=true — brukes av knappen som åpner i ny fane.
  openUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSf_PLACEHOLDER_FORM_ID/viewform',
  deadlineLabel: 'Svar innen 1. mai', // ⚠️
  blurb: LOREM.rsvp, // 📝
}

// 📝 Spørsmålene er ekte; svarene er fyllstoff til ordlyden er avklart.
export const faq = [
  {
    q: 'Hva er kleskoden?',
    a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  },
  {
    q: 'Kan jeg ta med barn?',
    a: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
  {
    q: 'Gaver?',
    a: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    q: 'Jeg vil holde tale',
    a: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.',
  },
  {
    q: 'Allergier og mat',
    a: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    q: 'Bilder',
    a: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni.',
  },
]

export const contacts = [
  { role: 'Toastmaster', name: 'Ola Nordmann', phone: '+47 400 00 000' }, // ⚠️
  { role: 'Forlover', name: 'Kari Nordmann', phone: '+47 400 00 001' }, // ⚠️
]
