import { useEffect, useState } from 'react'
import JSZip from 'jszip'
import { useGalleryStore } from '../../store/useGalleryStore'
import { PhotoThumb } from './PhotoThumb'
import { PhotoPreviewModal } from './PhotoPreviewModal'
import { downloadBlob } from '../../lib/share'

export function GalleryDrawer() {
  const { photos, isOpen, setOpen, load, loaded, selectedIds, toggleSelect, clearSelection, previewId, setPreview } =
    useGalleryStore()
  const [selectMode, setSelectMode] = useState(false)
  const [zipping, setZipping] = useState(false)

  useEffect(() => {
    if (!loaded) void load()
  }, [loaded, load])

  const previewPhoto = photos.find((p) => p.id === previewId) ?? null

  const handleLongPress = (id: string) => {
    setSelectMode(true)
    toggleSelect(id)
  }

  const handleTap = (id: string) => {
    if (selectMode) {
      toggleSelect(id)
    } else {
      setPreview(id)
    }
  }

  const downloadSelectedAsZip = async () => {
    setZipping(true)
    try {
      const zip = new JSZip()
      const selected = photos.filter((p) => selectedIds.has(p.id))
      selected.forEach((p, i) => zip.file(`snapverse-${i + 1}-${p.id}.png`, p.blob))
      const blob = await zip.generateAsync({ type: 'blob' })
      downloadBlob(blob, `snapverse-session-${Date.now()}.zip`)
      clearSelection()
      setSelectMode(false)
    } finally {
      setZipping(false)
    }
  }

  return (
    <>
      <div
        className={`gallery-backdrop fixed inset-0 z-40 bg-black/60 ${isOpen ? 'open opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpen(false)}
      />

      <div
        className="gallery-sheet fixed inset-x-0 bottom-0 z-50 max-h-[75vh] rounded-t-3xl border-t border-white/10 bg-[#150f22] px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 shadow-2xl"
        style={{ transform: isOpen ? 'translateY(0%)' : 'translateY(100%)' }}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/20" />

        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/90">🎞️ Galeri Sesi ({photos.length})</h2>
          <div className="flex items-center gap-2">
            {selectMode && selectedIds.size > 0 && (
              <button
                type="button"
                disabled={zipping}
                onClick={downloadSelectedAsZip}
                className="rounded-full bg-[var(--brand-accent)] px-3 py-1 text-xs font-semibold text-white disabled:opacity-50"
              >
                {zipping ? 'Menyiapkan…' : `Download ${selectedIds.size} (.zip)`}
              </button>
            )}
            {selectMode && (
              <button
                type="button"
                onClick={() => {
                  setSelectMode(false)
                  clearSelection()
                }}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
              >
                Batal
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70"
            >
              ✕
            </button>
          </div>
        </div>

        {photos.length === 0 ? (
          <p className="py-10 text-center text-sm text-white/40">Belum ada foto di sesi ini.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 overflow-y-auto pb-4 sm:grid-cols-4 md:grid-cols-6">
            {photos.map((photo) => (
              <PhotoThumb
                key={photo.id}
                photo={photo}
                selected={selectedIds.has(photo.id)}
                selectMode={selectMode}
                onTap={() => handleTap(photo.id)}
                onLongPress={() => handleLongPress(photo.id)}
              />
            ))}
          </div>
        )}
      </div>

      {previewPhoto && <PhotoPreviewModal photo={previewPhoto} />}
    </>
  )
}
