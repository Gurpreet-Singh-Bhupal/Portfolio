import { useCallback, useEffect, useState } from 'react'
import { basics } from '../data/resume'
import {
  clearUploadedPhoto,
  getUploadedPhoto,
  onPhotoChange,
  saveUploadedPhoto,
} from '../utils/profilePhotoStorage'

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      if (result) resolve(result)
      else reject(new Error('Could not read image'))
    }
    reader.onerror = () => reject(reader.error ?? new Error('File read failed'))
    reader.readAsDataURL(file)
  })
}

/**
 * Shared profile photo: uploaded (localStorage) → Resume.md photoPath → empty.
 * Upload is client-side only (no server); Hero uses the shared photo state.
 */
export function useProfilePhoto() {
  const resumePath = basics.photoPath?.trim() || ''
  const [uploaded, setUploaded] = useState<string | null>(() => getUploadedPhoto())
  const [brokenPath, setBrokenPath] = useState(false)

  useEffect(() => {
    return onPhotoChange(() => {
      setUploaded(getUploadedPhoto())
      setBrokenPath(false)
    })
  }, [])

  const src = uploaded || (!brokenPath && resumePath ? resumePath : '') || null

  const upload = useCallback(async (file: File | null | undefined) => {
    if (!file?.type?.startsWith?.('image/')) return
    const dataUrl = await readFileAsDataUrl(file)
    saveUploadedPhoto(dataUrl)
    setUploaded(dataUrl)
    setBrokenPath(false)
  }, [])

  const clearUpload = useCallback(() => {
    clearUploadedPhoto()
    setUploaded(null)
  }, [])

  const markPathBroken = useCallback(() => {
    if (!uploaded) setBrokenPath(true)
  }, [uploaded])

  return {
    src,
    hasPhoto: Boolean(src),
    isUploaded: Boolean(uploaded),
    upload,
    clearUpload,
    markPathBroken,
  }
}
