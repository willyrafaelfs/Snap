export type CameraErrorReason =
  | 'not-found'
  | 'permission-denied'
  | 'in-use'
  | 'unsupported'
  | 'unknown'

export class CameraError extends Error {
  reason: CameraErrorReason
  constructor(reason: CameraErrorReason, message: string) {
    super(message)
    this.reason = reason
  }
}

export async function startCamera(facingMode: 'user' | 'environment' = 'user'): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new CameraError('unsupported', 'Browser ini tidak mendukung akses kamera.')
  }

  try {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
        width: { ideal: 1280 },
        height: { ideal: 960 },
      },
      audio: false,
    })
  } catch (err) {
    const name = (err as DOMException)?.name
    if (name === 'NotFoundError' || name === 'OverconstrainedError') {
      throw new CameraError('not-found', 'Kamera tidak ditemukan di perangkat ini.')
    }
    if (name === 'NotAllowedError' || name === 'SecurityError') {
      throw new CameraError('permission-denied', 'Izin kamera ditolak. Aktifkan izin kamera di pengaturan browser.')
    }
    if (name === 'NotReadableError') {
      throw new CameraError('in-use', 'Kamera sedang digunakan aplikasi lain.')
    }
    throw new CameraError('unknown', 'Terjadi kesalahan saat mengakses kamera.')
  }
}

export function stopCamera(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop())
}
