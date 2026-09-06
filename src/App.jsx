import { useCamera } from './lib/parallax.js'
import CloudSprite from './components/CloudSprite.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Rsvp from './components/Rsvp.jsx'
import SkyBackdrop from './components/SkyBackdrop.jsx'
import WhereWhen from './components/WhereWhen.jsx'

/* ---------------------------------------------------------------------------
   One scrolling page of open sky. The plane and its banner up top; everything
   practical further down, riding on cloud panels.

   .hero-pin is twice the height of the hero itself, and <main> is pulled back
   up over it by exactly one hero. So the first thing scrolling does is slide
   the cloud panels up over a stationary sky — the parallax beat — and only once
   the hero is covered does it release and the page scroll normally.

   Two passes, not three. «Hvor» and «Når» were one question split across two
   cards and a screenful of sky; they are one card now, and «Svar» follows it.

   <main> carries --lift for the passes inside it, and nothing else on the page
   reads it — see lib/parallax.js for why that matters more than it looks like
   it should.

   There is no painted cloud bank at the foot of the page any more. It was a
   photograph of clouds underneath a sky already full of clouds, and every
   question it raised was about itself: how tall, how far up, how to hand over
   from the vector sky to the picture without a seam, what to do when the footer
   covered the part you were meant to land on. The horizon haze in the footer
   was always the actual transition; the sky simply runs into it now.

   The gap between the passes is real open sky: that is where the fixed cloud
   layers show through.
--------------------------------------------------------------------------- */

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
