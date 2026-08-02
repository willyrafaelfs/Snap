import { useEffect, useRef, useState } from 'react'

interface FlashOverlayProps {
  flashKey: number
}

export function FlashOverlay({ flashKey }: FlashOverlayProps) {
  const [visible, setVisible] = useState(false)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 420)
    return () => clearTimeout(t)
  }, [flashKey])

  if (!visible) return null

  return (
    <div
      className="anim-flash pointer-events-none absolute inset-0 z-30 bg-white"
      aria-hidden="true"
    />
  )
}
