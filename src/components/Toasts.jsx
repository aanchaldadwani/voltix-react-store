import { FiCheckCircle, FiInfo, FiAlertCircle } from 'react-icons/fi'
import { useStore } from '../context/StoreContext'
import { cx } from '../lib/utils'

const ICONS = { success: FiCheckCircle, info: FiInfo, error: FiAlertCircle }

export default function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[60] flex w-[min(92vw,380px)] -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-5 sm:translate-x-0" role="status" aria-live="polite">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] ?? FiInfo
        return (
          <div key={t.id} className="pointer-events-auto flex animate-fade-up items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-lift">
            <Icon className={cx('shrink-0', t.type === 'error' ? 'text-sale' : 'text-volt')} size={18} />
            {t.message}
          </div>
        )
      })}
    </div>
  )
}
