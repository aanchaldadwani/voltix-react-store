import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products'
import { COUPONS, FREE_SHIPPING_FROM, SHIPPING_FEE, load, save } from '../lib/utils'

const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('voltix-cart', []))
  const [wishlist, setWishlist] = useState(() => load('voltix-wishlist', []))
  const [orders, setOrders] = useState(() => load('voltix-orders', []))
  const [user, setUser] = useState(() => load('voltix-user', null))
  const [coupon, setCoupon] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  useEffect(() => save('voltix-cart', cart), [cart])
  useEffect(() => save('voltix-wishlist', wishlist), [wishlist])
  useEffect(() => save('voltix-orders', orders), [orders])
  useEffect(() => save('voltix-user', user), [user])

  const toast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800)
  }, [])

  const addToCart = useCallback((product, qty = 1, color = product.colors[0], { open = true } = {}) => {
    setCart((c) => {
      const key = `${product.id}-${color}`
      const found = c.find((i) => i.key === key)
      if (found) return c.map((i) => (i.key === key ? { ...i, qty: Math.min(10, i.qty + qty) } : i))
      return [...c, { key, id: product.id, qty, color }]
    })
    toast(`${product.name} added to cart`)
    if (open) setCartOpen(true)
  }, [toast])

  const updateQty = (key, qty) => setCart((c) => c.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i)))
  const removeFromCart = (key) => setCart((c) => c.filter((i) => i.key !== key))
  const clearCart = () => setCart([])

  const toggleWishlist = (product) => {
    const has = wishlist.includes(product.id)
    toast(has ? 'Removed from wishlist' : `${product.name} saved to wishlist`, has ? 'info' : 'success')
    setWishlist((w) => (has ? w.filter((id) => id !== product.id) : [...w, product.id]))
  }
  const inWishlist = (id) => wishlist.includes(id)

  const applyCoupon = (code) => {
    const c = code.trim().toUpperCase()
    if (COUPONS[c]) {
      setCoupon({ code: c, rate: COUPONS[c] })
      toast(`Coupon ${c} applied – ${COUPONS[c] * 100}% off`)
      return true
    }
    toast('That coupon code is not valid', 'error')
    return false
  }

  const items = useMemo(
    () => cart.map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.id) })).filter((i) => i.product),
    [cart]
  )
  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0)
    const discountAmt = coupon ? Math.round(subtotal * coupon.rate * 100) / 100 : 0
    const shipping = subtotal === 0 || subtotal - discountAmt >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
    const tax = Math.round((subtotal - discountAmt) * 0.05 * 100) / 100
    return { subtotal, discount: discountAmt, shipping, tax, total: Math.round((subtotal - discountAmt + shipping + tax) * 100) / 100, count: items.reduce((s, i) => s + i.qty, 0) }
  }, [items, coupon])

  const placeOrder = (details) => {
    const id = 'VX' + Date.now().toString().slice(-7)
    const order = { id, date: new Date().toISOString(), items: items.map(({ id, qty, color, product }) => ({ id, qty, color, name: product.name, price: product.price, photo: product.photos[0] })), totals, ...details, status: 'Processing' }
    setOrders((o) => [order, ...o])
    setCart([])
    setCoupon(null)
    return id
  }

  const value = {
    cart: items, totals, addToCart, updateQty, removeFromCart, clearCart,
    wishlist, toggleWishlist, inWishlist,
    coupon, applyCoupon, removeCoupon: () => setCoupon(null),
    orders, placeOrder,
    user, login: (u) => { setUser(u); toast(`Welcome, ${u.name.split(' ')[0]}!`) }, logout: () => { setUser(null); toast('You have been logged out', 'info') },
    cartOpen, setCartOpen, toasts, toast,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
