import { useEffect, useState } from "react"

export const Loader = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // 3 saniye sonra loader'ı gizle
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Logo */}
      <div className="animate-pulse">
        <img
          src="/harbi/harbi_logo.png"
          alt="HARB!"
          className="w-48 h-48 md:w-64 md:h-64 object-contain"
        />
      </div>

      {/* Text */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-wider">
          HARB! SUNAR...
        </h2>
      </div>

      {/* Loading Animation */}
      <div className="mt-12 flex gap-2">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}
