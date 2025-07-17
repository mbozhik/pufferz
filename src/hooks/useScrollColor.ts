'use client'

import {useEffect} from 'react'

type UseScrollColorProps = {
  startColor: string
  endColor: string
  variableName?: string
  opacity?: number
}

export const BACKGROUND = {
  start: '#0B1E3F',
  end: '#050F20',
}

export function useScrollColor({startColor, endColor, variableName = '--scroll-color', opacity = 1}: UseScrollColorProps) {
  useEffect(() => {
    const updateColor = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = Math.min(scrollY / documentHeight, 1)

      const interpolatedColor = interpolateColor(startColor, endColor, scrollProgress)
      const colorWithOpacity = opacity < 1 ? hexToRgba(interpolatedColor, opacity) : interpolatedColor
      document.documentElement.style.setProperty(variableName, colorWithOpacity)
    }

    const hexToRgba = (hex: string, alpha: number): string => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    const interpolateColor = (color1: string, color2: string, factor: number): string => {
      const hex1 = color1.replace('#', '')
      const hex2 = color2.replace('#', '')

      const r1 = parseInt(hex1.substr(0, 2), 16)
      const g1 = parseInt(hex1.substr(2, 2), 16)
      const b1 = parseInt(hex1.substr(4, 2), 16)

      const r2 = parseInt(hex2.substr(0, 2), 16)
      const g2 = parseInt(hex2.substr(2, 2), 16)
      const b2 = parseInt(hex2.substr(4, 2), 16)

      const r = Math.round(r1 + (r2 - r1) * factor)
      const g = Math.round(g1 + (g2 - g1) * factor)
      const b = Math.round(b1 + (b2 - b1) * factor)

      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    }

    updateColor()
    window.addEventListener('scroll', updateColor)

    return () => {
      window.removeEventListener('scroll', updateColor)
    }
  }, [startColor, endColor, variableName])
}
