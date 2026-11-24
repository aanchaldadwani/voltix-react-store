import { useEffect, useState } from 'react'

// Tiny hash router: works on GitHub Pages / Netlify without server rewrites.
// URLs look like  #/shop?cat=audio  or  #/product/nova-buds-pro
const parse = () => {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [path, qs = ''] = raw.split('?')
  return { path: path || '/', query: Object.fromEntries(new URLSearchParams(qs)) }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const onChange = () => {
      setRoute(parse())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const navigate = (to) => {
  window.location.hash = to
}

export const toQuery = (obj) => {
  const q = new URLSearchParams(Object.entries(obj).filter(([, v]) => v !== '' && v != null && v !== false))
  const s = q.toString()
  return s ? `?${s}` : ''
}

export function Link({ to, children, className = '', ...rest }) {
  return (
    <a href={`#${to}`} className={className} {...rest}>
      {children}
    </a>
  )
}

// Matches "/product/:slug" style patterns
export const match = (pattern, path) => {
  const a = pattern.split('/').filter(Boolean)
  const b = path.split('/').filter(Boolean)
  if (a.length !== b.length) return null
  const params = {}
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(':')) params[a[i].slice(1)] = decodeURIComponent(b[i])
    else if (a[i] !== b[i]) return null
  }
  return params
}
