import type { PhotoEntry } from '../../lib/db'
import { useObjectUrl } from '../../hooks/useObjectUrl'
import { sharePhoto, downloadBlob } from '../../lib/share'
import { useGalleryStore } from '../../store/useGalleryStore'

interface PhotoPreviewModalProps {
  photo: PhotoEntry
}

export function PhotoPreviewModal({ photo }: PhotoPreviewModalProps) {
  const url = useObjectUrl(photo.blob)
  const { setPreview, removePhoto } = useGalleryStore()
  const filename = `snapverse-${photo.id}.png`

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-black/85 p-4 backdrop-blur-sm"
      onClick={() => setPreview(null)}
    >
      {url && (
        <img
          src={url}
          alt="Pratinjau foto"
          className="max-h-[70vh] max-w-full rounded-xl object-contain shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      <div className="flex flex-wrap items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => sharePhoto(photo.blob, filename, 'whatsapp')}
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white active:scale-95"
        >
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() => sharePhoto(photo.blob, filename, 'instagram')}
          className="rounded-full bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white active:scale-95"
        >
          Instagram
        </button>
        <button
          type="button"
          onClick={() => sharePhoto(photo.blob, filename, 'twitter')}
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white active:scale-95"
        >
          Twitter/X
        </button>
        <button
          type="button"
          onClick={() => downloadBlob(photo.blob, filename)}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black active:scale-95"
        >
          ⬇ Download
        </button>
        <button
          type="button"
          onClick={async () => {
            await removePhoto(photo.id)
            setPreview(null)
          }}
          className="rounded-full bg-red-600/80 px-4 py-2 text-sm font-semibold text-white active:scale-95"
        >
          Hapus
        </button>
      </div>

      <button
        type="button"
        onClick={() => setPreview(null)}
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
      >
        ✕
      </button>
    </div>
  )
}
