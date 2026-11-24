import { useEffect, useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheck, FiChevronDown } from 'react-icons/fi'
import { cx, useTitle } from '../lib/utils'
import { PageHeader, Field, Reveal, SectionHeading } from '../components/ui'

const INFO = [
  { icon: FiPhone, title: 'Call us', lines: ['+1 (555) 014-2026', 'Mon–Sat, 9 am – 8 pm'] },
  { icon: FiMail, title: 'Email', lines: ['support@voltix.store', 'Reply within 24 hours'] },
  { icon: FiMapPin, title: 'Visit', lines: ['221 Market Street', 'San Francisco, CA'] },
  { icon: FiClock, title: 'Live chat', lines: ['7 days a week', '8 am – 11 pm'] },
]
const FAQ = [
  ['How long does delivery take?', 'Standard delivery takes 3–5 business days. Express (1–2 days) and same-day delivery are available at checkout in selected cities.'],
  ['What is your return policy?', 'You can return any product within 30 days for a full refund. Items must be in their original condition and packaging.'],
  ['Are your products genuine?', 'Yes. Every product comes directly from the brand or an authorised distributor and includes a 2-year Voltix warranty.'],
  ['Which payment methods do you accept?', 'We accept Visa, Mastercard, PayPal and cash on delivery.'],
  ['How can I track my order?', 'Log in to My Account and open Order history, or use the link in your confirmation email.'],
]

export default function Contact({ query }) {
  useTitle('Contact')
  const [f, setF] = useState({ name: '', email: '', subject: 'Order question', message: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState(0)

  useEffect(() => {
    if (query.s === 'faq') setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }, [query.s])

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (f.name.trim().length < 2) er.name = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Please enter a valid email'
    if (f.message.trim().length < 10) er.message = 'Message should be at least 10 characters'
    setErr(er)
    if (!Object.keys(er).length) setSent(true)
  }

  return (
    <>
      <PageHeader title="Get in touch" text="Questions about a product or an order? Our team is happy to help." crumbs={[{ label: 'Contact' }]} />

      <section className="container-x -mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INFO.map(({ icon: Icon, title, lines }, i) => (
          <Reveal key={title} delay={i * 70} className="card relative p-6">
            <span className="grid size-12 place-items-center rounded-2xl bg-volt text-xl text-ink"><Icon /></span>
            <h3 className="mt-4 font-bold">{title}</h3>
            {lines.map((l) => <p key={l} className="text-sm text-muted">{l}</p>)}
          </Reveal>
        ))}
      </section>

      <section className="container-x grid gap-8 py-16 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="card p-6 sm:p-10">
          {sent ? (
            <div className="flex min-h-96 animate-pop flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full bg-green-500 text-3xl text-white"><FiCheck /></span>
              <h2 className="mt-5 text-2xl font-bold">Message sent!</h2>
              <p className="mt-2 max-w-sm text-muted">Thanks {f.name.split(' ')[0]}, we'll reply to <b className="text-ink">{f.email}</b> within 24 hours.</p>
              <button onClick={() => { setSent(false); setF({ name: '', email: '', subject: 'Order question', message: '' }) }} className="btn-outline mt-6">Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><h2 className="text-2xl font-bold">Send us a message</h2><p className="mt-1 text-muted">Fill in the form and we'll get back to you quickly.</p></div>
              <Field label="Your name" error={err.name}><input className="input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
              <Field label="Email" error={err.email}><input className="input" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
              <Field label="Subject" className="sm:col-span-2">
                <select className="input" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })}>{['Order question', 'Product advice', 'Returns & refunds', 'Partnership', 'Other'].map((s) => <option key={s}>{s}</option>)}</select>
              </Field>
              <Field label="Message" error={err.message} className="sm:col-span-2"><textarea rows={5} className="input" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></Field>
              <button className="btn-primary sm:col-span-2 sm:w-fit"><FiSend /> Send message</button>
            </form>
          )}
        </Reveal>
        <Reveal delay={120} className="overflow-hidden rounded-card bg-surface">
          <iframe title="Voltix store location" className="size-full min-h-96 grayscale-[30%]" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4194%2C37.7849%2C-122.3994%2C37.7949&layer=mapnik&marker=37.7899%2C-122.4094" />
        </Reveal>
      </section>

      <section id="faq" className="container-x scroll-mt-28 pb-20">
        <SectionHeading center eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQ.map(([q, a], i) => (
            <div key={q} className="card overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold" aria-expanded={open === i}>
                {q}<FiChevronDown className={cx('shrink-0 transition duration-300', open === i && 'rotate-180 text-brand')} />
              </button>
              <div className={cx('grid transition-all duration-300', open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                <p className="overflow-hidden px-6 text-muted"><span className="block pb-5">{a}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
