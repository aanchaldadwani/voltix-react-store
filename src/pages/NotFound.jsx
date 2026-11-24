import { Link } from '../lib/router'
import { useTitle } from '../lib/utils'

export default function NotFound() {
  useTitle('Page not found')
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-8xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-8 flex gap-3"><Link to="/" className="btn-primary">Go home</Link><Link to="/shop" className="btn-outline">Visit shop</Link></div>
    </section>
  )
}
