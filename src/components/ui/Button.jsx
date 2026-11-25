const variants = {
  primary: 'bg-ink text-white',
  secondary: 'border-2 border-ink text-ink',
}

export default function Button({ href, variant = 'primary', className = '', children, ...props }) {
  return (
    <a href={href} className={`inline-flex items-center justify-center rounded-full px-8 py-4 transition-opacity hover:opacity-80 ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}
