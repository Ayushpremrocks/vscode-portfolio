import { useState, useRef, useEffect } from 'react'
import type { PointerEvent, MouseEvent } from 'react'

interface Options {
  /** 'x' grows to the right (sidebar), 'y' grows upward (bottom panel). */
  axis: 'x' | 'y'
  value: number
  min: number
  max: () => number
  onChange: (value: number) => void
  cursor: 'col-resize' | 'row-resize'
}

/** Pointer-driven resize handle shared by the sidebar and the terminal. */
export function useDragResize({ axis, value, min, max, onChange, cursor }: Options) {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const start = useRef({ pos: 0, value })

  const resetBody = () => {
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  // Never leave the body stuck with a resize cursor if we unmount mid-drag
  useEffect(() => resetBody, [])

  const handleProps = {
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return
      e.preventDefault()
      e.stopPropagation()
      e.currentTarget.setPointerCapture(e.pointerId)
      start.current = { pos: axis === 'x' ? e.clientX : e.clientY, value }
      setIsDragging(true)
      document.body.style.cursor = cursor
      document.body.style.userSelect = 'none'
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return
      const delta = axis === 'x'
        ? e.clientX - start.current.pos
        : start.current.pos - e.clientY
      onChange(Math.min(Math.max(start.current.value + delta, min), max()))
    },
    onPointerUp: (e: PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return
      setIsDragging(false)
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
      resetBody()
    },
    onPointerEnter: () => setIsHovered(true),
    onPointerLeave: () => setIsHovered(false),
    onClick: (e: MouseEvent) => e.stopPropagation(),
  }

  return {
    isDragging,
    isHovered,
    handleProps: { ...handleProps, onPointerCancel: handleProps.onPointerUp },
  }
}
