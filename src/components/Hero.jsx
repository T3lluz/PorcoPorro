import { ChevronsDown } from 'lucide-react'
import { couple, wedding } from '../config.js'
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
--------------------------------------------------------------------------- */

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-wind">
          {/* the first two pass close to the propeller, so they read as prop-wash */}
          <WindSwirl w="clamp(190px, 24vw, 320px)" top="16%" left="-18%" dur="9s" delay="-2s" travel="52vw" rise="-30px" op={0.52} />
          <WindSwirl w="clamp(150px, 19vw, 250px)" top="27%" left="-24%" dur="11s" delay="-6s" travel="58vw" rise="-22px" op={0.4} fy={-1} />
          <WindSwirl w="clamp(210px, 27vw, 350px)" top="44%" left="4%" dur="13s" delay="-8s" travel="64vw" rise="-42px" op={0.34} />
          <WindSwirl w="clamp(130px, 16vw, 210px)" top="8%" left="36%" dur="8s" delay="-4s" travel="44vw" rise="-18px" op={0.46} fy={-1} />
          <WindSwirl w="clamp(170px, 21vw, 280px)" top="60%" left="-12%" dur="15s" delay="-11s" travel="70vw" rise="-36px" op={0.3} />
          <WindSwirl w="clamp(160px, 20vw, 260px)" top="35%" left="54%" dur="10s" delay="-7s" travel="46vw" rise="-26px" op={0.36} />
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
