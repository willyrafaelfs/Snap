interface ActionButtonProps {
  onPress: () => void
  disabled: boolean
  mode: 'single' | 'burst' | 'timer'
}

export function ActionButton({ onPress, disabled, mode }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      aria-label="Ambil foto"
      className={`relative flex h-18 w-18 items-center justify-center rounded-full border-2 border-white bg-white/10 transition disabled:opacity-40 ${
        disabled ? '' : 'anim-ripple active:scale-95'
      }`}
      style={{ height: 72, width: 72 }}
    >
      <span
        className="rounded-full bg-white transition-all"
        style={{ height: disabled ? 28 : 56, width: disabled ? 28 : 56 }}
      />
      {mode !== 'single' && !disabled && (
        <span className="absolute -bottom-6 text-[10px] font-medium text-white/70">
          {mode === 'burst' ? 'BURST' : 'TIMER'}
        </span>
      )}
    </button>
  )
}
