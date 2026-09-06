import { Phone } from 'lucide-react'
import { contacts, couple, wedding } from '../config.js'
import useParallax from '../lib/parallax.js'

/* ---------------------------------------------------------------------------
   The ground.

   Everything above this is falling; this is what it lands on. The CSS sky has
   already paled into sky-clouds.jpg by the time you get here, and the horizon
   and the sea close the drop.

   It used to carry a green island in the corner and a rotated ANKOMST stamp.
   Both are gone: the island was a shape with no place to be — the sea has no
   coastline anywhere else on the page, so a hill rising out of it read as a
   stray blob rather than as land — and the stamp was a label for a section that
   does not need one. What is left is water, two names and a phone number each.
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
