const variants = {
  primary: 'bg-ink text-white',
  secondary: 'border-2 border-ink text-ink',
}

export default function Button({ href, variant = 'primary', press = 0.95, className = '', style, children, ...props }) {
  return (
    <a href={href} style={{ '--press': press, ...style }} className={`hover-press inline-flex items-center justify-center rounded-full px-8 py-4 ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}
