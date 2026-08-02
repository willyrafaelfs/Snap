import { create } from 'zustand'

/** Semua posisi/ukuran disimpan sebagai fraksi (0..1) relatif terhadap area viewfinder,
 *  supaya konsisten antara live preview dan canvas hasil capture yang resolusinya berbeda. */
export interface StickerInstance {
  id: string
  defId: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
}

interface StickerStore {
  stickers: StickerInstance[]
  selectedId: string | null
  addSticker: (defId: string) => void
  updateSticker: (id: string, patch: Partial<StickerInstance>) => void
  removeSticker: (id: string) => void
  selectSticker: (id: string | null) => void
  clearStickers: () => void
}

export const useStickerStore = create<StickerStore>((set) => ({
  stickers: [],
  selectedId: null,
  addSticker: (defId) =>
    set((state) => {
      const id = `${defId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      return {
        stickers: [
          ...state.stickers,
          { id, defId, x: 0.5, y: 0.5, width: 0.22, height: 0.22, rotation: 0 },
        ],
        selectedId: id,
      }
    }),
  updateSticker: (id, patch) =>
    set((state) => ({
      stickers: state.stickers.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    })),
  removeSticker: (id) =>
    set((state) => ({
      stickers: state.stickers.filter((s) => s.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),
  selectSticker: (id) => set({ selectedId: id }),
  clearStickers: () => set({ stickers: [], selectedId: null }),
}))
