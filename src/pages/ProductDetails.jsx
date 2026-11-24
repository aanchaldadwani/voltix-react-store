import { useState } from 'react'
import { FiHeart, FiShoppingBag, FiTruck, FiShield, FiRefreshCw, FiCheck, FiShare2 } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { PRODUCTS, findProduct, img, discount, reviewsFor, categoryName } from '../data/products'
import { useStore } from '../context/StoreContext'
import { navigate } from '../lib/router'
import { cx, money, useTitle } from '../lib/utils'
import { PageHeader, QtyPicker, Stars, Reveal, SectionHeading, Field } from '../components/ui'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'

function Gallery({ p }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 })
  const shots = p.photos
  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      <div className="flex gap-3 sm:flex-col">
        {shots.map((ph, i) => (
          <button key={ph} onClick={() => setActive(i)} className={cx('size-20 overflow-hidden rounded-2xl border-2 transition', i === active ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100')} aria-label={`Image ${i + 1}`}>
            <img src={img(ph, 200)} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>
      <div
        className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-3xl bg-surface"
        onMouseEnter={() => setZoom((z) => ({ ...z, on: true }))}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
        }}
      >
        <img key={active} src={img(shots[active], 1200)} alt={p.name} className="size-full animate-fade-in object-cover transition-transform duration-200" style={{ transform: zoom.on ? 'scale(1.8)' : 'none', transformOrigin: `${zoom.x}% ${zoom.y}%` }} />
        {discount(p) > 0 && <span className="chip absolute left-4 top-4 bg-sale text-sm text-white">-{discount(p)}%</span>}
      </div>
    </div>
  )
}

function Reviews({ p }) {
  const [list, setList] = useState(() => reviewsFor(p))
  const [form, setForm] = useState({ name: '', rating: 5, text: '' })
  const [err, setErr] = useState({})
  const bars = [5, 4, 3, 2, 1].map((s) => ({ s, pct: s === 5 ? 78 : s === 4 ? 16 : s === 3 ? 4 : s === 2 ? 1 : 1 }))
  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Please enter your name'
    if (form.text.trim().length < 10) er.text = 'Please write at least 10 characters'
    setErr(er)
    if (Object.keys(er).length) return
    setList((l) => [{ id: Date.now(), name: form.name, rating: Number(form.rating), title: 'Customer review', text: form.text, date: 'Just now', verified: false }, ...l])
    setForm({ name: '', rating: 5, text: '' })
  }
  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
      <div>
        <div className="card p-6">
          <p className="font-display text-5xl font-bold">{p.rating}</p>
          <Stars value={p.rating} size={18} className="mt-2" />
          <p className="mt-1 text-sm text-muted">Based on {p.reviews} reviews</p>
          <div className="mt-5 space-y-2">
            {bars.map((b) => (
              <div key={b.s} className="flex items-center gap-3 text-sm">
                <span className="w-3">{b.s}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface"><div className="h-full rounded-full bg-amber-400" style={{ width: `${b.pct}%` }} /></div>
                <span className="w-9 text-right text-muted">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={submit} className="card mt-5 space-y-4 p-6" noValidate>
          <h3 className="font-semibold">Write a review</h3>
          <Field label="Your name" error={err.name}><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Rating">
            <select className="input" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
            </select>
          </Field>
          <Field label="Review" error={err.text}><textarea rows={3} className="input" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} /></Field>
          <button className="btn-primary w-full">Submit review</button>
        </form>
      </div>
      <ul className="space-y-4">
        {list.map((r) => (
          <li key={r.id} className="card animate-fade-in p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand/10 font-bold text-brand">{r.name[0]}</span>
                <div><p className="font-semibold">{r.name}</p>{r.verified && <p className="flex items-center gap-1 text-xs text-green-600"><FiCheck /> Verified buyer</p>}</div>
              </div>
              <span className="text-xs text-muted">{r.date}</span>
            </div>
            <Stars value={r.rating} className="mt-4" />
            <p className="mt-2 font-semibold">{r.title}</p>
            <p className="mt-1 text-muted">{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProductDetails({ slug }) {
  const p = findProduct(slug)
  const { addToCart, toggleWishlist, inWishlist, toast } = useStore()
  const [color, setColor] = useState(p?.colors[0])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  useTitle(p?.name)
  if (!p) return <NotFound />

  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).concat(PRODUCTS.filter((x) => x.category !== p.category)).slice(0, 4)
  const saved = inWishlist(p.id)

  return (
    <>
      <PageHeader title={p.name} crumbs={[{ label: 'Shop', to: '/shop' }, { label: categoryName(p.category), to: `/shop?cat=${p.category}` }, { label: p.name }]} />
      <section className="container-x grid gap-12 py-12 lg:grid-cols-2">
        <Gallery p={p} />
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-surface text-muted">{p.brand}</span>
            {p.badge && <span className="chip bg-volt text-ink">{p.badge}</span>}
            {p.isNew && <span className="chip bg-brand text-white">New</span>}
          </div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{p.name}</h2>
          <button onClick={() => setTab('reviews')} className="mt-3 flex items-center gap-2 text-sm text-muted hover:text-ink">
            <Stars value={p.rating} /> {p.rating} · {p.reviews} reviews
          </button>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-bold">{money(p.price)}</span>
            {p.oldPrice && <><span className="pb-1 text-lg text-muted line-through">{money(p.oldPrice)}</span><span className="chip mb-1.5 bg-sale/10 text-sale">Save {money(p.oldPrice - p.price)}</span></>}
          </div>
          <p className="mt-5 text-lg text-muted">{p.short}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {p.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm"><FiCheck className="mt-0.5 shrink-0 text-brand" /> {f}</li>)}
          </ul>

          <div className="mt-8">
            <p className="text-sm font-semibold">Colour</p>
            <div className="mt-3 flex gap-3">
              {p.colors.map((c) => (
                <button key={c} onClick={() => setColor(c)} aria-label={`Colour ${c}`} className={cx('size-10 rounded-full ring-2 ring-offset-2 transition', color === c ? 'ring-brand' : 'ring-transparent hover:ring-line')} style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QtyPicker value={qty} onChange={(v) => setQty(Math.max(1, Math.min(10, v)))} />
            <button onClick={() => addToCart(p, qty, color)} className="btn-primary h-12 flex-1"><FiShoppingBag /> Add to cart</button>
            <button onClick={() => toggleWishlist(p)} className={cx('grid size-12 place-items-center rounded-full border border-line transition hover:border-ink', saved && 'text-sale')} aria-label="Wishlist">{saved ? <FaHeart /> : <FiHeart />}</button>
            <button onClick={() => { navigator.clipboard?.writeText(window.location.href).catch(() => {}); toast('Link copied') }} className="grid size-12 place-items-center rounded-full border border-line hover:border-ink" aria-label="Share"><FiShare2 /></button>
          </div>
          <button onClick={() => { addToCart(p, qty, color, { open: false }); navigate('/checkout') }} className="btn-volt mt-3 h-12 w-full">Buy it now</button>
          <p className={cx('mt-3 text-sm font-medium', p.stock < 10 ? 'text-sale' : 'text-green-600')}>● In stock – ready to ship today</p>

          <div className="mt-8 grid gap-3 rounded-2xl bg-surface p-5 text-sm sm:grid-cols-3">
            {[[FiTruck, 'Free delivery over $99'], [FiShield, '2-year warranty'], [FiRefreshCw, '30-day returns']].map(([I, t]) => (
              <span key={t} className="flex items-center gap-2"><I className="text-brand" /> {t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x">
        <div className="flex gap-1 overflow-x-auto border-b border-line no-scrollbar">
          {[['description', 'Description'], ['specs', 'Specifications'], ['reviews', `Reviews (${p.reviews})`]].map(([id, l]) => (
            <button key={id} onClick={() => setTab(id)} className={cx('-mb-px whitespace-nowrap border-b-2 px-5 py-4 font-semibold transition', tab === id ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-ink')}>{l}</button>
          ))}
        </div>
        <div key={tab} className="animate-fade-in py-10">
          {tab === 'description' && (
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4 leading-relaxed text-ink/80">
                <p>The <b>{p.name}</b> by {p.brand} is designed for people who want premium quality without the premium price. {p.short}</p>
                <p>Every Voltix product is 100% genuine, tested before shipping and covered by our 2-year warranty. Not happy? Return it within 30 days for a full refund.</p>
                <ul className="space-y-2">{p.features.map((f) => <li key={f} className="flex gap-2"><FiCheck className="mt-1 text-brand" />{f}</li>)}</ul>
              </div>
              <img src={img(p.photos[p.photos.length > 1 ? 1 : 0], 900)} alt="" loading="lazy" className="aspect-video w-full rounded-3xl object-cover" />
            </div>
          )}
          {tab === 'specs' && (
            <dl className="card max-w-2xl divide-y divide-line">
              {Object.entries({ Brand: p.brand, Category: categoryName(p.category), ...p.specs, Warranty: '2 years' }).map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 px-6 py-4 text-sm"><dt className="text-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          )}
          {tab === 'reviews' && <Reviews p={p} />}
        </div>
      </section>

      <section className="container-x pb-20 pt-6">
        <SectionHeading eyebrow="You may also like" title="Related products" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r, i) => <Reveal key={r.id} delay={i * 70}><ProductCard product={r} /></Reveal>)}
        </div>
      </section>
    </>
  )
}
