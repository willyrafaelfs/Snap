import { STICKER_DEFS } from '../../assets/stickers'
import { useStickerStore } from '../../store/useStickerStore'

export function StickerPicker() {
  const { addSticker, selectedId, removeSticker } = useStickerStore()

  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-none px-1 py-1">
      {STICKER_DEFS.map((def) => (
        <button
          key={def.id}
          type="button"
          onClick={() => addSticker(def.id)}
          className="flex h-16 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl bg-white/10 text-2xl backdrop-blur transition hover:bg-white/20 active:scale-90"
          title={`Tambah stiker ${def.label}`}
        >
          <span>{def.emoji}</span>
          <span className="text-[9px] font-medium text-white/70">{def.label}</span>
        </button>
      ))}

      {selectedId && (
        <button
          type="button"
          onClick={() => removeSticker(selectedId)}
          className="ml-2 flex h-16 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl bg-red-500/20 text-2xl text-red-200 backdrop-blur transition hover:bg-red-500/30 active:scale-90"
          title="Hapus stiker terpilih"
        >
          <span>🗑️</span>
          <span className="text-[9px] font-medium">Hapus</span>
        </button>
      )}
    </div>
  )
}
