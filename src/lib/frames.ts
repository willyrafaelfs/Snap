export type FrameId = 'none' | 'polaroid' | 'film' | 'digital'

export interface FrameOption {
  id: FrameId
  label: string
}

export const FRAME_OPTIONS: FrameOption[] = [
  { id: 'none', label: 'Tanpa Bingkai' },
  { id: 'polaroid', label: 'Polaroid' },
  { id: 'film', label: 'Film Strip' },
  { id: 'digital', label: 'Digital Rounded' },
]

export const FRAME_COLORS: { id: string; label: string; hex: string }[] = [
  { id: 'white', label: 'Putih', hex: '#ffffff' },
  { id: 'black', label: 'Hitam', hex: '#111111' },
  { id: 'pink', label: 'Pink', hex: '#ec4899' },
  { id: 'gold', label: 'Emas', hex: '#f5b942' },
]

/** Menggambar frame di sekeliling foto sumber, mengembalikan canvas baru (lebih besar). */
export function applyFrame(
  source: HTMLCanvasElement,
  frameId: FrameId,
  colorHex: string,
): HTMLCanvasElement {
  if (frameId === 'none') return source

  if (frameId === 'polaroid') return drawPolaroid(source, colorHex)
  if (frameId === 'film') return drawFilmStrip(source, colorHex)
  return drawDigitalRounded(source, colorHex)
}

function drawPolaroid(source: HTMLCanvasElement, colorHex: string) {
  const border = Math.round(source.width * 0.05)
  const bottomExtra = Math.round(source.width * 0.16)
  const out = document.createElement('canvas')
  out.width = source.width + border * 2
  out.height = source.height + border * 2 + bottomExtra
  const ctx = out.getContext('2d')!

  ctx.fillStyle = colorHex
  ctx.fillRect(0, 0, out.width, out.height)

  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.35)'
  ctx.shadowBlur = border * 0.6
  ctx.drawImage(source, border, border)
  ctx.restore()

  return out
}

function drawFilmStrip(source: HTMLCanvasElement, colorHex: string) {
  const barHeight = Math.round(source.height * 0.09)
  const sideMargin = Math.round(source.width * 0.03)
  const out = document.createElement('canvas')
  out.width = source.width + sideMargin * 2
  out.height = source.height + barHeight * 2
  const ctx = out.getContext('2d')!

  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, out.width, out.height)
  ctx.drawImage(source, sideMargin, barHeight)

  const holeR = barHeight * 0.22
  const gap = holeR * 2.6
  ctx.fillStyle = colorHex
  for (let y of [barHeight * 0.5, out.height - barHeight * 0.5]) {
    for (let x = gap; x < out.width - gap / 2; x += gap) {
      ctx.beginPath()
      ctx.roundRect(x - holeR, y - holeR, holeR * 2, holeR * 2, holeR * 0.4)
      ctx.fill()
    }
  }

  return out
}

function drawDigitalRounded(source: HTMLCanvasElement, colorHex: string) {
  const border = Math.round(source.width * 0.025)
  const radius = Math.round(source.width * 0.06)
  const out = document.createElement('canvas')
  out.width = source.width + border * 2
  out.height = source.height + border * 2
  const ctx = out.getContext('2d')!

  ctx.save()
  ctx.shadowColor = colorHex
  ctx.shadowBlur = border * 1.5
  roundedRectPath(ctx, border / 2, border / 2, out.width - border, out.height - border, radius)
  ctx.lineWidth = border
  ctx.strokeStyle = colorHex
  ctx.stroke()
  ctx.restore()

  ctx.save()
  roundedRectPath(ctx, border, border, source.width, source.height, radius * 0.7)
  ctx.clip()
  ctx.drawImage(source, border, border)
  ctx.restore()

  return out
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}
