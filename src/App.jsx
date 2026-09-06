import { useCamera } from './lib/parallax.js'
import CloudSprite from './components/CloudSprite.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Rsvp from './components/Rsvp.jsx'
import SkyBackdrop from './components/SkyBackdrop.jsx'
import WhereWhen from './components/WhereWhen.jsx'

/*
  One scrolling page of open sky: the plane and its banner up top, everything
  practical below on cloud panels.

  .hero-pin is twice the height of the hero and <main> is pulled back up over it
  by exactly one hero, so the first screenful of scrolling slides the panels up
  over a stationary sky. Once the hero is covered it releases and the page
  scrolls normally.

  <main> carries --lift for the passes inside it; nothing else reads it. See
  lib/parallax.js for why that matters.
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
          <WhereWhen />
          <div className="gap" aria-hidden="true" />

          <Rsvp />
        </main>

        <Footer />
      </div>
    </div>
  )
}
