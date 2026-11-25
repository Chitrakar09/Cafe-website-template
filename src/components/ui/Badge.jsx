export default function Badge({ children, className = '' }) {
  return <span className={`inline-flex rounded-full border-2 border-highlight bg-[rgba(255,251,242,0.8)] px-4 py-3 ${className}`}>{children}</span>
}
