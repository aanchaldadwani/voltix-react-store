import { FiShoppingBag, FiHeart, FiArrowRight } from 'react-icons/fi'
import { PRODUCTS } from '../data/products'
import { useTitle } from '../lib/utils'
import { PageHeader, Stars, QtyPicker, Field } from '../components/ui'
import ProductCard from '../components/ProductCard'

const COLORS = [
  ['Ink', '#0b0f19', 'Text, dark sections'], ['Ink 2', '#151b2b', 'Dark cards'], ['Volt', '#c8f135', 'Accent, CTAs'], ['Brand', '#3b5bfd', 'Links, focus'],
  ['Surface', '#f5f7fb', 'Backgrounds'], ['Line', '#e6e9f2', 'Borders'], ['Muted', '#6b7280', 'Secondary text'], ['Sale', '#ef4444', 'Discounts'],
]
const TYPE = [
  ['Display / 72', 'text-7xl font-display font-bold', 'Hear every detail.'],
  ['H1 / 48', 'text-5xl font-display font-bold', 'Shop all products'],
  ['H2 / 36', 'text-4xl font-display font-bold', 'Trending right now'],
  ['H3 / 20', 'text-xl font-display font-semibold', 'Aura ANC Headphones'],
  ['Body / 16', 'text-base', 'Active noise cancelling, 40-hour battery and studio-grade sound.'],
  ['Small / 14', 'text-sm text-muted', 'Free shipping on orders over $99'],
]

const Block = ({ title, note, children }) => (
  <section className="border-t border-line py-12">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-2"><h2 className="text-2xl font-bold">{title}</h2>{note && <p className="text-sm text-muted">{note}</p>}</div>
    {children}
  </section>
)

export default function StyleGuide() {
  useTitle('Design system')
  return (
    <>
      <PageHeader title="Design system" text="The Figma design tokens and components behind Voltix, built as reusable React + Tailwind CSS code." crumbs={[{ label: 'Design system' }]} />
      <div className="container-x pb-20 pt-4">
        <Block title="Colour palette" note="Defined once as Tailwind @theme tokens">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {COLORS.map(([n, hex, use]) => (
              <div key={n} className="card overflow-hidden">
                <div className="h-24" style={{ background: hex }} />
                <div className="p-4"><p className="font-semibold">{n}</p><p className="font-mono text-xs text-muted">{hex}</p><p className="mt-1 text-xs text-muted">{use}</p></div>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Typography" note="Space Grotesk for headings · Inter for body">
          <div className="space-y-6">
            {TYPE.map(([l, c, t]) => (
              <div key={l} className="grid items-baseline gap-2 sm:grid-cols-[160px_1fr]">
                <span className="font-mono text-xs text-muted">{l}</span>
                <p className={`${c} leading-tight`}>{t}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Buttons & controls">
          <div className="flex flex-wrap items-center gap-4">
            <button className="btn-primary"><FiShoppingBag /> Primary</button>
            <button className="btn-volt">Accent <FiArrowRight /></button>
            <button className="btn-outline">Outline</button>
            <span className="rounded-full bg-ink p-1"><button className="btn-ghost">Ghost</button></span>
            <button className="btn-primary" disabled>Disabled</button>
            <button className="grid size-11 place-items-center rounded-full border border-line hover:border-ink" aria-label="Icon button"><FiHeart /></button>
            <QtyPicker value={2} onChange={() => {}} />
          </div>
        </Block>

        <Block title="Badges & ratings">
          <div className="flex flex-wrap items-center gap-3">
            <span className="chip bg-sale text-white">-25%</span>
            <span className="chip bg-volt text-ink">Best Seller</span>
            <span className="chip bg-brand text-white">New</span>
            <span className="chip bg-surface text-muted">Sonora</span>
            <span className="eyebrow">Eyebrow label</span>
            <Stars value={4.5} size={18} />
          </div>
        </Block>

        <Block title="Form inputs">
          <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
            <Field label="Default"><input className="input" placeholder="Enter your email" /></Field>
            <Field label="With error" error="Please enter a valid email"><input className="input border-sale" defaultValue="hello@" /></Field>
            <Field label="Select"><select className="input"><option>Featured</option><option>Price: low to high</option></select></Field>
            <label className="flex items-center gap-3 self-end pb-3 text-sm"><input type="checkbox" defaultChecked className="size-4 accent-brand" /> Checkbox</label>
          </div>
        </Block>

        <Block title="Product card" note="One component used on Home, Shop, Product and Wishlist">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.slice(0, 2).map((p) => <ProductCard key={p.id} product={p} />)}
            <div className="sm:col-span-2"><ProductCard product={PRODUCTS[6]} list /></div>
          </div>
        </Block>

        <Block title="Spacing & radius" note="4 px base grid">
          <div className="flex flex-wrap items-end gap-6">
            {[4, 8, 12, 16, 24, 32, 48].map((s) => <div key={s} className="text-center"><div className="rounded bg-brand/80" style={{ width: s, height: s }} /><p className="mt-2 font-mono text-xs text-muted">{s}</p></div>)}
            {[['xl', 12], ['2xl', 16], ['card', 20], ['3xl', 24], ['full', 999]].map(([n, r]) => <div key={n} className="text-center"><div className="size-16 bg-surface ring-1 ring-line" style={{ borderRadius: r }} /><p className="mt-2 font-mono text-xs text-muted">{n}</p></div>)}
          </div>
        </Block>
      </div>
    </>
  )
}
