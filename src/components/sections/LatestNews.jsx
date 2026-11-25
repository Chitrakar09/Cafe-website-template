import { news } from '../../data/configs'
import { sectionIds } from '../../data/constants'
import BlogCard from '../ui/BlogCard.jsx'

export default function LatestNews() {
  return (
    <section id={sectionIds.news} className="section gap-10 pb-10 pt-10 md:min-h-[90vh]">
      <h2 className="h2 w-full text-center">{news.title}</h2>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
        {news.posts.map((p) => <BlogCard key={p.id} {...p} />)}
      </div>
    </section>
  )
}
