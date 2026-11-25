import { StarIcon } from './Icons.jsx'

export default function Rating({ source, value, stars = 5 }) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-highlight px-6 py-4">
      <span>{source}:</span>
      <span className="flex items-center gap-1" aria-hidden="true">
        {Array.from({ length: stars }, (_, i) => <StarIcon key={i} className="size-5" />)}
      </span>
      <span className="font-medium">({value})</span>
    </div>
  )
}
