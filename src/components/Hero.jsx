import { ChevronsDown } from 'lucide-react'
import { couple, wedding } from '../config.js'
import { useCamera } from '../lib/parallax.js'
import Plane from './Plane.jsx'
import WindSwirl from './WindSwirl.jsx'

/*
  Pinned while the passes slide up over it (.hero-pin in hero.css). The plane
  climbs and the lettering sinks on --fall, so the opening scroll reads as the
  camera dropping away rather than the page moving up.

  --fall goes on this header, not :root: everything reading it is inside here.
*/

export default function Hero() {
  const sky = useCamera('fall')

  return (
    <header className="hero" ref={sky}>
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-wind">
          {/* Prop-wash: faster than the high wind outside the hero, and all
              four enter left and pass the plane, so they read as one airstream
              at four heights. */}
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
