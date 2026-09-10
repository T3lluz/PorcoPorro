import { couple, wedding } from '../config.js'
import useParallax from '../lib/parallax.js'

/* The ground. Its haze reaches far up out of it and is what the drifting sky
   dissolves into; see .horizon::before in sections.css. */

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
              <span className="signoff-rule" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
