import { useState } from 'react'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useSessionStore } from '../../store/useSessionStore'
import { LAYOUT_OPTIONS } from '../../lib/layouts'
import { MuteToggle } from '../feedback/MuteToggle'

export function Navbar() {
  const branding = useSettingsStore((s) => s.branding)
  const { layoutId, setLayout, showPoseGuide, togglePoseGuide } = useSessionStore()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <nav className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 pt-[calc(env(safe-area-inset-top)+0.5rem)]">
      <div className="pointer-events-auto flex items-center gap-2">
        {branding.logo ? (
          <img src={branding.logo} alt={branding.title} className="h-7 w-7 rounded-lg object-cover" />
        ) : (
          <span className="text-xl">📸</span>
        )}
        <span className="text-sm font-bold tracking-wide text-white/90">{branding.title.toUpperCase()}</span>
      </div>

      <div className="pointer-events-auto relative flex items-center gap-2">
        <MuteToggle />
        <button
          type="button"
          onClick={() => setSettingsOpen((v) => !v)}
          aria-label="Pengaturan"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg text-white/80 backdrop-blur transition hover:bg-white/20"
        >
          ⚙️
        </button>

        {settingsOpen && (
          <div className="absolute right-0 top-11 w-52 rounded-2xl border border-white/10 bg-[#150f22]/95 p-3 shadow-xl backdrop-blur">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/50">Layout Kolase</p>
            <div className="mb-3 flex gap-1.5">
              {LAYOUT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLayout(opt.id)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    layoutId === opt.id ? 'bg-[var(--brand-primary)] text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <label className="flex items-center justify-between text-xs text-white/70">
              Panduan Pose
              <input type="checkbox" checked={showPoseGuide} onChange={togglePoseGuide} className="accent-[var(--brand-accent)]" />
            </label>
          </div>
        )}
      </div>
    </nav>
  )
}
