import { useEffect, useRef, useState } from 'react'
import { startCamera, stopCamera, CameraError } from '../lib/camera'

export type CameraStatus = 'idle' | 'requesting' | 'ready' | 'error'

export function useCameraStream() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<CameraStatus>('idle')
  const [error, setError] = useState<CameraError | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setStatus('requesting')
    setError(null)

    startCamera()
      .then((stream) => {
        if (cancelled) {
          stopCamera(stream)
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setStatus('ready')
      })
      .catch((err: CameraError) => {
        if (cancelled) return
        setError(err)
        setStatus('error')
      })

    return () => {
      cancelled = true
      stopCamera(streamRef.current)
      streamRef.current = null
    }
  }, [attempt])

  // Jaring pengaman: pastikan srcObject terpasang begitu <video> ter-mount,
  // meski urutan mount/attach berubah di masa depan.
  useEffect(() => {
    if (status === 'ready' && videoRef.current && streamRef.current) {
      if (videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current
      }
    }
  }, [status])

  const retry = () => setAttempt((n) => n + 1)

  return { videoRef, status, error, retry }
}
