import { useState } from 'react'
import { FiPackage, FiUser, FiMapPin, FiLogOut, FiHeart, FiEye, FiEyeOff } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { Link } from '../lib/router'
import { img } from '../data/products'
import { cx, money, useTitle } from '../lib/utils'
import { PageHeader, Field, EmptyState } from '../components/ui'

function AuthForms() {
  const { login } = useStore()
  const [mode, setMode] = useState('login')
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [show, setShow] = useState(false)
  const [err, setErr] = useState({})
  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (mode === 'register' && f.name.trim().length < 3) er.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Enter a valid email'
    if (f.password.length < 6) er.password = 'At least 6 characters'
    setErr(er)
    if (Object.keys(er).length) return
    login({ name: mode === 'register' ? f.name.trim() : f.email.split('@')[0].replace(/^\w/, (c) => c.toUpperCase()), email: f.email })
  }
  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-lift lg:grid-cols-2">
      <div className="relative hidden bg-ink p-12 text-white lg:block">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand/50 blur-3xl" />
        <h2 className="relative text-4xl font-bold">Welcome to Voltix</h2>
        <p className="relative mt-3 text-white/70">Create an account to track orders, save your wishlist and check out faster.</p>
        <ul className="relative mt-8 space-y-4 text-sm">
          {['Track every order in real time', 'Save addresses for 1-click checkout', 'Members get early access to deals'].map((t) => (
            <li key={t} className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-volt text-ink">✓</span>{t}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={submit} noValidate className="p-8 sm:p-12">
        <div className="flex rounded-full bg-surface p-1">
          {[['login', 'Login'], ['register', 'Register']].map(([m, l]) => (
            <button key={m} type="button" onClick={() => { setMode(m); setErr({}) }} className={cx('flex-1 rounded-full py-2.5 text-sm font-semibold transition', mode === m ? 'bg-white shadow-card' : 'text-muted')}>{l}</button>
          ))}
        </div>
        <div key={mode} className="mt-8 animate-fade-in space-y-5">
          <h3 className="text-2xl font-bold">{mode === 'login' ? 'Sign in to your account' : 'Create your account'}</h3>
          {mode === 'register' && <Field label="Full name" error={err.name}><input className="input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" /></Field>}
          <Field label="Email" error={err.email}><input className="input" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" /></Field>
          <Field label="Password" error={err.password}>
            <span className="relative block">
              <input className="input pr-12" type={show ? 'text' : 'password'} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" aria-label="Show password">{show ? <FiEyeOff /> : <FiEye />}</button>
            </span>
          </Field>
          {mode === 'login' && <div className="flex justify-between text-sm"><label className="flex items-center gap-2"><input type="checkbox" className="accent-brand" /> Remember me</label><button type="button" className="font-medium text-brand">Forgot password?</button></div>}
          <button className="btn-primary w-full">{mode === 'login' ? 'Login' : 'Create account'}</button>
          <p className="text-center text-xs text-muted">Demo store – your details stay in this browser only.</p>
        </div>
      </form>
    </div>
  )
}

export default function Account() {
  useTitle('My account')
  const { user, orders, logout, wishlist } = useStore()
  const [tab, setTab] = useState('orders')

  return (
    <>
      <PageHeader title={user ? `Hi, ${user.name.split(' ')[0]}` : 'My account'} text={user ? 'Manage your orders, details and addresses.' : 'Login or create an account to get started.'} crumbs={[{ label: 'Account' }]} />
      <section className="container-x py-12">
        {!user ? (
          <AuthForms />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="card h-fit p-3">
              <div className="flex items-center gap-3 p-3">
                <span className="grid size-12 place-items-center rounded-full bg-brand text-lg font-bold text-white">{user.name[0]}</span>
                <div className="min-w-0"><p className="truncate font-semibold">{user.name}</p><p className="truncate text-xs text-muted">{user.email}</p></div>
              </div>
              {[['orders', 'My orders', FiPackage], ['profile', 'Profile', FiUser], ['address', 'Addresses', FiMapPin]].map(([id, l, I]) => (
                <button key={id} onClick={() => setTab(id)} className={cx('flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition', tab === id ? 'bg-ink text-white' : 'hover:bg-surface')}><I /> {l}</button>
              ))}
              <Link to="/wishlist" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-surface"><FiHeart /> Wishlist ({wishlist.length})</Link>
              <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sale hover:bg-sale/5"><FiLogOut /> Logout</button>
            </aside>
            <div key={tab} className="animate-fade-in">
              {tab === 'orders' && (orders.length === 0 ? (
                <EmptyState icon={FiPackage} title="No orders yet" text="When you place an order it will show up here." action={<Link to="/shop" className="btn-primary">Start shopping</Link>} />
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div key={o.id} className="card p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                        <div><p className="font-semibold">Order #{o.id}</p><p className="text-sm text-muted">{new Date(o.date).toLocaleDateString('en-US', { dateStyle: 'medium' })} · {o.items.length} items</p></div>
                        <span className="chip bg-amber-100 text-amber-700">{o.status}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex -space-x-3">{o.items.slice(0, 4).map((i) => <img key={`${i.id}-${i.color}`} src={img(i.photo, 120)} alt="" className="size-12 rounded-full border-2 border-white object-cover" />)}</div>
                        <div className="flex items-center gap-4"><span className="text-lg font-bold">{money(o.grandTotal)}</span><Link to={`/order/${o.id}`} className="btn-outline px-4! py-2!">View details</Link></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {tab === 'profile' && (
                <div className="card max-w-2xl p-8">
                  <h2 className="text-xl font-bold">Profile</h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field label="Full name"><input className="input" defaultValue={user.name} /></Field>
                    <Field label="Email"><input className="input" defaultValue={user.email} /></Field>
                    <Field label="Phone"><input className="input" placeholder="+92 300 1234567" /></Field>
                    <Field label="Birthday"><input className="input" type="date" /></Field>
                  </div>
                  <button className="btn-primary mt-6">Save changes</button>
                </div>
              )}
              {tab === 'address' && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="card p-6"><span className="chip bg-brand/10 text-brand">Default</span><p className="mt-3 font-semibold">{user.name}</p><p className="mt-1 text-sm text-muted">{orders[0]?.address ?? 'Add an address at checkout and it will appear here.'}</p></div>
                  <button className="grid min-h-40 place-items-center rounded-card border-2 border-dashed border-line font-semibold text-muted hover:border-brand hover:text-brand">+ Add new address</button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
