import { Phone } from 'lucide-react'
import { contacts, couple, wedding } from '../config.js'
import useParallax from '../lib/parallax.js'

/*
  The ground. Everything above is falling; this is what it lands on. The horizon
  haze reaches a long way up out of it (see .horizon::before in sections.css) and
  is what the drifting sky dissolves into.
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
            <ul className="contacts">
              {contacts.map((c) => (
                <li key={c.role}>
                  <p className="contact-role">{c.role}</p>
                  <p className="contact-name">{c.name}</p>
                  <a
                    className="contact-phone"
                    href={`tel:${c.phone.replace(/\s/g, '')}`}
                  >
                    <Phone size={13} strokeWidth={2} aria-hidden="true" />
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>

            <div className="smallprint">
              <span>
                {couple.one} &amp; {couple.two} · {wedding.dateLong}
              </span>
              <span>Porco Rosso © 1992 Studio Ghibli</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
