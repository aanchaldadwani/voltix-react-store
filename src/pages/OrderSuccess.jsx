import { FiCheck, FiPackage, FiTruck, FiHome, FiPrinter } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { Link } from '../lib/router'
import { img } from '../data/products'
import { cx, money, useTitle } from '../lib/utils'
import { EmptyState } from '../components/ui'

const TRACK = [
  { label: 'Order placed', icon: FiCheck },
  { label: 'Packed', icon: FiPackage },
  { label: 'Shipped', icon: FiTruck },
  { label: 'Delivered', icon: FiHome },
]

export default function OrderSuccess({ id }) {
  useTitle('Order confirmed')
  const { orders } = useStore()
  const o = orders.find((x) => x.id === id)
  if (!o) return <section className="container-x py-20"><EmptyState icon={FiPackage} title="Order not found" text="We couldn't find that order on this device." action={<Link to="/account" className="btn-primary">View my orders</Link>} /></section>

  const eta = new Date(o.date)
  eta.setDate(eta.getDate() + (o.delivery?.id === 'standard' ? 5 : o.delivery?.id === 'express' ? 2 : 0))

  return (
    <section className="container-x py-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto grid size-20 animate-pop place-items-center rounded-full bg-green-500 text-4xl text-white shadow-lift"><FiCheck /></div>
          <h1 className="mt-6 animate-fade-up text-4xl font-bold">Thank you for your order!</h1>
          <p className="mt-3 animate-fade-up text-muted [animation-delay:100ms]">A confirmation has been sent to <b className="text-ink">{o.customer.email}</b>.</p>
          <p className="mt-4 inline-flex rounded-full bg-surface px-5 py-2 font-semibold">Order #{o.id}</p>
        </div>

        <div className="card mt-10 p-6 sm:p-8">
          <h2 className="font-bold">Order status</h2>
          <ol className="mt-6 grid grid-cols-4">
            {TRACK.map((t, i) => (
              <li key={t.label} className="relative flex flex-col items-center text-center">
                {i > 0 && <span className={cx('absolute right-1/2 top-5 h-0.5 w-full', i === 0 ? 'bg-green-500' : 'bg-line')} />}
                <span className={cx('relative z-10 grid size-10 place-items-center rounded-full', i === 0 ? 'bg-green-500 text-white' : 'bg-surface text-muted')}><t.icon /></span>
                <span className={cx('mt-2 text-xs font-semibold sm:text-sm', i === 0 ? 'text-ink' : 'text-muted')}>{t.label}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-xl bg-brand/5 px-4 py-3 text-sm">Estimated delivery: <b>{eta.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</b> · {o.delivery?.name}</p>
        </div>

        <div className="card mt-6 p-6 sm:p-8">
          <h2 className="font-bold">Items</h2>
          <ul className="mt-4 divide-y divide-line">
            {o.items.map((i) => (
              <li key={`${i.id}-${i.color}`} className="flex items-center gap-4 py-4">
                <img src={img(i.photo, 160)} alt="" className="size-16 rounded-xl object-cover" />
                <span className="flex-1"><span className="block font-medium">{i.name}</span><span className="text-sm text-muted">Qty {i.qty}</span></span>
                <span className="font-semibold">{money(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-6 border-t border-line pt-6 text-sm sm:grid-cols-3">
            <div><p className="text-muted">Ship to</p><p className="mt-1 font-medium">{o.customer.name}<br />{o.address}</p></div>
            <div><p className="text-muted">Payment</p><p className="mt-1 font-medium">{o.payment}</p></div>
            <div><p className="text-muted">Total paid</p><p className="mt-1 text-2xl font-bold">{money(o.grandTotal)}</p></div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="btn-primary">Continue shopping</Link>
          <Link to="/account" className="btn-outline">My orders</Link>
          <button onClick={() => window.print()} className="btn-outline"><FiPrinter /> Print</button>
        </div>
      </div>
    </section>
  )
}
