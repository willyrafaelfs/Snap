export type LayoutId = 'single' | 'grid2' | 'grid4'

export interface LayoutOption {
  id: LayoutId
  label: string
  shots: number
}

export const LAYOUT_OPTIONS: LayoutOption[] = [
  { id: 'single', label: 'Single', shots: 1 },
  { id: 'grid2', label: '2-Grid', shots: 2 },
  { id: 'grid4', label: '4-Grid', shots: 4 },
]

/** Menyusun beberapa foto (raw canvas, sudah difilter+stiker) menjadi satu canvas kolase. */
export function composeLayout(
  shots: HTMLCanvasElement[],
  layoutId: LayoutId,
  bgHex = '#ffffff',
): HTMLCanvasElement {
  if (layoutId === 'single' || shots.length <= 1) return shots[0]

  const cellW = shots[0].width
  const cellH = shots[0].height
  const gap = Math.round(cellW * 0.04)

  const cols = layoutId === 'grid2' ? 1 : 2
  const rows = layoutId === 'grid2' ? shots.length : Math.ceil(shots.length / 2)

  const out = document.createElement('canvas')
  out.width = cols * cellW + gap * (cols + 1)
  out.height = rows * cellH + gap * (rows + 1)
  const ctx = out.getContext('2d')!
  ctx.fillStyle = bgHex
  ctx.fillRect(0, 0, out.width, out.height)

  shots.forEach((shot, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = gap + col * (cellW + gap)
    const y = gap + row * (cellH + gap)
    ctx.drawImage(shot, x, y, cellW, cellH)
  })

  return out
}
