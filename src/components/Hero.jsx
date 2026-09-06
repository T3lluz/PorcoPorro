import { ChevronsDown } from 'lucide-react'
import { couple, wedding } from '../config.js'
import { useCamera } from '../lib/parallax.js'
import Plane from './Plane.jsx'
import WindSwirl from './WindSwirl.jsx'

/* ---------------------------------------------------------------------------
   Open sky. No navigation bar — the page is one scroll.

   There are no clouds of its own in here any more. The hero used to carry four
   that scrolled away with it, which was a second, competing depth system; the
   fixed drift layers behind the whole page do that job now, and do it for every
   section rather than only this one. What is left is the sky, the rig, and the
   wind coming off it.

   The hero is pinned (see .hero-pin in hero.css) — the boarding passes below
   slide up over it before the page starts scrolling properly. While it is
   pinned the plane climbs and the lettering sinks and fades, both driven by
   --fall, which is what makes the first flick of the wheel read as the camera
   dropping away rather than the page moving up.

   --fall is written here, on the header, and not on :root — everything that
   reads it (the rig, the prop-wash, the lettering, the scroll cue) is inside
   this element, so this is as far as a scroll needs to reach. See
   lib/parallax.js.
--------------------------------------------------------------------------- */

export default function Hero() {
  const sky = useCamera('fall')

  return (
    <header className="hero" ref={sky}>
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-wind">
          {/* The prop-wash. Faster again than the high wind outside the hero,
              because this is air coming off a propeller rather than air the
              aeroplane happens to be flying through — and fast enough, against
              the clouds behind it, that the rig reads as travelling even though
              it never moves. The first two pass close to the blades.

              Four, not six. They all enter from the left and pass the aeroplane
              on their way out, so they read as one airstream at four heights;
              six of them, with two more coming in from the right-hand side of
              the frame, read as weather happening at the lettering. */}
          <WindSwirl w="clamp(190px, 24vw, 320px)" top="16%" left="-18%" dur="4.3s" delay="-1.3s" travel="62vw" rise="-30px" op={0.52} />
          <WindSwirl w="clamp(150px, 19vw, 250px)" top="27%" left="-24%" dur="5.2s" delay="-3.9s" travel="70vw" rise="-22px" op={0.4} fy={-1} />
          <WindSwirl w="clamp(210px, 27vw, 350px)" top="44%" left="4%" dur="6.2s" delay="-5.2s" travel="76vw" rise="-42px" op={0.34} />
          <WindSwirl w="clamp(170px, 21vw, 280px)" top="60%" left="-12%" dur="7.1s" delay="-4.5s" travel="82vw" rise="-36px" op={0.3} />
        </div>

        <Plane />
      </div>

      <div className="hero-type wrap">
        <h1 className="hero-names">
          <span className="hn-name">{couple.one}</span>
          <span className="hn-amp">&amp;</span>
          <span className="hn-name hn-two">{couple.two}</span>
        </h1>

        <p className="hero-stamp">
          <span className="stamp-rule" aria-hidden="true" />
          <span className="tabular">{wedding.dateStamp}</span>
          <span className="stamp-rule" aria-hidden="true" />
        </p>

        <p className="hero-place">{wedding.place}</p>
      </div>

      <a className="scroll-cue" href="#hvor" aria-label="Bla nedover">
        <ChevronsDown size={26} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </header>
  )
}
