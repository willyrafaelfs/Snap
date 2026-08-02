interface CountdownOverlayProps {
  value: string | null
}

export function CountdownOverlay({ value }: CountdownOverlayProps) {
  if (!value) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <span
        key={value}
        className="anim-countdown-pop select-none text-[7rem] font-black text-white drop-shadow-[0_4px_24px_rgba(124,58,237,0.8)] sm:text-[10rem]"
      >
        {value}
      </span>
    </div>
  )
}
