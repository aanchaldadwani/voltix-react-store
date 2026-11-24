import { useState } from 'react'
import { FiTrash2, FiShoppingBag, FiTag, FiArrowLeft, FiLock } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { Link } from '../lib/router'
import { img, categoryName } from '../data/products'
import { FREE_SHIPPING_FROM, money, useTitle } from '../lib/utils'
import { PageHeader, QtyPicker, EmptyState } from '../components/ui'

export function OrderSummary({ children, compact }) {
  const { totals, coupon, applyCoupon, removeCoupon } = useStore()
  const [code, setCode] = useState('')
  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold">Order summary</h2>
      {!compact && (
        <form onSubmit={(e) => { e.preventDefault(); if (applyCoupon(code)) setCode('') }} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="input pl-10" aria-label="Coupon code" />
          </div>
          <button className="btn-outline px-5!">Apply</button>
        </form>
      )}
      {coupon && (
        <p className="mt-3 flex items-center justify-between rounded-xl bg-green-50 px-4 py-2.5 text-sm text-green-700">
          <span><b>{coupon.code}</b> applied ({coupon.rate * 100}% off)</span>
          <button onClick={removeCoupon} className="font-semibold underline">Remove</button>
        </p>
      )}
      {!compact && !coupon && <p className="mt-2 text-xs text-muted">Try <b>VOLT10</b> for 10% off.</p>}
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between"><dt className="text-muted">Subtotal ({totals.count} items)</dt><dd className="font-medium">{money(totals.subtotal)}</dd></div>
        {totals.discount > 0 && <div className="flex justify-between text-green-600"><dt>Discount</dt><dd>-{money(totals.discount)}</dd></div>}
        <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="font-medium">{totals.shipping === 0 ? <span className="text-green-600">Free</span> : money(totals.shipping)}</dd></div>
        <div className="flex justify-between"><dt className="text-muted">Estimated tax (5%)</dt><dd className="font-medium">{money(totals.tax)}</dd></div>
        <div className="flex justify-between border-t border-line pt-4 text-lg"><dt className="font-bold">Total</dt><dd className="font-bold">{money(totals.total)}</dd></div>
      </dl>
      {totals.shipping > 0 && <p className="mt-3 text-xs text-muted">Free shipping on orders over {money(FREE_SHIPPING_FROM)}.</p>}
      {children}
    </div>
  )
}

export default function Cart() {
  useTitle('Cart')
  const { cart, updateQty, removeFromCart, clearCart } = useStore()

  return (
    <>
      <PageHeader title="Shopping cart" crumbs={[{ label: 'Cart' }]} />
      <section className="container-x py-12">
        {cart.length === 0 ? (
          <EmptyState icon={FiShoppingBag} title="Your cart is empty" text="Looks like you haven't added anything yet." action={<Link to="/shop" className="btn-primary">Start shopping</Link>} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="card overflow-hidden">
                <div className="hidden grid-cols-[1fr_140px_120px_40px] gap-4 border-b border-line px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted md:grid">
                  <span>Product</span><span>Quantity</span><span className="text-right">Total</span><span />
                </div>
                <ul className="divide-y divide-line">
                  {cart.map((i) => (
                    <li key={i.key} className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-5 md:grid-cols-[1fr_140px_120px_40px]">
                      <div className="flex items-center gap-4">
                        <img src={img(i.product.photos[0], 240)} alt="" className="size-20 rounded-2xl object-cover sm:size-24" />
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted">{categoryName(i.product.category)}</p>
                          <Link to={`/product/${i.product.slug}`} className="font-semibold hover:text-brand">{i.product.name}</Link>
                          <p className="mt-1 flex items-center gap-2 text-sm text-muted">{money(i.product.price)} · <span className="size-3 rounded-full ring-1 ring-line" style={{ background: i.color }} /></p>
                        </div>
                      </div>
                      <div className="col-start-1 md:col-start-auto"><QtyPicker small value={i.qty} onChange={(q) => updateQty(i.key, q)} /></div>
                      <span className="row-start-1 col-start-2 text-right font-bold md:row-start-auto md:col-start-auto">{money(i.product.price * i.qty)}</span>
                      <button onClick={() => removeFromCart(i.key)} className="grid size-9 place-items-center justify-self-end rounded-full text-muted hover:bg-surface hover:text-sale" aria-label="Remove"><FiTrash2 /></button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 flex flex-wrap justify-between gap-3">
                <Link to="/shop" className="btn-outline"><FiArrowLeft /> Continue shopping</Link>
                <button onClick={clearCart} className="btn text-muted hover:text-sale">Clear cart</button>
              </div>
            </div>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <OrderSummary>
                <Link to="/checkout" className="btn-primary mt-6 w-full"><FiLock /> Proceed to checkout</Link>
              </OrderSummary>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
