import { useSessionStore, type CaptureMode } from '../../store/useSessionStore'

const MODES: { id: CaptureMode; label: string; icon: string }[] = [
  { id: 'single', label: 'Single', icon: '📷' },
  { id: 'burst', label: 'Burst', icon: '⏺️' },
  { id: 'timer', label: 'Timer', icon: '⏱️' },
]

export function ModeSelector() {
  const { mode, setMode, burstCount, setBurstCount, timerSeconds, setTimerSeconds } = useSessionStore()

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              mode === m.id ? 'bg-[var(--brand-primary)] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {mode === 'burst' && (
        <div className="flex gap-1.5">
          {([3, 4] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setBurstCount(n)}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                burstCount === n ? 'bg-white text-black' : 'bg-white/10 text-white/60'
              }`}
            >
              {n}x
            </button>
          ))}
        </div>
      )}

      {mode === 'timer' && (
        <div className="flex gap-1.5">
          {([3, 5, 10] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setTimerSeconds(n)}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                timerSeconds === n ? 'bg-white text-black' : 'bg-white/10 text-white/60'
              }`}
            >
              {n}s
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
