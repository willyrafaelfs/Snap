import { createStore, get, set, del, keys } from 'idb-keyval'

export interface PhotoEntry {
  id: string
  blob: Blob
  createdAt: number
  layoutId: string
}

const galleryStore = createStore('snapverse-db', 'gallery')

export async function savePhoto(entry: PhotoEntry): Promise<void> {
  await set(entry.id, entry, galleryStore)
}

export async function getAllPhotos(): Promise<PhotoEntry[]> {
  const allKeys = await keys(galleryStore)
  const entries = await Promise.all(
    allKeys.map((k) => get<PhotoEntry>(k, galleryStore)),
  )
  return entries
    .filter((e): e is PhotoEntry => Boolean(e))
    .sort((a, b) => b.createdAt - a.createdAt)
}

export async function deletePhoto(id: string): Promise<void> {
  await del(id, galleryStore)
}
