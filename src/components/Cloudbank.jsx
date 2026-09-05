/**
 * sky-clouds.jpg, pinned to the floor of the document and full bleed, kept at
 * its true 1920x1138 aspect. A long mask fade on its top edge joins it to the
 * CSS sky; because both are the same colour there, the seam disappears. Its
 * bottom edge is handled at the other end — see .horizon::before in
 * styles/sections.css, which is the haze the photo dissolves into before the
 * water starts.
 * (Background image and mask live in styles/sky.css.)
 */
export default function Cloudbank() {
  return <div className="cloudbank" aria-hidden="true" />
}
