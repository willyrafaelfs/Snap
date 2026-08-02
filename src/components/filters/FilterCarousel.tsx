import type { RefObject } from 'react'
import { FILTER_PRESETS } from '../../lib/filters'
import { useSessionStore } from '../../store/useSessionStore'
import { useLiveThumbnail } from '../../hooks/useLiveThumbnail'
import { FilterThumbnail } from './FilterThumbnail'

interface FilterCarouselProps {
  videoRef: RefObject<HTMLVideoElement | null>
  ready: boolean
}

export function FilterCarousel({ videoRef, ready }: FilterCarouselProps) {
  const { filterId, setFilter } = useSessionStore()
  const thumbUrl = useLiveThumbnail(videoRef, ready)

  return (
    <div
      className="flex gap-2 overflow-x-auto scrollbar-none px-1 py-1"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {FILTER_PRESETS.map((preset) => (
        <div key={preset.id} style={{ scrollSnapAlign: 'center' }}>
          <FilterThumbnail
            label={preset.label}
            css={preset.css}
            thumbUrl={thumbUrl}
            active={filterId === preset.id}
            onClick={() => setFilter(preset.id)}
          />
        </div>
      ))}
    </div>
  )
}
