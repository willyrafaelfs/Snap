import { create } from 'zustand'
import { parseBranding, applyBrandingCssVars, type BrandingConfig } from '../lib/branding'

interface SettingsStore {
  muted: boolean
  branding: BrandingConfig
  toggleMute: () => void
  initBranding: () => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  muted: false,
  branding: { logo: null, title: 'SnapVerse', primary: null, accent: null },
  toggleMute: () => set((state) => ({ muted: !state.muted })),
  initBranding: () => {
    const branding = parseBranding()
    applyBrandingCssVars(branding)
    set({ branding })
  },
}))
