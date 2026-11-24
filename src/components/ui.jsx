import { useEffect, useRef } from 'react'
import { FiMinus, FiPlus, FiChevronRight } from 'react-icons/fi'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { Link } from '../lib/router'
import { cx } from '../lib/utils'

// Fades children in when they scroll into view
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={cx('reveal', className)} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

export function Stars({ value, size = 14, className = '' }) {
  return (
    <span className={cx('inline-flex items-center gap-0.5 text-amber-400', className)} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) =>
        value >= i ? <FaStar key={i} size={size} /> : value >= i - 0.5 ? <FaStarHalfAlt key={i} size={size} /> : <FaRegStar key={i} size={size} />
      )}
    </span>
  )
}

export function QtyPicker({ value, onChange, small }) {
  return (
    <div className={cx('inline-flex items-center rounded-full border border-line bg-white', small ? 'h-9' : 'h-12')}>
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(value - 1)} className={cx('grid place-items-center rounded-full text-ink hover:bg-surface', small ? 'size-9' : 'size-12')}>
        <FiMinus />
      </button>
      <span className={cx('text-center font-semibold', small ? 'w-6 text-sm' : 'w-8')}>{value}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(value + 1)} className={cx('grid place-items-center rounded-full text-ink hover:bg-surface', small ? 'size-9' : 'size-12')}>
        <FiPlus />
      </button>
    </div>
  )
}

export function SectionHeading({ eyebrow, title, text, center, action }) {
  return (
    <Reveal className={cx('mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between', center && 'items-center text-center md:flex-col md:items-center')}>
      <div className={cx('max-w-2xl', center && 'mx-auto')}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
        {text && <p className="mt-3 text-muted">{text}</p>}
      </div>
      {action}
    </Reveal>
  )
}

// Dark page header with breadcrumb, used on inner pages
export function PageHeader({ title, text, crumbs = [] }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-volt/20 blur-3xl" />
      <div className="container-x relative py-14 sm:py-20">
        <nav className="flex flex-wrap items-center gap-1 text-sm text-white/60" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-volt">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <FiChevronRight />
              {c.to ? <Link to={c.to} className="hover:text-volt">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="mt-4 animate-fade-up text-4xl font-bold sm:text-5xl">{title}</h1>
        {text && <p className="mt-3 max-w-2xl animate-fade-up text-white/70 [animation-delay:120ms]">{text}</p>}
      </div>
    </section>
  )
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="card mx-auto flex max-w-lg flex-col items-center px-6 py-14 text-center animate-pop">
      <div className="grid size-16 place-items-center rounded-full bg-surface text-2xl text-brand"><Icon /></div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export function Field({ label, error, children, className = '' }) {
  return (
    <label className={cx('block', className)}>
      <span className="label">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-sale">{error}</span>}
    </label>
  )
}
