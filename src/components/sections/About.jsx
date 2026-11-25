import { about, contact, site } from '../../data/configs'
import { sectionIds } from '../../data/constants'
import Button from '../ui/Button.jsx'

export default function About() {
  return (
    <section id={sectionIds.about} className="section justify-center py-10 md:min-h-[80vh]">
      <div className="flex w-full max-w-[1080px] flex-col items-center gap-10 rounded-[56px] bg-highlight p-6 md:flex-row">
        <div role="img" aria-label={about.title} style={{ backgroundImage: `url(${about.image})` }} className="h-[320px] w-full rounded-[32px] bg-bg bg-cover bg-center md:h-[480px] md:flex-1" />
        <div className="flex w-full max-w-[480px] flex-1 flex-col items-center gap-8 text-center md:max-w-none md:items-start md:text-left">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <img src={site.logo} alt="" className="h-[53px] w-[68px] object-contain" />
            <h2 className="h2">{about.title}</h2>
          </div>
          <p className="md:w-[90%]">{about.description}</p>
          <div><strong className="font-medium">Location:</strong>{contact.address.map((l, i) => <p key={i}>{l}</p>)}</div>
          <Button href={about.cta.href}>{about.cta.label}</Button>
        </div>
      </div>
    </section>
  )
}
