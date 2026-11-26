import { menu } from '../../data/configs'
import { sectionIds } from '../../data/constants'
import Badge from '../ui/Badge.jsx'
import MenuItem from '../ui/MenuItem.jsx'
import Reveal from '../ui/Reveal.jsx'

function Category({ category }) {
  const { name, badge, image, imageSide, items } = category
  return (
    <div className="flex w-full flex-col items-start gap-4 md:flex-row">
      <Reveal trigger="view" y={120} fade={false} className={`flex w-full flex-1 flex-col gap-10 rounded-[32px] bg-highlight p-10 ${imageSide === 'left' ? 'md:order-2' : ''}`}>
        <h3 className="h3 pt-4 text-center">{name}</h3>
        <div className="flex flex-col gap-10">{items.map((it, i) => <MenuItem key={i} {...it} />)}</div>
      </Reveal>
      <Reveal trigger="view" y={40} fade={false} role="img" aria-label={badge} style={{ backgroundImage: `url(${image})` }} className="relative h-[420px] w-full flex-1 rounded-[32px] bg-highlight bg-cover bg-center md:h-[80vh]">
        <Badge className="absolute left-6 top-6">{badge}</Badge>
      </Reveal>
    </div>
  )
}

export default function Menu() {
  return (
    <section id={sectionIds.menu} className="section gap-10 py-10 md:gap-20">
      <h2 className="h2 w-full text-center">{menu.title}</h2>
      {menu.categories.map((c) => <Category key={c.id} category={c} />)}
    </section>
  )
}
