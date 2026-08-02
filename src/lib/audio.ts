let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Beep pendek untuk countdown; `urgent` = nada lebih tinggi & singkat di detik terakhir. */
export function playCountdownBeep(urgent = false) {
  const audioCtx = getCtx()
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = 'square'
  osc.frequency.value = urgent ? 1046.5 : 783.99
  const now = audioCtx.currentTime
  const dur = urgent ? 0.18 : 0.12

  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur)

  osc.connect(gain).connect(audioCtx.destination)
  osc.start(now)
  osc.stop(now + dur + 0.02)
}

/** Simulasi suara rana kamera mekanik: noise burst singkat dengan envelope cepat. */
export function playShutterClick() {
  const audioCtx = getCtx()
  const now = audioCtx.currentTime
  const bufferSize = Math.floor(audioCtx.sampleRate * 0.08)
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.12))
  }

  const noise = audioCtx.createBufferSource()
  noise.buffer = buffer

  const filter = audioCtx.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.value = 1200

  const gain = audioCtx.createGain()
  gain.gain.setValueAtTime(0.5, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

  noise.connect(filter).connect(gain).connect(audioCtx.destination)
  noise.start(now)
  noise.stop(now + 0.09)
}

/** Melodi kecil saat foto masuk galeri. */
export function playSuccessChime() {
  const audioCtx = getCtx()
  const now = audioCtx.currentTime
  const notes = [523.25, 659.25, 783.99]

  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    const start = now + i * 0.09
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.15, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35)
    osc.connect(gain).connect(audioCtx.destination)
    osc.start(start)
    osc.stop(start + 0.4)
  })
}
