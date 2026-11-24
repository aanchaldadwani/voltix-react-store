import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { Link, navigate } from '../lib/router'
import { useStore } from '../context/StoreContext'
import { discount, img, categoryName } from '../data/products'
import { money, cx } from '../lib/utils'
import { Stars } from './ui'

export default function ProductCard({ product: p, list = false }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore()
  const off = discount(p)
  const saved = inWishlist(p.id)

  return (
    <article className={cx('group card relative flex overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift', list ? 'flex-col sm:flex-row' : 'flex-col')}>
      <div className={cx('relative overflow-hidden bg-surface', list ? 'aspect-[4/3] sm:aspect-auto sm:w-64 sm:shrink-0' : 'aspect-[4/3.4]')}>
        <Link to={`/product/${p.slug}`} aria-label={p.name}>
          <img src={img(p.photos[0], 600)} alt={p.name} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-110" />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {off > 0 && <span className="chip bg-sale text-white">-{off}%</span>}
          {p.badge && <span className="chip bg-volt text-ink">{p.badge}</span>}
          {p.isNew && <span className="chip bg-brand text-white">New</span>}
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button onClick={() => toggleWishlist(p)} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} className={cx('grid size-10 place-items-center rounded-full bg-white shadow-card transition hover:scale-110', saved ? 'text-sale' : 'text-ink')}>
            {saved ? <FaHeart /> : <FiHeart />}
          </button>
          <button onClick={() => navigate(`/product/${p.slug}`)} aria-label="Quick view" className="grid size-10 translate-x-14 place-items-center rounded-full bg-white text-ink shadow-card transition duration-300 group-hover:translate-x-0 hover:scale-110">
            <FiEye />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="font-medium uppercase tracking-wider">{categoryName(p.category)}</span>
          <span className="flex items-center gap-1"><Stars value={p.rating} size={12} /> ({p.reviews})</span>
        </div>
        <Link to={`/product/${p.slug}`} className="mt-2 font-display text-lg font-semibold leading-snug hover:text-brand">
          {p.name}
        </Link>
        {list && <p className="mt-2 text-sm text-muted">{p.short}</p>}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <span className="text-xl font-bold">{money(p.price)}</span>
            {p.oldPrice && <span className="ml-2 text-sm text-muted line-through">{money(p.oldPrice)}</span>}
          </div>
          <button onClick={() => addToCart(p)} className="btn-primary px-4! py-2.5!" aria-label={`Add ${p.name} to cart`}>
            <FiShoppingBag /> <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  )
}
