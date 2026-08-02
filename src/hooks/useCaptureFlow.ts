import { useRef, useState, type RefObject } from 'react'
import { useSessionStore } from '../store/useSessionStore'
import { useStickerStore } from '../store/useStickerStore'
import { useGalleryStore } from '../store/useGalleryStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { captureFrame, canvasToBlob } from '../lib/canvasCompose'
import { getFilterById } from '../lib/filters'
import { applyFrame } from '../lib/frames'
import { composeLayout } from '../lib/layouts'
import { playCountdownBeep, playShutterClick, playSuccessChime } from '../lib/audio'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useCaptureFlow(videoRef: RefObject<HTMLVideoElement | null>) {
  const session = useSessionStore()
  const stickers = useStickerStore((s) => s.stickers)
  const addPhoto = useGalleryStore((s) => s.addPhoto)
  const setGalleryOpen = useGalleryStore((s) => s.setOpen)
  const muted = useSettingsStore((s) => s.muted)

  const [flashKey, setFlashKey] = useState(0)
  const [videoBlitzKey, setVideoBlitzKey] = useState(0)
  const [celebrateKey, setCelebrateKey] = useState(0)
  const busyRef = useRef(false)

  const runCountdown = async (seconds: number) => {
    for (let i = seconds; i >= 1; i--) {
      session.setCountdownValue(String(i))
      if (!muted) playCountdownBeep(i === 1)
      await delay(1000)
    }
    session.setCountdownValue('POSE!')
    await delay(350)
    session.setCountdownValue(null)
  }

  const captureOne = async (): Promise<HTMLCanvasElement> => {
    const video = videoRef.current
    if (!video) throw new Error('Video belum siap')

    setFlashKey((k) => k + 1)
    setVideoBlitzKey((k) => k + 1)
    if (!muted) playShutterClick()

    const filterCss = getFilterById(session.filterId).css
    return captureFrame(video, filterCss, stickers, session.mirrored)
  }

  const capture = async () => {
    if (busyRef.current || !videoRef.current) return
    busyRef.current = true
    session.setIsCapturing(true)

    try {
      const shots: HTMLCanvasElement[] = []

      if (session.mode === 'single') {
        shots.push(await captureOne())
      } else if (session.mode === 'timer') {
        await runCountdown(session.timerSeconds)
        shots.push(await captureOne())
      } else {
        for (let i = 0; i < session.burstCount; i++) {
          await runCountdown(i === 0 ? 3 : 2)
          shots.push(await captureOne())
        }
      }

      const composed = composeLayout(shots, session.layoutId)
      const framed = applyFrame(composed, session.frameId, session.frameColor)
      const blob = await canvasToBlob(framed)

      await addPhoto({
        id: crypto.randomUUID(),
        blob,
        createdAt: Date.now(),
        layoutId: session.layoutId,
      })

      if (!muted) playSuccessChime()
      setCelebrateKey((k) => k + 1)
      setGalleryOpen(true)
    } finally {
      session.setIsCapturing(false)
      busyRef.current = false
    }
  }

  return { capture, flashKey, videoBlitzKey, celebrateKey, isCapturing: session.isCapturing }
}
