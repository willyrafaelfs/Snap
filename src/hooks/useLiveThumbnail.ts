import { useEffect, useRef, useState } from 'react'

/** Menghasilkan snapshot kecil dari video secara berkala, dipakai sebagai
 *  preview dasar untuk tiap thumbnail filter (murah: 1 canvas draw dipakai bersama). */
export function useLiveThumbnail(videoRef: React.RefObject<HTMLVideoElement | null>, ready: boolean) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!ready) return
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas')
      canvasRef.current.width = 96
      canvasRef.current.height = 96
    }
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const tick = () => {
      const video = videoRef.current
      if (video && ctx && video.videoWidth > 0) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        setDataUrl(canvas.toDataURL('image/jpeg', 0.6))
      }
    }

    tick()
    const id = setInterval(tick, 800)
    return () => clearInterval(id)
  }, [videoRef, ready])

  return dataUrl
}
