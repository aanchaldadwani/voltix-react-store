import { useEffect, useMemo, useState } from 'react'
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiLock, FiChevronLeft, FiChevronRight, FiZap } from 'react-icons/fi'
import { Link } from '../lib/router'
import { useStore } from '../context/StoreContext'
import { CATEGORIES, PRODUCTS, PHOTOS, img, findProduct, discount } from '../data/products'
import { money, cx, useTitle } from '../lib/utils'
import ProductCard from '../components/ProductCard'
import { Reveal, SectionHeading, Stars } from '../components/ui'
import { Newsletter } from '../components/Footer'

const SLIDES = [
  { eyebrow: 'New season audio', title: 'Hear every detail.', text: 'Aura ANC headphones with 40-hour battery and studio-grade sound. Now 25% off.', cta: '/product/aura-anc-wireless-headphones', photo: PHOTOS.fl6, accent: 'from-brand/70' },
  { eyebrow: 'Smart wearables', title: 'Your health, on your wrist.', text: 'Volt Watch Series 5 – GPS, heart-rate and a 7-day battery in one sleek design.', cta: '/product/volt-watch-series-5', photo: PHOTOS.w1, accent: 'from-ink/80' },
  { eyebrow: 'Level up your setup', title: 'Built for play & work.', text: 'Mechanical keyboards, VR headsets and controllers made for long sessions.', cta: '/shop?cat=gaming', photo: PHOTOS.kb2, accent: 'from-brand/60' },
]

function HeroSlider() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [i])
  const go = (d) => setI((x) => (x + d + SLIDES.length) % SLIDES.length)

  return (
    <section className="container-x pt-6">
      <div className="relative h-[540px] overflow-hidden rounded-[2rem] bg-ink sm:h-[580px]">
        {SLIDES.map((s, idx) => (
          <div key={idx} className={cx('absolute inset-0 transition-opacity duration-1000', idx === i ? 'opacity-100' : 'pointer-events-none opacity-0')} aria-hidden={idx !== i}>
            <img src={img(s.photo, 1800)} alt="" className={cx('size-full object-cover transition-transform duration-[7000ms] ease-out', idx === i ? 'scale-105' : 'scale-115')} />
            <div className={cx('absolute inset-0 bg-gradient-to-r via-ink/60 to-ink/10', s.accent)} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
            {idx === i && (
              <div className="relative flex h-full max-w-2xl flex-col justify-center px-8 text-white sm:px-14">
                <span className="w-fit animate-fade-up rounded-full bg-volt px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">{s.eyebrow}</span>
                <h1 className="mt-5 animate-fade-up text-5xl font-bold leading-[1.02] [animation-delay:100ms] sm:text-7xl">{s.title}</h1>
                <p className="mt-5 max-w-lg animate-fade-up text-lg text-white/80 [animation-delay:200ms]">{s.text}</p>
                <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
                  <Link to={s.cta} className="btn-volt">Shop now <FiArrowRight /></Link>
                  <Link to="/shop" className="btn-ghost">Browse all</Link>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="absolute bottom-6 left-8 flex gap-2 sm:left-14">
          {SLIDES.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={cx('h-2 rounded-full transition-all duration-500', idx === i ? 'w-10 bg-volt' : 'w-2 bg-white/50 hover:bg-white')} />
          ))}
        </div>
        <div className="absolute bottom-5 right-6 flex gap-2">
          <button onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white hover:text-ink" aria-label="Previous slide"><FiChevronLeft size={20} /></button>
          <button onClick={() => go(1)} className="grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white hover:text-ink" aria-label="Next slide"><FiChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  )
}

const PERKS = [
  { icon: FiTruck, title: 'Free shipping', text: 'On orders over $99' },
  { icon: FiShield, title: '2-year warranty', text: 'On every product' },
  { icon: FiRefreshCw, title: '30-day returns', text: 'No questions asked' },
  { icon: FiLock, title: 'Secure payment', text: 'Cards, PayPal & COD' },
]

function useCountdown() {
  const end = useMemo(() => { const d = new Date(); d.setHours(23, 59, 59, 999); return d }, [])
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const s = Math.max(0, Math.floor((end - now) / 1000))
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, '0'))
}

