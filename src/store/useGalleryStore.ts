import { create } from 'zustand'
import { getAllPhotos, savePhoto, deletePhoto, type PhotoEntry } from '../lib/db'

interface GalleryStore {
  photos: PhotoEntry[]
  loaded: boolean
  isOpen: boolean
  selectedIds: Set<string>
  previewId: string | null

  load: () => Promise<void>
  addPhoto: (entry: PhotoEntry) => Promise<void>
  removePhoto: (id: string) => Promise<void>
  setOpen: (open: boolean) => void
  toggleSelect: (id: string) => void
  clearSelection: () => void
  setPreview: (id: string | null) => void
}

export const useGalleryStore = create<GalleryStore>((set, get) => ({
  photos: [],
  loaded: false,
  isOpen: false,
  selectedIds: new Set(),
  previewId: null,

  load: async () => {
    const photos = await getAllPhotos()
    set({ photos, loaded: true })
  },
  addPhoto: async (entry) => {
    await savePhoto(entry)
    set({ photos: [entry, ...get().photos] })
  },
  removePhoto: async (id) => {
    await deletePhoto(id)
    set((state) => {
      const nextSelected = new Set(state.selectedIds)
      nextSelected.delete(id)
      return {
        photos: state.photos.filter((p) => p.id !== id),
        selectedIds: nextSelected,
      }
    })
  },
  setOpen: (isOpen) => set({ isOpen }),
  toggleSelect: (id) =>
    set((state) => {
      const next = new Set(state.selectedIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { selectedIds: next }
    }),
  clearSelection: () => set({ selectedIds: new Set() }),
  setPreview: (previewId) => set({ previewId }),
}))
