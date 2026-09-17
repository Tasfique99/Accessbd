const props = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function IconHome(p) {
  return (
    <svg {...props} {...p}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </svg>
  )
}
export function IconScan(p) {
  return (
    <svg {...props} {...p}>
      <path d="M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M17 20h2a1 1 0 0 0 1-1v-2M4 12h16" />
    </svg>
  )
}
export function IconHistory(p) {
  return (
    <svg {...props} {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5L15 14" />
    </svg>
  )
}
export function IconSettings(p) {
  return (
    <svg {...props} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.2.7.8 1.2 1.5 1.2H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  )
}
export function IconInfo(p) {
  return (
    <svg {...props} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 8h.01" />
    </svg>
  )
}
export function IconEye(p) {
  return (
    <svg {...props} {...p}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
export function IconTranslate(p) {
  return (
    <svg {...props} {...p}>
      <path d="M4 5h7M7.5 5C7.5 11 4 14 4 14M11 5c-1 6-4 9-7 10M8 19l8-14M13 19h7M15 15h6" />
    </svg>
  )
}
export function IconSimplify(p) {
  return (
    <svg {...props} {...p}>
      <path d="M4 7h10M4 12h16M4 17h7" />
    </svg>
  )
}
export function IconAsk(p) {
  return (
    <svg {...props} {...p}>
      <path d="M5 18v-1a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v1" />
      <circle cx="12" cy="8" r="3" />
    </svg>
  )
}
export function IconVolume(p) {
  return (
    <svg {...props} {...p}>
      <path d="M4 10v4h4l5 4V6L8 10H4zM16 9a4 4 0 0 1 0 6M18.5 7a7 7 0 0 1 0 10" />
    </svg>
  )
}
export function IconCamera(p) {
  return (
    <svg {...props} {...p}>
      <path d="M4 8h3l2-2h6l2 2h3v11H4z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  )
}
export function IconUpload(p) {
  return (
    <svg {...props} {...p}>
      <path d="M12 16V5M8 9l4-4 4 4M5 19h14" />
    </svg>
  )
}
export function IconStop(p) {
  return (
    <svg {...props} {...p}>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
    </svg>
  )
}
export function IconCheck(p) {
  return (
    <svg {...props} {...p}>
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  )
}
export function IconArrowLeft(p) {
  return (
    <svg {...props} {...p}>
      <path d="M15 5 8 12l7 7M8 12h10" />
    </svg>
  )
}
export function IconFile(p) {
  return (
    <svg {...props} {...p}>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  )
}
export function IconTrash(p) {
  return (
    <svg {...props} {...p}>
      <path d="M5 7h14M10 7V5h4v2M8 7l.8 12h6.4L16 7" />
    </svg>
  )
}
export function IconOpen(p) {
  return (
    <svg {...props} {...p}>
      <path d="M8 12h10M14 8l4 4-4 4M5 5v14" />
    </svg>
  )
}
export function IconMark(p) {
  return (
    <svg {...props} {...p}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 12h8M8 8h5M8 16h4" />
    </svg>
  )
}
