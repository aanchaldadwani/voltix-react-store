import { useEffect } from 'react'
import { FiX, FiTrash2, FiShoppingBag, FiTruck } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { Link, navigate } from '../lib/router'
import { img } from '../data/products'
import { FREE_SHIPPING_FROM, money, cx } from '../lib/utils'
import { QtyPicker } from './ui'

export default function CartDrawer() {
  const { cart, totals, cartOpen, setCartOpen, updateQty, removeFromCart } = useStore()
  const left = Math.max(0, FREE_SHIPPING_FROM - (totals.subtotal - totals.discount))
  const pct = Math.min(100, ((totals.subtotal - totals.discount) / FREE_SHIPPING_FROM) * 100)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setCartOpen])

  const go = (to) => {
    setCartOpen(false)
    navigate(to)
  }

  return (
    <div className={cx('fixed inset-0 z-50', cartOpen ? 'visible' : 'invisible')} aria-hidden={!cartOpen}>
      <div onClick={() => setCartOpen(false)} className={cx('absolute inset-0 bg-ink/50 backdrop-blur-sm transition duration-300', cartOpen ? 'opacity-100' : 'opacity-0')} />
      <aside role="dialog" aria-label="Shopping cart" className={cx('absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-lift transition duration-300 ease-out', cartOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-xl font-bold">Your cart <span className="text-muted">({totals.count})</span></h2>
          <button onClick={() => setCartOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-surface" aria-label="Close cart"><FiX size={20} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-surface text-2xl text-brand"><FiShoppingBag /></div>
            <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted">Find something you love in our shop.</p>
            <button onClick={() => go('/shop')} className="btn-primary mt-6">Start shopping</button>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-6 py-4">
              <p className="flex items-center gap-2 text-sm">
                <FiTruck className="text-brand" />
                {left > 0 ? <>Add <b>{money(left)}</b> more for <b>free shipping</b></> : <b className="text-green-600">You've unlocked free shipping!</b>}
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface"><div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${pct}%` }} /></div>
            </div>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {cart.map((i) => (
                <li key={i.key} className="flex gap-4 py-5 animate-fade-in">
                  <img src={img(i.product.photos[0], 200)} alt="" className="size-20 shrink-0 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link to={`/product/${i.product.slug}`} onClick={() => setCartOpen(false)} className="text-sm font-semibold leading-snug hover:text-brand">{i.product.name}</Link>
                      <button onClick={() => removeFromCart(i.key)} className="text-muted hover:text-sale" aria-label="Remove item"><FiTrash2 /></button>
                    </div>
                    <span className="mt-1 flex items-center gap-1.5 text-xs text-muted">Colour <span className="size-3 rounded-full ring-1 ring-line" style={{ background: i.color }} /></span>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QtyPicker small value={i.qty} onChange={(q) => updateQty(i.key, q)} />
                      <span className="font-semibold">{money(i.product.price * i.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-5">
              <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span className="font-semibold">{money(totals.subtotal)}</span></div>
              {totals.discount > 0 && <div className="mt-1 flex justify-between text-sm text-green-600"><span>Discount</span><span>-{money(totals.discount)}</span></div>}
              <p className="mt-1 text-xs text-muted">Shipping and tax calculated at checkout.</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button onClick={() => go('/cart')} className="btn-outline">View cart</button>
                <button onClick={() => go('/checkout')} className="btn-primary">Checkout</button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
