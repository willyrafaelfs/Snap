export interface StickerDef {
  id: string
  label: string
  emoji: string
  svg: string
}

/** Aset stiker orisinal berupa SVG inline (bukan file eksternal), transparan. */
export const STICKER_DEFS: StickerDef[] = [
  {
    id: 'glasses',
    label: 'Kacamata',
    emoji: '🕶️',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
      <g fill="none" stroke="#111" stroke-width="8" stroke-linecap="round">
        <circle cx="55" cy="55" r="38" fill="#111" fill-opacity="0.85"/>
        <circle cx="145" cy="55" r="38" fill="#111" fill-opacity="0.85"/>
        <path d="M93 50 h14"/>
        <path d="M17 45 L2 38"/>
        <path d="M183 45 L198 38"/>
      </g>
    </svg>`,
  },
  {
    id: 'hat',
    label: 'Topi Tinggi',
    emoji: '🎩',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140">
      <g fill="#161616">
        <rect x="20" y="100" width="160" height="18" rx="6"/>
        <rect x="55" y="10" width="90" height="95" rx="8"/>
      </g>
      <rect x="55" y="70" width="90" height="16" fill="#ec4899"/>
    </svg>`,
  },
  {
    id: 'mustache',
    label: 'Kumis',
    emoji: '👨',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
      <path d="M20 45 C50 5, 85 5, 100 30 C115 5, 150 5, 180 45 C160 30, 130 30, 100 55 C70 30, 40 30, 20 45 Z" fill="#1a1a1a"/>
    </svg>`,
  },
  {
    id: 'crown',
    label: 'Mahkota',
    emoji: '👑',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120">
      <polygon points="10,110 10,55 55,85 100,20 145,85 190,55 190,110" fill="#f5b942" stroke="#c8871c" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="55" cy="85" r="8" fill="#ec4899"/>
      <circle cx="100" cy="45" r="8" fill="#7c3aed"/>
      <circle cx="145" cy="85" r="8" fill="#ec4899"/>
    </svg>`,
  },
  {
    id: 'party-hat',
    label: 'Topi Pesta',
    emoji: '🎉',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 160">
      <polygon points="70,5 15,150 125,150" fill="#7c3aed"/>
      <circle cx="70" cy="35" r="9" fill="#f5b942"/>
      <circle cx="50" cy="70" r="7" fill="#ec4899"/>
      <circle cx="90" cy="70" r="7" fill="#f5b942"/>
      <circle cx="70" cy="110" r="7" fill="#ec4899"/>
      <circle cx="70" cy="2" r="10" fill="#f5b942"/>
    </svg>`,
  },
]

const imageCache = new Map<string, HTMLImageElement>()

export function getStickerDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export function loadStickerImage(id: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(id)
  if (cached) return Promise.resolve(cached)

  const def = STICKER_DEFS.find((s) => s.id === id)
  if (!def) return Promise.reject(new Error(`Sticker ${id} tidak ditemukan`))

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      imageCache.set(id, img)
      resolve(img)
    }
    img.onerror = reject
    img.src = getStickerDataUri(def.svg)
  })
}
