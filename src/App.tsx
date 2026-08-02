import { useEffect } from 'react'
import { useCameraStream } from './hooks/useCameraStream'
import { useCaptureFlow } from './hooks/useCaptureFlow'
import { useSettingsStore } from './store/useSettingsStore'
import { Navbar } from './components/layout/Navbar'
import { ToolbarVertical } from './components/layout/ToolbarVertical'
import { BottomActionBar } from './components/layout/BottomActionBar'
import { CameraViewfinder } from './components/camera/CameraViewfinder'
import { GalleryDrawer } from './components/gallery/GalleryDrawer'
import { Confetti } from './components/feedback/Confetti'

function App() {
  const { videoRef, status, error, retry } = useCameraStream()
  const { capture, flashKey, videoBlitzKey, celebrateKey, isCapturing } = useCaptureFlow(videoRef)
  const initBranding = useSettingsStore((s) => s.initBranding)

  useEffect(() => {
    initBranding()
  }, [initBranding])

  return (
    <div className="relative h-dvh w-dvw overflow-hidden bg-black">
      <CameraViewfinder
        videoRef={videoRef}
        status={status}
        error={error}
        retry={retry}
        flashKey={flashKey}
        videoBlitzKey={videoBlitzKey}
      />

      <Navbar />

      <div className="pointer-events-none absolute z-20 landscape:right-4 landscape:top-1/2 landscape:-translate-y-1/2 portrait:inset-x-0 portrait:bottom-28 portrait:flex portrait:justify-center">
        <ToolbarVertical videoRef={videoRef} cameraReady={status === 'ready'} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
        <BottomActionBar onCapture={capture} capturing={isCapturing || status !== 'ready'} />
      </div>

      <GalleryDrawer />
      <Confetti triggerKey={celebrateKey} />
    </div>
  )
}

export default App
