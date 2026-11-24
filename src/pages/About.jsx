import { FiAward, FiHeart, FiZap, FiGlobe, FiArrowRight } from 'react-icons/fi'
import { Link } from '../lib/router'
import { PHOTOS, img } from '../data/products'
import { useTitle } from '../lib/utils'
import { PageHeader, Reveal, SectionHeading } from '../components/ui'

const STATS = [['50K+', 'Happy customers'], ['1,200+', 'Products shipped daily'], ['4.8/5', 'Average rating'], ['30+', 'Partner brands']]
const VALUES = [
  { icon: FiAward, title: '100% genuine', text: 'Every product comes straight from the brand or an authorised distributor.' },
  { icon: FiZap, title: 'Fast delivery', text: 'Orders ship the same day and arrive in 1–5 days, tracked all the way.' },
  { icon: FiHeart, title: 'Real support', text: 'Talk to real people who know tech – by chat, email or phone, 7 days a week.' },
  { icon: FiGlobe, title: 'Greener packaging', text: 'Recycled, plastic-free boxes on every order since 2024.' },
]
const TIMELINE = [
  ['2021', 'Voltix starts as a small online gadget shop run by two friends.'],
  ['2022', 'We reach 10,000 customers and launch our own Voltix accessories.'],
  ['2024', 'Same-day delivery arrives, along with plastic-free packaging.'],
  ['2026', '50,000+ customers and a new warehouse for faster shipping.'],
]

export default function About() {
  useTitle('About us')
  return (
    <>
      <PageHeader title="We make great tech easy to get" text="Voltix brings you hand-picked gadgets at fair prices, with the service you deserve." crumbs={[{ label: 'About' }]} />

      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={img(PHOTOS.fl9, 1100)} alt="Voltix team workspace" loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
          <div className="absolute -bottom-6 -right-2 rounded-3xl bg-volt p-6 shadow-lift sm:-right-6">
            <p className="font-display text-4xl font-bold">5 years</p>
            <p className="text-sm font-medium">of happy customers</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="eyebrow">Our story</span>
          <h2 className="mt-3 text-4xl font-bold">From a small shop to 50,000 customers</h2>
          <p className="mt-5 leading-relaxed text-muted">Voltix started with a simple idea: buying tech online should feel exciting, not stressful. No fake products, no hidden fees and no waiting weeks for delivery.</p>
          <p className="mt-4 leading-relaxed text-muted">Today we work with 30+ trusted brands, test what we sell, and back everything with a 2-year warranty and 30-day returns.</p>
          <Link to="/shop" className="btn-primary mt-8">Explore the shop <FiArrowRight /></Link>
        </Reveal>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map(([n, l], i) => (
            <Reveal key={l} delay={i * 80} className="text-center">
              <p className="font-display text-4xl font-bold text-volt sm:text-5xl">{n}</p>
              <p className="mt-2 text-sm text-white/70">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading center eyebrow="Our values" title="What we stand for" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80} className="card p-7 transition hover:-translate-y-1 hover:shadow-lift">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand text-xl text-white"><Icon /></span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading center eyebrow="Our journey" title="How we got here" />
          <ol className="relative mx-auto max-w-3xl border-l-2 border-line pl-8">
            {TIMELINE.map(([y, t], i) => (
              <Reveal as="li" key={y} delay={i * 80} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[43px] top-1 grid size-6 place-items-center rounded-full bg-brand ring-4 ring-surface"><span className="size-2 rounded-full bg-volt" /></span>
                <p className="font-display text-2xl font-bold text-brand">{y}</p>
                <p className="mt-1 text-ink/80">{t}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-center text-white">
          <img src={img(PHOTOS.fl7, 1600)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-25" />
          <div className="relative">
            <h2 className="text-4xl font-bold">Ready to upgrade your tech?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">Free shipping over $99, 2-year warranty and 30-day returns on everything.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/shop" className="btn-volt">Shop now</Link><Link to="/contact" className="btn-ghost">Contact us</Link></div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
