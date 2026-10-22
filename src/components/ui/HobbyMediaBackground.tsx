import React from 'react'
import type { HobbyMedia } from '../../data/hobbies'

export interface HobbyMediaBackgroundProps {
  media?: HobbyMedia
  alt: string
  hovered: boolean
}

/**
 * Renders full-tile cover media (image/GIF or video) with a dark gradient overlay.
 * - Video uses autoPlay, loop, muted, playsInline
 * - Image uses loading="lazy" and object-fit: cover
 * - Smooth hover zoom on media layer
 * - Dark gradient overlay ensures high legibility for text overlays
 */
export const HobbyMediaBackground: React.FC<HobbyMediaBackgroundProps> = ({
  media,
  alt,
  hovered,
}) => {
  if (!media) return null

  return (
    <>
      {media.type === 'video' ? (
        <video
          src={media.src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.35s ease',
            zIndex: 0,
          }}
        />
      ) : (
        <img
          src={media.src}
          alt={media.alt || alt}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.35s ease',
            zIndex: 0,
          }}
        />
      )}

      {/* Dark gradient overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: hovered
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.82) 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.72) 100%)',
          transition: 'background 0.18s ease',
        }}
      />
    </>
  )
}
