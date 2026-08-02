import { useGalleryStore } from '../../store/useGalleryStore'
import { useSessionStore } from '../../store/useSessionStore'
import { ActionButton } from '../controls/ActionButton'
import { ModeSelector } from '../controls/ModeSelector'

interface BottomActionBarProps {
  onCapture: () => void
  capturing: boolean
}

export function BottomActionBar({ onCapture, capturing }: BottomActionBarProps) {
  const photoCount = useGalleryStore((s) => s.photos.length)
  const setGalleryOpen = useGalleryStore((s) => s.setOpen)
  const { mode, mirrored, setMirrored } = useSessionStore()

  return (
    <div className="pointer-events-auto flex items-end justify-between gap-4 px-6 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <button
        type="button"
        onClick={() => setGalleryOpen(true)}
        className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl backdrop-blur"
        aria-label="Buka galeri"
      >
        🎞️
        {photoCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand-accent)] px-1 text-[10px] font-bold text-white">
            {photoCount}
          </span>
        )}
      </button>

      <div className="flex flex-col items-center gap-3">
        <ModeSelector />
        <ActionButton onPress={onCapture} disabled={capturing} mode={mode} />
      </div>

      <button
        type="button"
        onClick={() => setMirrored(!mirrored)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl backdrop-blur"
        aria-label="Balik kamera"
      >
        🔄
      </button>
    </div>
  )
}
