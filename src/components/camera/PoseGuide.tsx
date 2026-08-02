export function PoseGuide() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center opacity-25">
      <svg viewBox="0 0 200 320" className="h-[85%] w-auto" fill="none" stroke="white" strokeWidth="4">
        <circle cx="100" cy="55" r="42" />
        <path d="M100 97 L100 220" />
        <path d="M100 130 L40 190" />
        <path d="M100 130 L160 190" />
        <path d="M100 220 L55 310" />
        <path d="M100 220 L145 310" />
      </svg>
    </div>
  )
}
