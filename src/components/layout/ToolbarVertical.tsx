import type { RefObject } from 'react'
import { useSessionStore, type ToolTab } from '../../store/useSessionStore'
import { FilterCarousel } from '../filters/FilterCarousel'
import { StickerPicker } from '../stickers/StickerPicker'
import { FrameSelector } from '../frames/FrameSelector'

const TABS: { id: Exclude<ToolTab, null>; label: string; icon: string }[] = [
  { id: 'filter', label: 'Filter', icon: '🎨' },
  { id: 'sticker', label: 'Stiker', icon: '😎' },
  { id: 'frame', label: 'Bingkai', icon: '🖼️' },
]

interface ToolbarVerticalProps {
  videoRef: RefObject<HTMLVideoElement | null>
  cameraReady: boolean
}

export function ToolbarVertical({ videoRef, cameraReady }: ToolbarVerticalProps) {
  const { activeTool, setActiveTool } = useSessionStore()

  return (
    <div className="pointer-events-auto flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/30 p-2 backdrop-blur-md">
      <div className="flex justify-center gap-1.5 landscape:flex-col">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTool(activeTool === tab.id ? null : tab.id)}
            className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-xs transition ${
              activeTool === tab.id ? 'bg-[var(--brand-primary)] text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTool && (
        <div className="w-[min(88vw,22rem)] border-t border-white/10 pt-2">
          {activeTool === 'filter' && <FilterCarousel videoRef={videoRef} ready={cameraReady} />}
          {activeTool === 'sticker' && <StickerPicker />}
          {activeTool === 'frame' && <FrameSelector />}
        </div>
      )}
    </div>
  )
}
