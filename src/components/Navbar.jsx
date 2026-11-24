import { useEffect, useState } from 'react'
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiTruck } from 'react-icons/fi'
import { Link, navigate, toQuery } from '../lib/router'
import { useStore } from '../context/StoreContext'
import { CATEGORIES } from '../data/products'
import { cx } from '../lib/utils'

export const Logo = ({ light }) => (
  <Link to="/" className="flex items-center gap-2" aria-label="Voltix home">
    <svg viewBox="0 0 64 64" className="size-9"><rect width="64" height="64" rx="16" fill={light ? '#c8f135' : '#0b0f19'} /><path d="M36 8 16 36h14l-4 20 22-30H34z" fill={light ? '#0b0f19' : '#c8f135'} /></svg>
    <span className={cx('font-display text-2xl font-bold tracking-tight', light ? 'text-white' : 'text-ink')}>voltix</span>
  </Link>
)

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ path }) {
  const { totals, wishlist, setCartOpen, user } = useStore()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [path])

  const search = (e) => {
    e.preventDefault()
    navigate('/shop' + toQuery({ q: q.trim() }))
  }
  const active = (to) => (to === '/' ? path === '/' : path.startsWith(to))

  return (
    <>
      <div className="bg-volt text-ink">
        <div className="container-x flex h-9 items-center justify-center gap-2 text-xs font-semibold sm:text-sm">
          <FiTruck /> Free shipping on orders over $99 · Use code <span className="rounded bg-ink px-1.5 py-0.5 text-volt">VOLT10</span> for 10% off
        </div>
      </div>
      <header className={cx('sticky top-0 z-40 border-b transition duration-300', scrolled ? 'border-line bg-white/85 shadow-card backdrop-blur-lg' : 'border-transparent bg-white')}>
        <div className="container-x flex h-18 items-center gap-6 py-3">
          <button className="grid size-10 place-items-center rounded-full hover:bg-surface lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><FiMenu size={22} /></button>
          <Logo />
          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className={cx('relative rounded-full px-4 py-2 text-sm font-medium transition hover:bg-surface', active(l.to) && 'bg-surface text-brand')}>
                {l.label}
              </Link>
            ))}
          </nav>
          <form onSubmit={search} className="relative ml-auto hidden max-w-sm flex-1 md:block">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search headphones, watches..." className="input rounded-full! bg-surface pl-11" aria-label="Search products" />
          </form>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link to="/account" className="grid size-11 place-items-center rounded-full hover:bg-surface" aria-label="Account" title={user ? user.name : 'Login'}>
              {user ? <span className="grid size-8 place-items-center rounded-full bg-brand text-xs font-bold text-white">{user.name[0]}</span> : <FiUser size={20} />}
            </Link>
            <Link to="/wishlist" className="relative grid size-11 place-items-center rounded-full hover:bg-surface" aria-label="Wishlist">
              <FiHeart size={20} />
              {wishlist.length > 0 && <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-sale text-[10px] font-bold text-white">{wishlist.length}</span>}
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative grid size-11 place-items-center rounded-full hover:bg-surface" aria-label="Open cart">
              <FiShoppingBag size={20} />
              {totals.count > 0 && <span key={totals.count} className="absolute right-1 top-1 grid size-5 animate-pop place-items-center rounded-full bg-brand text-[10px] font-bold text-white">{totals.count}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={cx('fixed inset-0 z-50 lg:hidden', open ? 'visible' : 'invisible')}>
        <div onClick={() => setOpen(false)} className={cx('absolute inset-0 bg-ink/50 transition', open ? 'opacity-100' : 'opacity-0')} />
        <aside className={cx('absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col bg-white p-6 transition duration-300', open ? 'translate-x-0' : '-translate-x-full')}>
          <div className="flex items-center justify-between"><Logo /><button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-10 place-items-center rounded-full hover:bg-surface"><FiX size={22} /></button></div>
          <form onSubmit={search} className="relative mt-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="input rounded-full! pl-11" />
          </form>
          <nav className="mt-6 flex flex-col gap-1">
            {[...LINKS, { to: '/wishlist', label: 'Wishlist' }, { to: '/account', label: 'My Account' }, { to: '/cart', label: 'Cart' }].map((l) => (
              <Link key={l.to} to={l.to} className={cx('rounded-xl px-4 py-3 font-medium hover:bg-surface', active(l.to) && 'bg-surface text-brand')}>{l.label}</Link>
            ))}
          </nav>
          <p className="mt-6 px-4 text-xs font-semibold uppercase tracking-wider text-muted">Categories</p>
          <div className="mt-2 flex flex-col">
            {CATEGORIES.map((c) => <Link key={c.id} to={`/shop?cat=${c.id}`} className="rounded-xl px-4 py-2.5 text-sm hover:bg-surface">{c.name}</Link>)}
          </div>
        </aside>
      </div>
    </>
  )
}
