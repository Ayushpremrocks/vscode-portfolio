import React, { useState } from 'react'
import type { HobbyMedia } from '../../data/hobbies'

export interface HobbyMediaDisplayProps {
  media?: HobbyMedia
  fallbackImageUrl?: string
  fallbackEmoji?: React.ReactNode
  alt: string
  objectFit?: 'contain' | 'cover'
  padding?: string
  borderRadius?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Reusable media display component for all hobby cards.
 * Supports animated GIFs, WebM/MP4 videos, and static images with graceful fallback.
 */
export const HobbyMediaDisplay: React.FC<HobbyMediaDisplayProps> = ({
  media,
  fallbackImageUrl,
  fallbackEmoji,
  alt,
  objectFit = 'contain',
  padding,
  borderRadius = '6px',
  className,
  style,
}) => {
  const [mediaError, setMediaError] = useState(false)
  const [imgError, setImgError] = useState(false)

  const showMedia = Boolean(media && !mediaError)

  if (showMedia && media) {
    if (media.type === 'video') {
      return (
        <video
          src={media.src}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setMediaError(true)}
          className={className}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            borderRadius,
            ...style,
          }}
        />
      )
    }

    return (
      <img
        src={media.src}
        alt={media.alt || alt}
        loading="lazy"
        onError={() => setMediaError(true)}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          padding,
          borderRadius,
          ...style,
        }}
      />
    )
  }

  if (!imgError && fallbackImageUrl) {
    return (
      <img
        src={fallbackImageUrl}
        alt={alt}
        loading="lazy"
        onError={() => setImgError(true)}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          padding,
          ...style,
        }}
      />
    )
  }

  return <>{fallbackEmoji}</>
}
