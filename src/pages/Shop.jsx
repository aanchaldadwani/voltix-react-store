import { useEffect, useMemo, useState } from 'react'
import { FiFilter, FiGrid, FiList, FiX, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { CATEGORIES, PRODUCTS, BRANDS } from '../data/products'
import { navigate, toQuery } from '../lib/router'
import { cx, money, useTitle } from '../lib/utils'
import ProductCard from '../components/ProductCard'
import { PageHeader, EmptyState, Stars } from '../components/ui'

const SORTS = {
  featured: { label: 'Featured', fn: (a, b) => b.reviews - a.reviews },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  rating: { label: 'Top rated', fn: (a, b) => b.rating - a.rating },
  newest: { label: 'Newest', fn: (a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id },
}
const PER_PAGE = 9
const MAX = 1600

export default function Shop({ query }) {
  const cats = query.cat ? query.cat.split(',') : []
  const brands = query.brand ? query.brand.split(',') : []
  const q = query.q || ''
  const max = Number(query.max) || MAX
  const minRating = Number(query.rating) || 0
  const sale = query.sale === '1'
  const sort = query.sort || 'featured'
  const page = Number(query.page) || 1
  const [view, setView] = useState('grid')
  const [panel, setPanel] = useState(false)
  const [search, setSearch] = useState(q)
  useEffect(() => setSearch(q), [q])

  useTitle(cats.length === 1 ? CATEGORIES.find((c) => c.id === cats[0])?.name : 'Shop')

  const set = (patch) => navigate('/shop' + toQuery({ ...query, page: '', ...patch }))
  const toggle = (key, list, val) => {
    const next = list.includes(val) ? list.filter((x) => x !== val) : [...list, val]
    set({ [key]: next.join(',') })
  }

  const results = useMemo(() => {
    const needle = q.toLowerCase()
    return PRODUCTS.filter(
      (p) =>
        (!cats.length || cats.includes(p.category)) &&
        (!brands.length || brands.includes(p.brand)) &&
        p.price <= max &&
        p.rating >= minRating &&
        (!sale || p.oldPrice) &&
        (!needle || `${p.name} ${p.brand} ${p.category} ${p.short}`.toLowerCase().includes(needle))
    ).sort(SORTS[sort]?.fn ?? SORTS.featured.fn)
  }, [q, cats.join(), brands.join(), max, minRating, sale, sort])

  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const shown = results.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const chips = [
    ...cats.map((c) => ({ label: CATEGORIES.find((x) => x.id === c)?.name, clear: () => toggle('cat', cats, c) })),
    ...brands.map((b) => ({ label: b, clear: () => toggle('brand', brands, b) })),
    q && { label: `“${q}”`, clear: () => { setSearch(''); set({ q: '' }) } },
    max < MAX && { label: `Under ${money(max)}`, clear: () => set({ max: '' }) },
    minRating && { label: `${minRating}★ & up`, clear: () => set({ rating: '' }) },
    sale && { label: 'On sale', clear: () => set({ sale: '' }) },
  ].filter(Boolean)

  const Filters = (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 font-semibold">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-3">
                <input type="checkbox" checked={cats.includes(c.id)} onChange={() => toggle('cat', cats, c.id)} className="size-4 accent-brand" />
                {c.name}
              </span>
              <span className="text-xs text-muted">{PRODUCTS.filter((p) => p.category === c.id).length}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 flex justify-between font-semibold">Max price <span className="text-brand">{money(max)}</span></h3>
        <input type="range" min="50" max={MAX} step="25" value={max} onChange={(e) => set({ max: e.target.value === String(MAX) ? '' : e.target.value })} className="w-full" aria-label="Maximum price" />
        <div className="mt-1 flex justify-between text-xs text-muted"><span>$50</span><span>{money(MAX)}</span></div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold">Brand</h3>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button key={b} onClick={() => toggle('brand', brands, b)} className={cx('rounded-full border px-3 py-1.5 text-sm transition', brands.includes(b) ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink')}>{b}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold">Customer rating</h3>
        <div className="space-y-2">
          {[4.7, 4.5, 4].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => set({ rating: r })} className="size-4 accent-brand" />
              <Stars value={r} /> {r} & up
            </label>
          ))}
        </div>
      </div>
      <label className="flex cursor-pointer items-center justify-between rounded-xl bg-surface px-4 py-3 text-sm font-medium">
        On sale only
        <input type="checkbox" checked={sale} onChange={() => set({ sale: sale ? '' : '1' })} className="size-4 accent-brand" />
      </label>
      {chips.length > 0 && <button onClick={() => { setSearch(''); navigate('/shop') }} className="btn-outline w-full">Clear all filters</button>}
    </div>
  )

  return (
    <>
      <PageHeader title={cats.length === 1 ? CATEGORIES.find((c) => c.id === cats[0])?.name : 'Shop all products'} text="Genuine gadgets with fast delivery, 2-year warranty and 30-day returns." crumbs={[{ label: 'Shop' }]} />

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block"><div className="sticky top-28">{Filters}</div></aside>

        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <form onSubmit={(e) => { e.preventDefault(); set({ q: search.trim() }) }} className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search in shop..." className="input rounded-full! pl-11" aria-label="Search in shop" />
            </form>
            <div className="flex items-center gap-2">
              <button onClick={() => setPanel(true)} className="btn-outline px-4! py-2.5! lg:hidden"><FiFilter /> Filters</button>
              <select value={sort} onChange={(e) => set({ sort: e.target.value })} className="input w-auto! rounded-full! py-2.5!" aria-label="Sort products">
                {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
              </select>
              <div className="hidden rounded-full bg-surface p-1 sm:flex">
                {[['grid', FiGrid], ['list', FiList]].map(([v, I]) => (
                  <button key={v} onClick={() => setView(v)} aria-label={`${v} view`} className={cx('grid size-9 place-items-center rounded-full', view === v ? 'bg-white shadow-card' : 'text-muted')}><I /></button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted">Showing <b className="text-ink">{results.length}</b> products</span>
            {chips.map((c) => (
              <button key={c.label} onClick={c.clear} className="chip bg-surface text-ink hover:bg-line">{c.label} <FiX /></button>
            ))}
          </div>

          {shown.length === 0 ? (
            <div className="mt-10"><EmptyState icon={FiSearch} title="No products found" text="Try removing a filter or searching for something else." action={<button onClick={() => { setSearch(''); navigate('/shop') }} className="btn-primary">Clear filters</button>} /></div>
          ) : (
            <div key={`${page}-${sort}-${view}`} className={cx('mt-6 grid gap-5', view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
              {shown.map((p, i) => <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}><ProductCard product={p} list={view === 'list'} /></div>)}
            </div>
          )}

          {pages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
              <button disabled={page === 1} onClick={() => set({ page: page - 1 })} className="grid size-11 place-items-center rounded-full border border-line hover:border-ink disabled:opacity-40" aria-label="Previous page"><FiChevronLeft /></button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => set({ page: n })} className={cx('size-11 rounded-full font-semibold', n === page ? 'bg-ink text-white' : 'border border-line hover:border-ink')}>{n}</button>
              ))}
              <button disabled={page === pages} onClick={() => set({ page: page + 1 })} className="grid size-11 place-items-center rounded-full border border-line hover:border-ink disabled:opacity-40" aria-label="Next page"><FiChevronRight /></button>
            </nav>
          )}
        </div>
      </div>

      {/* Mobile filter panel */}
      <div className={cx('fixed inset-0 z-50 lg:hidden', panel ? 'visible' : 'invisible')}>
        <div onClick={() => setPanel(false)} className={cx('absolute inset-0 bg-ink/50 transition', panel ? 'opacity-100' : 'opacity-0')} />
        <aside className={cx('absolute inset-y-0 left-0 w-80 max-w-[88%] overflow-y-auto bg-white p-6 transition duration-300', panel ? 'translate-x-0' : '-translate-x-full')}>
          <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-bold">Filters</h2><button onClick={() => setPanel(false)} aria-label="Close filters" className="grid size-10 place-items-center rounded-full hover:bg-surface"><FiX /></button></div>
          {Filters}
          <button onClick={() => setPanel(false)} className="btn-primary mt-8 w-full">Show {results.length} results</button>
        </aside>
      </div>
    </>
  )
}