function DealOfTheDay() {
  const { addToCart } = useStore()
  const p = findProduct('skyline-mini-drone')
  const [h, m, s] = useCountdown()
  return (
    <section className="container-x py-16">
      <Reveal className="grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-2">
        <div className="relative min-h-72">
          <img src={img(p.photos[0], 1200)} alt={p.name} loading="lazy" className="absolute inset-0 size-full object-cover" />
          <span className="chip absolute left-6 top-6 bg-sale text-sm text-white">-{discount(p)}% today</span>
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-14">
          <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-volt"><FiZap /> Deal of the day</span>
          <h2 className="mt-3 text-4xl font-bold">{p.name}</h2>
          <p className="mt-3 text-white/70">{p.short}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/70"><Stars value={p.rating} /> {p.rating} ({p.reviews} reviews)</div>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-bold text-volt">{money(p.price)}</span>
            <span className="pb-1 text-lg text-white/50 line-through">{money(p.oldPrice)}</span>
          </div>
          <div className="mt-8 flex gap-3">
            {[[h, 'Hours'], [m, 'Mins'], [s, 'Secs']].map(([v, l]) => (
              <div key={l} className="w-20 rounded-2xl bg-white/10 py-3 text-center">
                <div className="font-display text-3xl font-bold tabular-nums">{v}</div>
                <div className="text-xs text-white/60">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => addToCart(p)} className="btn-volt">Add to cart</button>
            <Link to={`/product/${p.slug}`} className="btn-ghost">View details</Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

const TABS = [
  { id: 'best', label: 'Best sellers', filter: (p) => p.badge === 'Best Seller' || p.reviews > 250 },
  { id: 'new', label: 'New arrivals', filter: (p) => p.isNew },
  { id: 'sale', label: 'On sale', filter: (p) => p.oldPrice },
]

const TESTIMONIALS = [
  { name: 'Ayesha Khan', role: 'Bought Aura ANC Headphones', text: 'Delivery took two days and the headphones are amazing. The noise cancelling is better than my old pair that cost twice as much.', rating: 5 },
  { name: 'Daniel Reyes', role: 'Bought Skyline Air 14', text: 'Smooth checkout, clear tracking and the laptop arrived perfectly packed. I will definitely order again.', rating: 5 },
  { name: 'Sara Malik', role: 'Bought Volt Watch Series 5', text: 'Great prices and genuine products. Support helped me pick the right watch size within minutes.', rating: 5 },
]

export default function Home() {
  useTitle()
  const [tab, setTab] = useState('best')
  const list = PRODUCTS.filter(TABS.find((t) => t.id === tab).filter).slice(0, 8)

  return (
    <>
      <HeroSlider />

      <section className="container-x mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {PERKS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 80} className="flex items-center gap-4 rounded-2xl bg-surface p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-xl text-brand shadow-card"><Icon /></span>
            <div><p className="font-semibold">{title}</p><p className="text-sm text-muted">{text}</p></div>
          </Reveal>
        ))}
      </section>

      <section className="container-x pt-20">
        <SectionHeading eyebrow="Categories" title="Shop by category" text="Everything you need to work, play and stay connected." action={<Link to="/shop" className="btn-outline">All products <FiArrowRight /></Link>} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <Link to={`/shop?cat=${c.id}`} className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-ink">
                <img src={img(c.photo, 700)} alt={c.name} loading="lazy" className="size-full object-cover opacity-90 transition duration-700 group-hover:scale-110 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                  <div>
                    <h3 className="text-xl font-bold">{c.name}</h3>
                    <p className="text-sm text-white/70">{c.blurb}</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-volt text-ink transition duration-300 group-hover:rotate-[-45deg]"><FiArrowRight /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pt-20">
        <SectionHeading eyebrow="Featured" title="Trending right now"
          action={
            <div className="flex gap-1 rounded-full bg-surface p-1">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} className={cx('rounded-full px-4 py-2 text-sm font-semibold transition', tab === t.id ? 'bg-ink text-white' : 'text-muted hover:text-ink')}>{t.label}</button>
              ))}
            </div>
          } />
        <div key={tab} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}><ProductCard product={p} /></div>)}
        </div>
      </section>

      <DealOfTheDay />

      <section className="container-x grid gap-5 md:grid-cols-2">
        {[{ t: 'Up to 30% off audio', s: 'Headphones, earbuds & speakers', to: '/shop?cat=audio', photo: PHOTOS.sp2, dark: false }, { t: 'New: Nova S Series 5G', s: 'Pro-grade night photos', to: '/product/nova-s-series', photo: PHOTOS.ph2, dark: true }].map((b, i) => (
          <Reveal key={b.t} delay={i * 100}>
            <Link to={b.to} className="group relative flex h-64 overflow-hidden rounded-3xl">
              <img src={img(b.photo, 1000)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
              <div className={cx('absolute inset-0', b.dark ? 'bg-gradient-to-r from-ink/90 to-ink/10' : 'bg-gradient-to-r from-brand/90 to-brand/10')} />
              <div className="relative flex flex-col justify-center p-8 text-white">
                <p className="text-sm font-semibold uppercase tracking-wider text-volt">{b.s}</p>
                <h3 className="mt-2 max-w-xs text-3xl font-bold">{b.t}</h3>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold">Shop now <FiArrowRight className="transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="container-x pt-20">
        <SectionHeading center eyebrow="Reviews" title="Loved by 50,000+ customers" text="Rated 4.8 out of 5 from verified buyers." />
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="card flex flex-col p-7">
              <Stars value={t.rating} size={16} />
              <p className="mt-4 flex-1 leading-relaxed text-ink/80">“{t.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-brand/10 font-bold text-brand">{t.name.split(' ').map((n) => n[0]).join('')}</span>
                <div><p className="font-semibold">{t.name}</p><p className="text-xs text-muted">{t.role}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
