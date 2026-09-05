import { Phone, PlaneLanding } from 'lucide-react'
import { contacts, couple, wedding } from '../config.js'
import useParallax from '../lib/parallax.js'

/* ---------------------------------------------------------------------------
   The ground.

   Everything above this is falling; this is what it lands on. The CSS sky has
   already paled into sky-clouds.jpg by the time you get here (the bank is
   pinned to the floor of the document), and the horizon, the sea and the island
   close the drop.

   The three of them move at three different rates off the footer's own --s, so
   the last stretch of scrolling reads as ground rushing up to meet the lens
   rather than as one flat block sliding into place.
--------------------------------------------------------------------------- */

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
          <svg
            className="isle"
            viewBox="0 0 380 130"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M0 130V78c40-2 66-30 104-44 36-13 72-4 96 20s64 38 120 42c24 2 44 3 60 4v30z"
              fill="currentColor"
            />
          </svg>

          <div className="footer-inner wrap">
            <p className="arrival">
              <PlaneLanding size={17} strokeWidth={1.8} aria-hidden="true" />
              Ankomst
            </p>

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
