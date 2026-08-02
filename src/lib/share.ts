export type SharePlatform = 'whatsapp' | 'instagram' | 'twitter' | 'generic'

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/**
 * Coba native share sheet (mencakup WhatsApp/Instagram/Twitter di mobile bila
 * app tersebut terpasang). Jika tidak didukung, jatuh ke download langsung.
 */
export async function sharePhoto(
  blob: Blob,
  filename: string,
  platform: SharePlatform = 'generic',
): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const file = new File([blob], filename, { type: blob.type })
  const titles: Record<SharePlatform, string> = {
    whatsapp: 'Bagikan ke WhatsApp',
    instagram: 'Bagikan ke Instagram',
    twitter: 'Bagikan ke Twitter/X',
    generic: 'Bagikan Foto SnapVerse',
  }

  if (navigator.canShare?.({ files: [file] }) && navigator.share) {
    try {
      await navigator.share({ files: [file], title: titles[platform], text: 'Foto dari SnapVerse 📸' })
      return 'shared'
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return 'cancelled'
      // jatuh ke download sebagai fallback bila share gagal karena alasan lain
    }
  }

  downloadBlob(blob, filename)
  return 'downloaded'
}
