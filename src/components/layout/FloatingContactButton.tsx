import { useContactModal } from "@/contexts/ContactModalContext"

export const FloatingContactButton = () => {
  const { openModal } = useContactModal()

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      {/* Outer wrapper with glow and border mask */}
      <div 
        className="relative p-[1.5px] rounded-full overflow-hidden flex items-center justify-center"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(163,230,53,0.3)",
        }}
      >
        {/* Rotating gradient background */}
        <div 
          className="absolute inset-[-200%] animate-[spin_3s_linear_infinite]"
          style={{
            background: "conic-gradient(from 0deg, transparent 20%, #a3e635 40%, transparent 60%, #a3e635 80%, transparent 100%)",
          }}
        />

        {/* Button body */}
        <button
          onClick={openModal}
          className="relative z-10 font-plus-jakarta font-bold text-sm text-white flex items-center gap-2.5 px-6 py-3 transition-all duration-200 hover:scale-[1.02] active:scale-95 whitespace-nowrap bg-[#111111] hover:bg-[#161616] rounded-full"
        >
          Görüşme Planla
          <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 fill-none stroke-white/80 stroke-[2]">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <polyline points="9 16 11 18 15 14" />
          </svg>
        </button>
      </div>
    </div>
  )
}
