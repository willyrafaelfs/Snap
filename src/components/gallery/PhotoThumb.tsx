import type { PhotoEntry } from '../../lib/db'
import { useObjectUrl } from '../../hooks/useObjectUrl'

interface PhotoThumbProps {
  photo: PhotoEntry
  selected: boolean
  selectMode: boolean
  onTap: () => void
  onLongPress: () => void
}

export function PhotoThumb({ photo, selected, selectMode, onTap, onLongPress }: PhotoThumbProps) {
  const url = useObjectUrl(photo.blob)
  let pressTimer: ReturnType<typeof setTimeout>

  const startPress = () => {
    pressTimer = setTimeout(onLongPress, 500)
  }
  const cancelPress = () => clearTimeout(pressTimer)

  if (!url) return <div className="aspect-square animate-pulse rounded-xl bg-white/10" />

  return (
    <button
      type="button"
      onClick={onTap}
      onMouseDown={startPress}
      onMouseUp={cancelPress}
      onMouseLeave={cancelPress}
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      className="relative aspect-square overflow-hidden rounded-xl"
    >
      <img src={url} alt="Hasil foto SnapVerse" className="h-full w-full object-cover" />
      {selectMode && (
        <div
          className={`absolute inset-0 flex items-start justify-end p-1.5 ${
            selected ? 'bg-[var(--brand-accent)]/40' : 'bg-black/20'
          }`}
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] ${
              selected ? 'border-white bg-[var(--brand-accent)] text-white' : 'border-white/70 text-transparent'
            }`}
          >
            ✓
          </span>
        </div>
      )}
    </button>
  )
}
