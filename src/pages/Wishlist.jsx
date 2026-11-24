import { FiHeart, FiShoppingBag, FiTrash2 } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { Link } from '../lib/router'
import { PRODUCTS, img, categoryName } from '../data/products'
import { money, useTitle } from '../lib/utils'
import { PageHeader, EmptyState, Stars } from '../components/ui'

export default function Wishlist() {
  useTitle('Wishlist')
  const { wishlist, toggleWishlist, addToCart } = useStore()
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id))
  const moveAll = () => items.forEach((p) => { addToCart(p, 1, p.colors[0], { open: false }); toggleWishlist(p) })

  return (
    <>
      <PageHeader title="My wishlist" text="Save your favourite gadgets and buy them when you're ready." crumbs={[{ label: 'Wishlist' }]} />
      <section className="container-x py-12">
        {items.length === 0 ? (
          <EmptyState icon={FiHeart} title="Your wishlist is empty" text="Tap the heart on any product to save it here." action={<Link to="/shop" className="btn-primary">Explore products</Link>} />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-muted"><b className="text-ink">{items.length}</b> saved items</p>
              <button onClick={moveAll} className="btn-primary"><FiShoppingBag /> Move all to cart</button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <article key={p.id} className="card flex animate-fade-up gap-4 p-4" style={{ animationDelay: `${i * 60}ms` }}>
                  <Link to={`/product/${p.slug}`} className="shrink-0"><img src={img(p.photos[0], 300)} alt={p.name} className="size-28 rounded-2xl object-cover" /></Link>
                  <div className="flex flex-1 flex-col">
                    <p className="text-xs uppercase tracking-wider text-muted">{categoryName(p.category)}</p>
                    <Link to={`/product/${p.slug}`} className="font-semibold leading-snug hover:text-brand">{p.name}</Link>
                    <Stars value={p.rating} size={12} className="mt-1" />
                    <p className="mt-1 font-bold">{money(p.price)} {p.oldPrice && <span className="text-sm font-normal text-muted line-through">{money(p.oldPrice)}</span>}</p>
                    <div className="mt-auto flex gap-2 pt-3">
                      <button onClick={() => { addToCart(p); toggleWishlist(p) }} className="btn-primary flex-1 px-3! py-2!"><FiShoppingBag /> Add to cart</button>
                      <button onClick={() => toggleWishlist(p)} className="grid size-9 place-items-center rounded-full border border-line text-muted hover:text-sale" aria-label="Remove"><FiTrash2 /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  )
}
