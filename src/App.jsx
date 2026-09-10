import { Fragment } from 'react'
import { venues } from './config.js'
import { useCamera } from './lib/parallax.js'
import CloudSprite from './components/CloudSprite.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Rsvp from './components/Rsvp.jsx'
import SkyBackdrop from './components/SkyBackdrop.jsx'
import VenueCard from './components/VenueCard.jsx'

/*
  One scrolling page: plane and banner up top, one boarding pass per address in
  `venues`, then the RSVP.

  <main> carries --lift for the passes inside it and nothing else reads it. See
  lib/parallax.js and `main` in base.css.
*/

export default function App() {
  const stage = useCamera('lift')

  return (
    <div className="page">
      <CloudSprite />
      <SkyBackdrop />

      <div className="content">
        <div className="hero-pin">
          <Hero />
        </div>

        <main ref={stage}>
          {venues.map((venue) => (
            <Fragment key={venue.id}>
              <VenueCard venue={venue} />
              <div className="gap" aria-hidden="true" />
            </Fragment>
          ))}

          <Rsvp />
        </main>

        <Footer />
      </div>
    </div>
  )
}
