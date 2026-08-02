export interface FilterPreset {
  id: string
  label: string
  css: string
}

export const FILTER_PRESETS: FilterPreset[] = [
  { id: 'none', label: 'No Filter', css: 'none' },
  {
    id: 'vintage',
    label: 'Vintage',
    css: 'sepia(0.35) contrast(0.9) brightness(1.1) saturate(1.2)',
  },
  { id: 'bw', label: 'Black & White', css: 'grayscale(1) contrast(1.05)' },
  {
    id: 'sepia',
    label: 'Sepia',
    css: 'sepia(0.8) contrast(1.1) brightness(1.05)',
  },
  {
    id: 'cool',
    label: 'Cool Tone',
    css: 'saturate(1.1) hue-rotate(-8deg) contrast(1.05) brightness(1.03)',
  },
  {
    id: 'warm',
    label: 'Warm Glow',
    css: 'saturate(1.2) hue-rotate(8deg) brightness(1.08) contrast(1.02)',
  },
]

export function getFilterById(id: string): FilterPreset {
  return FILTER_PRESETS.find((f) => f.id === id) ?? FILTER_PRESETS[0]
}
