import { useState } from 'react'
import { FiInstagram, FiTwitter, FiYoutube, FiFacebook, FiSend, FiCheck } from 'react-icons/fi'
import { Link } from '../lib/router'
import { CATEGORIES } from '../data/products'
import { Logo } from './Navbar'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (/^\S+@\S+\.\S+$/.test(email)) setDone(true)
  }
  return (
    <section className="container-x py-16">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-white sm:px-12">
        <div className="pointer-events-none absolute -right-10 -top-16 size-64 rounded-full bg-volt/30 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Get 15% off your first order</h2>
            <p className="mt-2 text-white/80">Join 20,000+ tech lovers. New drops, deals and tips – no spam.</p>
          </div>
          {done ? (
            <p className="flex items-center gap-3 rounded-2xl bg-white/15 px-5 py-4 font-medium animate-pop"><FiCheck className="text-volt" size={22} /> You're in! Use code <b className="text-volt">WELCOME15</b> at checkout.</p>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="input flex-1 rounded-full! border-transparent py-3.5 text-ink" aria-label="Email address" />
              <button className="btn-volt"><FiSend /> Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">Smart gadgets for everyday life. Genuine products, fast delivery, 2-year warranty and 30-day easy returns.</p>
          <div className="mt-6 flex gap-2">
            {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((I, i) => (
              <a key={i} href="#/" className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-volt hover:text-ink" aria-label="Social link"><I /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((c) => <li key={c.id}><Link to={`/shop?cat=${c.id}`} className="hover:text-volt">{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-volt">About us</Link></li>
            <li><Link to="/contact" className="hover:text-volt">Contact</Link></li>
            <li><Link to="/contact?s=faq" className="hover:text-volt">FAQ</Link></li>
            <li><Link to="/style-guide" className="hover:text-volt">Design system</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">My account</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/account" className="hover:text-volt">Login / Register</Link></li>
            <li><Link to="/account" className="hover:text-volt">Order history</Link></li>
            <li><Link to="/wishlist" className="hover:text-volt">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-volt">Cart</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© 2026 Voltix. Demo store built with React & Tailwind CSS.</p>
          <div className="flex items-center gap-2">
            {['VISA', 'Mastercard', 'PayPal', 'COD'].map((m) => <span key={m} className="rounded-md bg-white/10 px-2.5 py-1 font-semibold text-white">{m}</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
