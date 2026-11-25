export default function BlogCard({ title, date, image, href }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag href={href} className="flex w-full flex-col gap-6">
      <div role="img" aria-label={title} style={{ backgroundImage: `url(${image})` }} className="aspect-[0.84] w-full rounded-[32px] bg-highlight bg-cover bg-center" />
      <div className="flex flex-col gap-2.5 px-6">
        <span>{date}</span>
        <h3 className="h3">{title}</h3>
      </div>
    </Tag>
  )
}
