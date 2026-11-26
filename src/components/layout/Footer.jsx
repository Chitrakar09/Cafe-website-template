import { contact, footer } from '../../data/configs'
import { socialLinks } from '../../data/constants'
import { socialIcons } from '../ui/Icons.jsx'

const Block = ({ title, children }) => (
  <div className="flex flex-col gap-1"><strong className="font-medium">{title}</strong>{children}</div>
)

export default function Footer() {
  return (
    <footer className="w-full max-w-[1600px] rounded-t-[64px] border border-white bg-highlight px-5 py-5 md:px-10">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 py-10 md:px-10 lg:min-h-[640px] lg:flex-row">
        <div className="flex flex-1 flex-col gap-10 lg:gap-20">
          <h2 className="h2">{footer.tagline}</h2>
          <div className="flex flex-col gap-8">
            <Block title="Opening hours:">{contact.hours.map((h, i) => <p key={i}>{h.days}: {h.time}</p>)}</Block>
            <Block title="Phone:"><a href={contact.phone.href} className="hover:underline">{contact.phone.label}</a></Block>
            <Block title="Location:">{contact.address.map((l, i) => <p key={i}>{l}</p>)}</Block>
          </div>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a key={s.id} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer" style={{ '--press': 0.9 }} className="hover-press flex size-11 items-center justify-center rounded-full bg-bg">
                {socialIcons[s.id]('size-5')}
              </a>
            ))}
          </div>
        </div>
        <div className="h-0.5 w-full bg-ink lg:h-auto lg:w-px" />
        <div className="min-h-[320px] flex-1 overflow-hidden rounded-[32px]">
          {contact.mapEmbedUrl
            ? <iframe title="Map" src={contact.mapEmbedUrl} loading="lazy" className="size-full min-h-[320px] border-0" />
            : <div className="flex size-full min-h-[320px] items-center justify-center bg-bg text-ink-2">[Map embed – set contact.mapEmbedUrl]</div>}
        </div>
      </div>
      <div className="mx-auto flex w-full justify-center max-w-[1400px] gap-8 pb-5 md:px-10">
        <p>{footer.copyright}</p>
      </div>
    </footer>
  )
}
