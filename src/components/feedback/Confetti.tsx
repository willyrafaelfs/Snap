import { useEffect, useRef } from 'react'

interface ConfettiProps {
  triggerKey: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  vr: number
  color: string
}

const COLORS = ['#7c3aed', '#ec4899', '#f5b942', '#22d3ee', '#ffffff']

export function Confetti({ triggerKey }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (triggerKey === 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)

    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight * 0.4,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3,
      size: 5 + Math.random() * 7,
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    let raf = 0
    const start = performance.now()
    const duration = 2000

    const tick = (now: number) => {
      const elapsed = now - start
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.vr

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      }

      if (elapsed < duration) {
        raf = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [triggerKey])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  )
}
