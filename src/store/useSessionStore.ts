import { create } from 'zustand'
import type { FrameId } from '../lib/frames'
import type { LayoutId } from '../lib/layouts'

export type CaptureMode = 'single' | 'burst' | 'timer'
export type ToolTab = 'filter' | 'sticker' | 'frame' | null

interface SessionStore {
  filterId: string
  frameId: FrameId
  frameColor: string
  layoutId: LayoutId
  mode: CaptureMode
  burstCount: 3 | 4
  timerSeconds: 3 | 5 | 10
  mirrored: boolean
  isCapturing: boolean
  countdownValue: string | null
  activeTool: ToolTab
  showPoseGuide: boolean

  setFilter: (id: string) => void
  setFrame: (id: FrameId) => void
  setFrameColor: (hex: string) => void
  setLayout: (id: LayoutId) => void
  setMode: (mode: CaptureMode) => void
  setBurstCount: (n: 3 | 4) => void
  setTimerSeconds: (n: 3 | 5 | 10) => void
  setMirrored: (v: boolean) => void
  setIsCapturing: (v: boolean) => void
  setCountdownValue: (v: string | null) => void
  setActiveTool: (tab: ToolTab) => void
  togglePoseGuide: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  filterId: 'none',
  frameId: 'none',
  frameColor: '#ffffff',
  layoutId: 'single',
  mode: 'single',
  burstCount: 4,
  timerSeconds: 3,
  mirrored: true,
  isCapturing: false,
  countdownValue: null,
  activeTool: null,
  showPoseGuide: false,

  setFilter: (filterId) => set({ filterId }),
  setFrame: (frameId) => set({ frameId }),
  setFrameColor: (frameColor) => set({ frameColor }),
  setLayout: (layoutId) => set({ layoutId }),
  setMode: (mode) => set({ mode }),
  setBurstCount: (burstCount) => set({ burstCount }),
  setTimerSeconds: (timerSeconds) => set({ timerSeconds }),
  setMirrored: (mirrored) => set({ mirrored }),
  setIsCapturing: (isCapturing) => set({ isCapturing }),
  setCountdownValue: (countdownValue) => set({ countdownValue }),
  setActiveTool: (activeTool) => set({ activeTool }),
  togglePoseGuide: () => set((state) => ({ showPoseGuide: !state.showPoseGuide })),
}))
