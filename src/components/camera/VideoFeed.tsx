import { useEffect, useRef, useState, type Ref } from 'react'

interface VideoFeedProps {
  ref?: Ref<HTMLVideoElement>
  mirrored: boolean
  filterCss: string
  blitzKey: number
}

export function VideoFeed({ ref, mirrored, filterCss, blitzKey }: VideoFeedProps) {
  const [blitzing, setBlitzing] = useState(false)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    setBlitzing(true)
    const t = setTimeout(() => setBlitzing(false), 220)
    return () => clearTimeout(t)
  }, [blitzKey])

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted
      className={`video-filterable h-full w-full object-cover ${blitzing ? 'anim-video-blitz' : ''}`}
      style={{
        transform: mirrored ? 'scaleX(-1)' : 'none',
        filter: filterCss === 'none' ? 'none' : filterCss,
      }}
    />
  )
}
