export interface BrandingConfig {
  logo: string | null
  title: string
  primary: string | null
  accent: string | null
}

const DEFAULT_TITLE = 'SnapVerse'

export function parseBranding(): BrandingConfig {
  const params = new URLSearchParams(window.location.search)
  return {
    logo: params.get('logo'),
    title: params.get('title') || DEFAULT_TITLE,
    primary: normalizeHex(params.get('primary')),
    accent: normalizeHex(params.get('accent')),
  }
}

function normalizeHex(value: string | null): string | null {
  if (!value) return null
  const hex = value.startsWith('#') ? value : `#${value}`
  return /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : null
}

export function applyBrandingCssVars(branding: BrandingConfig) {
  const root = document.documentElement
  if (branding.primary) root.style.setProperty('--brand-primary', branding.primary)
  if (branding.accent) root.style.setProperty('--brand-accent', branding.accent)
  document.title = `${branding.title} — Photobooth Digital`
}
