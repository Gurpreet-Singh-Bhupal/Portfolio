const PHOTO_KEY = 'portfolio.profilePhoto'
const PHOTO_EVENT = 'portfolio-photo-change'

function canUseDom(): boolean {
  return typeof window !== 'undefined'
}

export function getUploadedPhoto(): string | null {
  if (!canUseDom()) return null
  try {
    return window.localStorage?.getItem?.(PHOTO_KEY) ?? null
  } catch {
    return null
  }
}

export function saveUploadedPhoto(dataUrl: string): void {
  if (!canUseDom()) return
  try {
    window.localStorage?.setItem?.(PHOTO_KEY, dataUrl)
  } catch {
    /* ignore */
  }
  window.dispatchEvent?.(new Event(PHOTO_EVENT))
}

export function clearUploadedPhoto(): void {
  if (!canUseDom()) return
  try {
    window.localStorage?.removeItem?.(PHOTO_KEY)
  } catch {
    /* ignore */
  }
  window.dispatchEvent?.(new Event(PHOTO_EVENT))
}

export function onPhotoChange(listener: () => void): () => void {
  if (!canUseDom()) return () => undefined
  window.addEventListener?.(PHOTO_EVENT, listener)
  window.addEventListener?.('storage', listener)
  return () => {
    window.removeEventListener?.(PHOTO_EVENT, listener)
    window.removeEventListener?.('storage', listener)
  }
}

export { PHOTO_EVENT }
