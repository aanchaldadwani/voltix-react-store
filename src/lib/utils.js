export const money = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 ? 2 : 0 })

// Safe localStorage helpers (storage can be blocked in some browsers)
export const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export const cx = (...c) => c.filter(Boolean).join(' ')

export const FREE_SHIPPING_FROM = 99
export const SHIPPING_FEE = 9
export const COUPONS = { VOLT10: 0.1, WELCOME15: 0.15 }

export const useTitle = (title) => {
  if (typeof document !== 'undefined') document.title = title ? `${title} | Voltix` : 'Voltix – Smart Gadgets & Electronics Store'
}
