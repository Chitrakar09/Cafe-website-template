export default function MenuItem({ name, price, description }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2.5">
        <span className="flex-1 font-medium">{name}</span>
        <span className="font-medium">{price}</span>
      </div>
      <p className="w-[85%] text-ink-2">{description}</p>
    </div>
  )
}
