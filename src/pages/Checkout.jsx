import { useState } from 'react'
import { FiCheck, FiCreditCard, FiTruck, FiUser, FiLock, FiShoppingBag } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { Link, navigate } from '../lib/router'
import { img } from '../data/products'
import { cx, money, useTitle } from '../lib/utils'
import { PageHeader, Field, EmptyState } from '../components/ui'
import { OrderSummary } from './Cart'

const STEPS = [
  { id: 1, label: 'Shipping', icon: FiUser },
  { id: 2, label: 'Delivery', icon: FiTruck },
  { id: 3, label: 'Payment', icon: FiCreditCard },
]
const DELIVERY = [
  { id: 'standard', name: 'Standard delivery', time: '3–5 business days', price: 0 },
  { id: 'express', name: 'Express delivery', time: '1–2 business days', price: 15 },
  { id: 'sameday', name: 'Same-day delivery', time: 'Order before 2 pm', price: 25 },
]

export default function Checkout() {
  useTitle('Checkout')
  const { cart, totals, placeOrder, user } = useStore()
  const [step, setStep] = useState(1)
  const [f, setF] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: '', address: '', city: '', zip: '', country: 'Pakistan', delivery: 'standard', payment: 'card', card: '', exp: '', cvc: '' })
  const [err, setErr] = useState({})
  const up = (k) => (e) => setF({ ...f, [k]: e.target.value })

  if (cart.length === 0) {
    return (
      <>
        <PageHeader title="Checkout" crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
        <section className="container-x py-12"><EmptyState icon={FiShoppingBag} title="Nothing to check out" text="Add a few products to your cart first." action={<Link to="/shop" className="btn-primary">Go to shop</Link>} /></section>
      </>
    )
  }

  const validate = (s) => {
    const e = {}
    if (s === 1) {
      if (f.name.trim().length < 3) e.name = 'Enter your full name'
      if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email'
      if (!/^[+\d\s-]{7,}$/.test(f.phone)) e.phone = 'Enter a valid phone number'
      if (f.address.trim().length < 5) e.address = 'Enter your street address'
      if (!f.city.trim()) e.city = 'Enter your city'
      if (!/^\w{3,10}$/.test(f.zip)) e.zip = 'Enter a postal code'
    }
    if (s === 3 && f.payment === 'card') {
      if (f.card.replace(/\s/g, '').length !== 16) e.card = 'Card number must be 16 digits'
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.exp)) e.exp = 'Use MM/YY'
      if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = '3–4 digits'
    }
    setErr(e)
    return Object.keys(e).length === 0
  }
  const next = () => validate(step) && setStep(step + 1)
  const deliveryFee = DELIVERY.find((d) => d.id === f.delivery).price
  const finalTotal = totals.total + deliveryFee

  const submit = (e) => {
    e.preventDefault()
    if (!validate(3)) return
    const id = placeOrder({ customer: { name: f.name, email: f.email, phone: f.phone }, address: `${f.address}, ${f.city} ${f.zip}, ${f.country}`, delivery: DELIVERY.find((d) => d.id === f.delivery), payment: f.payment === 'card' ? `Card ending ${f.card.slice(-4)}` : f.payment === 'paypal' ? 'PayPal' : 'Cash on delivery', grandTotal: finalTotal })
    navigate(`/order/${id}`)
  }

  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <section className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_400px]">
        <div>
          {/* Stepper */}
          <ol className="mb-8 flex items-center">
            {STEPS.map((s, i) => (
              <li key={s.id} className={cx('flex items-center', i < STEPS.length - 1 && 'flex-1')}>
                <button type="button" onClick={() => s.id < step && setStep(s.id)} className="flex items-center gap-3">
                  <span className={cx('grid size-11 place-items-center rounded-full font-bold transition', step > s.id ? 'bg-green-500 text-white' : step === s.id ? 'bg-ink text-white ring-4 ring-brand/20' : 'bg-surface text-muted')}>
                    {step > s.id ? <FiCheck /> : <s.icon />}
                  </span>
                  <span className={cx('hidden font-semibold sm:block', step >= s.id ? 'text-ink' : 'text-muted')}>{s.label}</span>
                </button>
                {i < STEPS.length - 1 && <span className={cx('mx-4 h-0.5 flex-1 rounded-full transition', step > s.id ? 'bg-green-500' : 'bg-line')} />}
              </li>
            ))}
          </ol>

          <form onSubmit={submit} noValidate className="card p-6 sm:p-8">
            {step === 1 && (
              <div key="s1" className="grid animate-fade-in gap-5 sm:grid-cols-2">
                <h2 className="text-2xl font-bold sm:col-span-2">Shipping details</h2>
                <Field label="Full name" error={err.name}><input className="input" value={f.name} onChange={up('name')} autoComplete="name" /></Field>
                <Field label="Email" error={err.email}><input className="input" type="email" value={f.email} onChange={up('email')} autoComplete="email" /></Field>
                <Field label="Phone" error={err.phone}><input className="input" value={f.phone} onChange={up('phone')} placeholder="+92 300 1234567" autoComplete="tel" /></Field>
                <Field label="Country"><select className="input" value={f.country} onChange={up('country')}>{['Pakistan', 'United States', 'United Kingdom', 'UAE', 'Canada'].map((c) => <option key={c}>{c}</option>)}</select></Field>
                <Field label="Street address" error={err.address} className="sm:col-span-2"><input className="input" value={f.address} onChange={up('address')} autoComplete="street-address" /></Field>
                <Field label="City" error={err.city}><input className="input" value={f.city} onChange={up('city')} /></Field>
                <Field label="Postal code" error={err.zip}><input className="input" value={f.zip} onChange={up('zip')} /></Field>
              </div>
            )}
            {step === 2 && (
              <div key="s2" className="animate-fade-in">
                <h2 className="text-2xl font-bold">Delivery method</h2>
                <div className="mt-6 space-y-3">
                  {DELIVERY.map((d) => (
                    <label key={d.id} className={cx('flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 p-5 transition', f.delivery === d.id ? 'border-brand bg-brand/5' : 'border-line hover:border-ink/30')}>
                      <span className="flex items-center gap-4">
                        <input type="radio" name="delivery" checked={f.delivery === d.id} onChange={() => setF({ ...f, delivery: d.id })} className="size-4 accent-brand" />
                        <span><span className="block font-semibold">{d.name}</span><span className="text-sm text-muted">{d.time}</span></span>
                      </span>
                      <span className="font-bold">{d.price === 0 ? 'Free' : money(d.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div key="s3" className="animate-fade-in">
                <h2 className="text-2xl font-bold">Payment</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[['card', 'Credit / debit card'], ['paypal', 'PayPal'], ['cod', 'Cash on delivery']].map(([id, l]) => (
                    <label key={id} className={cx('flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 text-sm font-semibold transition', f.payment === id ? 'border-brand bg-brand/5' : 'border-line')}>
                      <input type="radio" name="payment" checked={f.payment === id} onChange={() => setF({ ...f, payment: id })} className="size-4 accent-brand" /> {l}
                    </label>
                  ))}
                </div>
                {f.payment === 'card' && (
                  <div className="mt-6 grid animate-fade-in gap-5 sm:grid-cols-4">
                    <Field label="Card number" error={err.card} className="sm:col-span-2"><input className="input tracking-wider" inputMode="numeric" value={f.card} onChange={(e) => setF({ ...f, card: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() })} placeholder="4242 4242 4242 4242" /></Field>
                    <Field label="Expiry" error={err.exp}><input className="input" value={f.exp} onChange={(e) => setF({ ...f, exp: e.target.value.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2') })} placeholder="MM/YY" /></Field>
                    <Field label="CVC" error={err.cvc}><input className="input" inputMode="numeric" value={f.cvc} onChange={(e) => setF({ ...f, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="123" /></Field>
                  </div>
                )}
                {f.payment !== 'card' && <p className="mt-6 rounded-2xl bg-surface p-5 text-sm text-muted">{f.payment === 'paypal' ? 'You will be redirected to PayPal to complete your payment.' : 'Pay in cash when your order arrives. Please keep the exact amount ready.'}</p>}
                <p className="mt-6 flex items-center gap-2 text-xs text-muted"><FiLock /> Demo store – no real payment is taken.</p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
              {step > 1 ? <button type="button" onClick={() => setStep(step - 1)} className="btn-outline">Back</button> : <Link to="/cart" className="btn-outline">Back to cart</Link>}
              {step < 3 ? <button type="button" onClick={next} className="btn-primary">Continue</button> : <button className="btn-volt"><FiLock /> Place order · {money(finalTotal)}</button>}
            </div>
          </form>
        </div>

        <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="card p-6">
            <h3 className="font-semibold">In your cart ({totals.count})</h3>
            <ul className="mt-4 max-h-64 space-y-4 overflow-y-auto pr-1">
              {cart.map((i) => (
                <li key={i.key} className="flex items-center gap-3">
                  <span className="relative"><img src={img(i.product.photos[0], 160)} alt="" className="size-14 rounded-xl object-cover" /><span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">{i.qty}</span></span>
                  <span className="flex-1 text-sm font-medium">{i.product.name}</span>
                  <span className="text-sm font-semibold">{money(i.product.price * i.qty)}</span>
                </li>
              ))}
            </ul>
          </div>
          <OrderSummary compact>
            {deliveryFee > 0 && <p className="mt-3 flex justify-between text-sm"><span className="text-muted">{DELIVERY.find((d) => d.id === f.delivery).name}</span><span className="font-medium">+{money(deliveryFee)}</span></p>}
            {deliveryFee > 0 && <p className="mt-2 flex justify-between border-t border-line pt-3 font-bold"><span>Grand total</span><span>{money(finalTotal)}</span></p>}
          </OrderSummary>
        </div>
      </section>
    </>
  )
}
