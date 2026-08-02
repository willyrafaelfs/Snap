interface FilterThumbnailProps {
  label: string
  css: string
  thumbUrl: string | null
  active: boolean
  onClick: () => void
}

export function FilterThumbnail({ label, css, thumbUrl, active, onClick }: FilterThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 flex-col items-center gap-1 rounded-2xl p-1.5 transition ${
        active ? 'bg-white/20 ring-2 ring-[var(--brand-accent)]' : 'bg-white/5 hover:bg-white/10'
      }`}
    >
      <div
        className="video-filterable h-14 w-14 rounded-xl bg-cover bg-center"
        style={{
          backgroundImage: thumbUrl ? `url(${thumbUrl})` : undefined,
          backgroundColor: thumbUrl ? undefined : '#333',
          filter: css === 'none' ? 'none' : css,
        }}
      />
      <span className="text-[10px] font-medium text-white/80">{label}</span>
    </button>
  )
}
