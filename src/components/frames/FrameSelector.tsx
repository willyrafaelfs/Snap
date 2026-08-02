import { FRAME_OPTIONS, FRAME_COLORS } from '../../lib/frames'
import { useSessionStore } from '../../store/useSessionStore'

export function FrameSelector() {
  const { frameId, setFrame, frameColor, setFrameColor } = useSessionStore()

  return (
    <div className="flex flex-col gap-3 px-1 py-1">
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {FRAME_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setFrame(opt.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              frameId === opt.id
                ? 'bg-[var(--brand-accent)] text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {frameId !== 'none' && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">Warna:</span>
          {FRAME_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFrameColor(c.hex)}
              className={`h-6 w-6 rounded-full border-2 transition ${
                frameColor === c.hex ? 'border-[var(--brand-accent)] scale-110' : 'border-white/30'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.label}
            />
          ))}
        </div>
      )}
    </div>
  )
}
