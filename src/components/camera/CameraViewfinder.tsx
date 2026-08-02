import { useRef, type RefObject } from 'react'
import type { CameraStatus } from '../../hooks/useCameraStream'
import type { CameraError } from '../../lib/camera'
import { VideoFeed } from './VideoFeed'
import { PoseGuide } from './PoseGuide'
import { FlashOverlay } from './FlashOverlay'
import { CountdownOverlay } from './CountdownOverlay'
import { StickerCanvas } from '../stickers/StickerCanvas'
import { useSessionStore } from '../../store/useSessionStore'
import { getFilterById } from '../../lib/filters'

interface CameraViewfinderProps {
  videoRef: RefObject<HTMLVideoElement | null>
  status: CameraStatus
  error: CameraError | null
  retry: () => void
  flashKey: number
  videoBlitzKey: number
}

export function CameraViewfinder({ videoRef, status, error, retry, flashKey, videoBlitzKey }: CameraViewfinderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { mirrored, filterId, countdownValue, showPoseGuide } = useSessionStore()
  const filterCss = getFilterById(filterId).css

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-black">
      {/* Video selalu di-mount (bahkan sebelum status 'ready') supaya videoRef sudah
          terpasang ke DOM saat getUserMedia resolve dan mencoba set srcObject. */}
      <VideoFeed ref={videoRef} mirrored={mirrored} filterCss={filterCss} blitzKey={videoBlitzKey} />

      {status === 'ready' && (
        <>
          {showPoseGuide && <PoseGuide />}
          <StickerCanvas containerRef={containerRef} />
          <CountdownOverlay value={countdownValue} />
          <FlashOverlay flashKey={flashKey} />
        </>
      )}

      {status === 'requesting' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black text-white/70">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-sm">Meminta izin kamera…</p>
        </div>
      )}

      {status === 'error' && error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black px-8 text-center text-white/80">
          <span className="text-4xl">📷🚫</span>
          <p className="text-sm">{error.message}</p>
          <button
            type="button"
            onClick={retry}
            className="mt-2 rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white"
          >
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  )
}
