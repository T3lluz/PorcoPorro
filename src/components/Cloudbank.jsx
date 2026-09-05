/**
 * sky-clouds.jpg, pinned to the floor of the document and full bleed, kept at
 * its true 1920x1138 aspect. A 160px mask fade on its top edge joins it to the
 * CSS sky; because both are the same colour there, the seam disappears.
 * (Background image and mask live in styles/sky.css.)
 */
export default function Cloudbank() {
  return <div className="cloudbank" aria-hidden="true" />
}
