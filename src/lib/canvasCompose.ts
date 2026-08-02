import type { StickerInstance } from '../store/useStickerStore'
import { loadStickerImage } from '../assets/stickers'

/**
 * Mengambil satu frame dari elemen video, membakar filter CSS + stiker ke canvas
 * baru pada resolusi native video (bukan resolusi elemen preview di layar).
 */
export async function captureFrame(
  video: HTMLVideoElement,
  filterCss: string,
  stickers: StickerInstance[],
  mirrored: boolean,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')!

  ctx.save()
  ctx.filter = filterCss === 'none' ? 'none' : filterCss
  if (mirrored) {
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
  }
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  ctx.restore()

  for (const sticker of stickers) {
    const img = await loadStickerImage(sticker.defId)
    const cx = sticker.x * canvas.width
    const cy = sticker.y * canvas.height
    const w = sticker.width * canvas.width
    const h = sticker.height * canvas.height

    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate((sticker.rotation * Math.PI) / 180)
    ctx.drawImage(img, -w / 2, -h / 2, w, h)
    ctx.restore()
  }

  return canvas
}

export function canvasToBlob(canvas: HTMLCanvasElement, type = 'image/png', quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Gagal membuat blob dari canvas'))),
      type,
      quality,
    )
  })
}
