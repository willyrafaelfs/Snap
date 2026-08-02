import { useSettingsStore } from '../../store/useSettingsStore'

export function MuteToggle() {
  const { muted, toggleMute } = useSettingsStore()

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={muted ? 'Aktifkan suara' : 'Matikan suara'}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg text-white/80 backdrop-blur transition hover:bg-white/20"
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )
}
