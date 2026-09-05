import { wedding } from '../config.js'
import Panel from './Panel.jsx'

/** One pass, one paragraph. It exists to give the page a breath after the hero. */
export default function Welcome() {
  return (
    <Panel
      id="velkommen"
      eyebrow="Velkommen"
      title="Vi gifter oss"
      code="SK 01"
      tilt={-1.5}
      className="welcome"
    >
      <p>{wedding.invitation}</p>
    </Panel>
  )
}
