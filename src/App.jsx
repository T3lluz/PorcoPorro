import CloudSprite from './components/CloudSprite.jsx'
import Cloudbank from './components/Cloudbank.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Rsvp from './components/Rsvp.jsx'
import SkyBackdrop from './components/SkyBackdrop.jsx'
import When from './components/When.jsx'
import Where from './components/Where.jsx'

/* ---------------------------------------------------------------------------
   One scrolling page of open sky. The plane and its banner up top; everything
   practical further down, riding on cloud panels.

   .hero-pin is twice the height of the hero itself, and <main> is pulled back
   up over it by exactly one hero. So the first thing scrolling does is slide
   the cloud panels up over a stationary sky — the parallax beat — and only once
   the hero is covered does it release and the page scroll normally.

   The gaps between panels are real open sky: that is where the fixed cloud
   layers show through.
--------------------------------------------------------------------------- */

export default function App() {
  return (
    <div className="page">
      <CloudSprite />
      <SkyBackdrop />
      <Cloudbank />

      <div className="content">
        <div className="hero-pin">
          <Hero />
        </div>

        <main>
          <Where />
          <div className="gap" aria-hidden="true" />

          <When />
          <div className="gap" aria-hidden="true" />

          <Rsvp />
        </main>

        <Footer />
      </div>
    </div>
  )
}
