"use client"

import React, {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export interface GlassSurfaceProps extends React.HTMLAttributes<
  HTMLDivElement | HTMLButtonElement
> {
  as?: "div" | "button"
  children?: React.ReactNode
  width?: number | string
  height?: number | string
  borderRadius?: number
  borderWidth?: number
  brightness?: number
  opacity?: number
  blur?: number
  displace?: number
  backgroundOpacity?: number
  saturation?: number
  distortionScale?: number
  redOffset?: number
  greenOffset?: number
  blueOffset?: number
  xChannel?: "R" | "G" | "B"
  yChannel?: "R" | "G" | "B"
  mixBlendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity"
    | "plus-darker"
    | "plus-lighter"
  className?: string
  style?: React.CSSProperties
  contentClassName?: string
}

export const GlassSurface = React.forwardRef<
  HTMLDivElement | HTMLButtonElement,
  GlassSurfaceProps
>(
  (
    {
      as = "div",
      children,
      width = "100%",
      height = "auto",
      borderRadius = 20,
      borderWidth = 0.07,
      brightness = 50,
      opacity = 0.93,
      blur = 11,
      displace = 0,
      backgroundOpacity = 0,
      saturation = 1,
      distortionScale = -180,
      redOffset = 0,
      greenOffset = 10,
      blueOffset = 20,
      xChannel = "R",
      yChannel = "G",
      mixBlendMode = "difference",
      className = "",
      style = {},
      contentClassName = "",
      ...props
    },
    ref
  ) => {
    const uniqueId = useId().replace(/:/g, "-")
    const filterId = `glass-filter-${uniqueId}`
    const redGradId = `red-grad-${uniqueId}`
    const blueGradId = `blue-grad-${uniqueId}`
    const innerBlurId = `inner-blur-${uniqueId}`

    const [mounted, setMounted] = useState<boolean>(false)

    const containerRef = useRef<HTMLDivElement | HTMLButtonElement | null>(null)
    const feImageRef = useRef<SVGFEImageElement>(null)
    const redChannelRef = useRef<SVGFEDisplacementMapElement>(null)
    const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null)
    const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null)
    const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null)

    // Sync ref forwarding
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    const themeContext = useTheme()
    const resolvedTheme = themeContext?.resolvedTheme

    useEffect(() => {
      setMounted(true)
    }, [])

    const svgSupported = mounted

    // Robust dark mode check (checks next-themes, classList, and media matchers)
    let isDarkMode = false
    if (mounted) {
      if (resolvedTheme === "dark") {
        isDarkMode = true
      } else if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
        isDarkMode = true
      } else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        isDarkMode = true
      }
    }

    const generateDisplacementMap = useCallback(() => {
      const rect = containerRef.current?.getBoundingClientRect()
      const actualWidth = rect?.width || 400
      const actualHeight = rect?.height || 80
      const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5)

      // Calculate concentric radii so the border remains perfectly uniform
      const maxRadius = Math.min(actualWidth, actualHeight) * 0.5
      const svgRadius = borderRadius > maxRadius ? maxRadius : borderRadius
      const innerRadius = Math.max(0, svgRadius - edgeSize)

      // Use a native SVG filter for inner blur to ensure compatibility across all SVG renderers
      const svgContent = `
        <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="${redGradId}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ff0000"/>
              <stop offset="50%" stop-color="#800000"/>
              <stop offset="100%" stop-color="#000000"/>
            </linearGradient>
            <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0000ff"/>
              <stop offset="50%" stop-color="#000080"/>
              <stop offset="100%" stop-color="#000000"/>
            </linearGradient>
            <filter id="${innerBlurId}" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="${blur ? blur * 0.5 : 0}" />
            </filter>
          </defs>
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="#808080"></rect>
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${svgRadius}" fill="url(#${redGradId})" />
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${svgRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
          <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${innerRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" filter="url(#${innerBlurId})" />
        </svg>
      `

      return `data:image/svg+xml,${encodeURIComponent(svgContent)}`
    }, [
      borderRadius,
      borderWidth,
      brightness,
      opacity,
      blur,
      mixBlendMode,
      redGradId,
      blueGradId,
      innerBlurId,
    ])

    const updateDisplacementMap = useCallback(() => {
      feImageRef.current?.setAttribute("href", generateDisplacementMap())
    }, [generateDisplacementMap])

    useEffect(() => {
      updateDisplacementMap()
      ;[
        { ref: redChannelRef, offset: redOffset },
        { ref: greenChannelRef, offset: greenOffset },
        { ref: blueChannelRef, offset: blueOffset },
      ].forEach(({ ref: elementRef, offset }) => {
        if (elementRef.current) {
          elementRef.current.setAttribute(
            "scale",
            (distortionScale + offset).toString()
          )
          elementRef.current.setAttribute("xChannelSelector", xChannel)
          elementRef.current.setAttribute("yChannelSelector", yChannel)
        }
      })

      gaussianBlurRef.current?.setAttribute("stdDeviation", displace.toString())
    }, [
      width,
      height,
      borderRadius,
      borderWidth,
      brightness,
      opacity,
      blur,
      displace,
      distortionScale,
      redOffset,
      greenOffset,
      blueOffset,
      xChannel,
      yChannel,
      mixBlendMode,
      mounted,
      updateDisplacementMap,
    ])

    useEffect(() => {
      if (!containerRef.current) return

      const resizeObserver = new ResizeObserver(() => {
        setTimeout(updateDisplacementMap, 0)
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }, [updateDisplacementMap])

    useEffect(() => {
      setTimeout(updateDisplacementMap, 0)
    }, [width, height, updateDisplacementMap])

    const getContainerStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        ...style,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius: `${borderRadius}px`,
        "--glass-frost": backgroundOpacity,
        "--glass-saturation": saturation,
      } as React.CSSProperties

      const waterDropletShadow = isDarkMode
        ? `inset 0 0 0 1px rgba(255, 255, 255, 0.12),
           0 4px 20px rgba(0, 0, 0, 0.25)`
        : `inset 0 0 0 1px rgba(0, 0, 0, 0.08),
           0 4px 20px rgba(0, 0, 0, 0.08)`

      if (svgSupported) {
        return {
          ...baseStyles,
          background: isDarkMode
            ? `hsl(0 0% 0% / ${backgroundOpacity})`
            : `hsl(0 0% 100% / ${backgroundOpacity})`,
          backdropFilter: `url(#${filterId}) saturate(${saturation})`,
          boxShadow: waterDropletShadow,
        }
      } else {
        if (isDarkMode) {
          return {
            ...baseStyles,
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
            WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: waterDropletShadow,
          }
        } else {
          return {
            ...baseStyles,
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
            WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: waterDropletShadow,
          }
        }
      }
    }

    const glassSurfaceClasses =
      "relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out"

    const focusVisibleClasses = isDarkMode
      ? "focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2"
      : "focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2"

    const Component = as

    return (
      <Component
        ref={
          containerRef as unknown as React.Ref<HTMLDivElement> &
            React.Ref<HTMLButtonElement>
        }
        className={`${glassSurfaceClasses} ${focusVisibleClasses} ${className}`}
        style={getContainerStyles()}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        <svg
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id={filterId}
              colorInterpolationFilters="sRGB"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feImage
                ref={feImageRef}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                result="map"
              />

              <feDisplacementMap
                ref={redChannelRef}
                in="SourceGraphic"
                in2="map"
                id="redchannel"
                result="dispRed"
              />
              <feColorMatrix
                in="dispRed"
                type="matrix"
                values="1 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0"
                result="red"
              />

              <feDisplacementMap
                ref={greenChannelRef}
                in="SourceGraphic"
                in2="map"
                id="greenchannel"
                result="dispGreen"
              />
              <feColorMatrix
                in="dispGreen"
                type="matrix"
                values="0 0 0 0 0
                        0 1 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0"
                result="green"
              />

              <feDisplacementMap
                ref={blueChannelRef}
                in="SourceGraphic"
                in2="map"
                id="bluechannel"
                result="dispBlue"
              />
              <feColorMatrix
                in="dispBlue"
                type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 1 0 0
                        0 0 0 1 0"
                result="blue"
              />

              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur
                ref={gaussianBlurRef}
                in="output"
                stdDeviation="0.7"
              />
            </filter>
          </defs>
        </svg>

        <div className={cn("relative z-10 flex h-full w-full items-center justify-center rounded-[inherit]", contentClassName)}>
          {children}
        </div>
      </Component>
    )
  }
)

GlassSurface.displayName = "GlassSurface"
