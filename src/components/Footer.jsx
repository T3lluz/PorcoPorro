import { couple, wedding } from '../config.js'
import useParallax from '../lib/parallax.js'
import porcoLogo from '../assets/Porco_Rosso_logo.png'

/*
  The ground. Everything above is falling; this is what it lands on. The horizon
  haze reaches a long way up out of it (see .horizon::before in sections.css)
  and is what the drifting sky dissolves into.
*/

export default function Footer() {
  const ground = useParallax()

  return (
    <footer className="footer" ref={ground}>
      <div className="horizon">
        <svg
          className="horizon-edge"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M0 30C160 6 320 6 480 26s320 24 480 8c150-15 320-22 480-10v36H0z"
            fill="currentColor"
          />
        </svg>

        <div className="sea">
          <div className="footer-inner wrap">
            <div className="signoff">
              <p className="signoff-couple">
                {couple.one} &amp; {couple.two}
              </p>
              <p className="signoff-date">{wedding.dateLong}</p>
              <img
                className="porco-logo"
                src={porcoLogo}
                alt="Porco Rosso"
                width="240"
                height="240"
              />
              <p className="signoff-credit">Porco Rosso © 1992 Studio Ghibli</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
