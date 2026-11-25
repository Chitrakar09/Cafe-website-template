const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const StarIcon = ({ className }) => (
  <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-hidden="true">
    <path d="M234.5 114.4l-45.1 39.4 13.5 58.1a16 16 0 0 1-23.8 17.3L128 198.5l-51.1 30.7a16 16 0 0 1-23.8-17.3l13.5-58.1-45.1-39.4a16 16 0 0 1 9.1-28.1l59.5-5.2 23.2-55.4a16 16 0 0 1 29.6 0l23.2 55.4 59.5 5.2a16 16 0 0 1 9.1 28.1z" />
  </svg>
)
export const ChevronIcon = ({ direction = 'right', className }) => (
  <svg {...base} className={className}><path d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} /></svg>
)
export const socialIcons = {
  instagram: (c) => (<svg {...base} className={c}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>),
  facebook: (c) => (<svg {...base} className={c}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>),
  x: (c) => (<svg {...base} className={c}><path d="M4 4l16 16M20 4L4 20" /></svg>),
}
