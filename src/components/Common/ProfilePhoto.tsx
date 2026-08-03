import { useId } from 'react'
import { basics } from '../../data/resume'
import { useProfilePhoto } from '../../hooks/useProfilePhoto'

type ProfilePhotoProps = {
  className?: string
  size?: 'hero' | 'about'
}

function PersonIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 19.5c1.5-3.5 4-5 7-5s5.5 1.5 7 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Clickable profile photo. Upload stores a local preview (localStorage).
 * Falls back to Resume.md `photoPath`, then a person icon + “Add photo”.
 */
export function ProfilePhoto({ className = '', size = 'hero' }: ProfilePhotoProps) {
  const inputId = useId()
  const { src, hasPhoto, isUploaded, upload, clearUpload, markPathBroken } = useProfilePhoto()
  const alt = `${basics?.name?.trim() || 'Profile'} photo`
  const frame =
    size === 'hero'
      ? 'h-44 w-44 sm:h-52 sm:w-52 md:h-60 md:w-60'
      : 'h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48'

  async function onFileChange(fileList: FileList | null) {
    const file = fileList?.[0]
    if (!file) return
    try {
      await upload(file)
    } catch {
      /* keep previous photo */
    }
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <label
        htmlFor={inputId}
        className={`group relative ${frame} cursor-pointer overflow-hidden rounded-full border border-accent bg-accent-soft shadow-soft transition hover:opacity-95 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent`}
      >
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            void onFileChange(event.target.files)
            event.target.value = ''
          }}
        />
        {hasPhoto && src ? (
          <img
            src={src}
            alt={alt}
            width={size === 'hero' ? 240 : 192}
            height={size === 'hero' ? 240 : 192}
            className="h-full w-full origin-center scale-x-[1.16] scale-y-100 object-cover object-[center_6%]"
            onError={markPathBroken}
          />
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
            <PersonIcon className="h-14 w-14 text-accent sm:h-16 sm:w-16" />
            <span className="px-3 text-center text-xs font-medium text-ink sm:text-sm">Add photo</span>
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-ink/70 px-2 py-1.5 text-center text-[11px] font-medium text-canvas opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100 sm:text-xs">
          {hasPhoto ? 'Change photo' : 'Upload photo'}
        </span>
      </label>
      {isUploaded ? (
        <button
          type="button"
          onClick={clearUpload}
          className="text-xs font-medium text-muted underline-offset-2 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Remove uploaded photo
        </button>
      ) : null}
    </div>
  )
}
