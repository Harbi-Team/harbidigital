import { useContactModal } from "@/contexts/ContactModalContext"

export const FloatingContactButton = () => {
  const { openModal } = useContactModal()

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      {/* Outer dark pill container */}
      <div
        className="flex items-center gap-2 p-2"
        style={{
          background: "#1c1c1c",
          borderRadius: "999px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {/* Sizi Arayalım */}
        <button
          onClick={openModal}
          className="font-plus-jakarta font-bold text-sm text-white flex items-center gap-2.5 px-6 py-3 transition-all duration-200 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          style={{
            background: "#111111",
            borderRadius: "999px",
            border: "2px solid #a3e635",
            boxShadow: "0 0 14px rgba(163,230,53,0.35), inset 0 0 12px rgba(0,0,0,0.6)",
          }}
        >
          Sizi Arayalım
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/80 flex-shrink-0">
            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .3l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.3-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
          </svg>
        </button>

        {/* Görüşme Planla */}
        <button
          onClick={openModal}
          className="font-plus-jakarta font-bold text-sm text-white flex items-center gap-2.5 px-6 py-3 transition-all duration-200 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          style={{
            background: "#111111",
            borderRadius: "999px",
            border: "2px solid #a3e635",
            boxShadow: "0 0 14px rgba(163,230,53,0.35), inset 0 0 12px rgba(0,0,0,0.6)",
          }}
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
