import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { useContactModal } from "@/contexts/ContactModalContext"
import data from "@/data/hizmetler.json"
import katalog from "@/data/katalog.json"

type Service = typeof katalog.categories[0]["services"][0]

const VIDEOS = Array.from({ length: 10 }, (_, i) => `/medias/hero-${i + 1}.mp4`)

const VideoReel = () => {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const goTo = (index: number) => {
    setPrev(current)
    setCurrent(index)
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.src = VIDEOS[current]
    v.play().catch(() => {})
  }, [current])

  const handleEnded = () => {
    goTo((current + 1) % VIDEOS.length)
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Main video */}
      <div className="relative rounded-2xl overflow-hidden aspect-video w-full"
        style={{ background: "#111" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          className="w-full h-full object-cover"
        />
        {/* Progress dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: i === current ? "#a3e635" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
        {/* Video counter */}
        <div className="absolute top-3 right-3 text-[10px] font-bold font-plus-jakarta px-2 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.7)" }}>
          {current + 1} / {VIDEOS.length}
        </div>
      </div>

      {/* Thumbnail strip — next 3 videos */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map(offset => {
          const idx = (current + offset) % VIDEOS.length
          return (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className="relative rounded-xl overflow-hidden aspect-video transition-all hover:opacity-80"
              style={{ background: "#111" }}
            >
              <video
                src={VIDEOS[idx]}
                muted
                playsInline
                className="w-full h-full object-cover opacity-60"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

const ServiceRow = ({
  service,
  index,
  isOpen,
  onToggle,
  onCta,
}: {
  service: Service
  index: number
  isOpen: boolean
  onToggle: () => void
  onCta: () => void
}) => (
  <div
    className="transition-colors duration-200"
  >
    {/* Row header — always visible */}
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-5 py-5 text-left group"
    >
      <span
        className="text-xs font-bold font-plus-jakarta w-6 flex-shrink-0 tabular-nums"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className="flex-1 font-semibold font-plus-jakarta text-base transition-colors duration-200"
        style={{ color: isOpen ? "#a3e635" : "white" }}
      >
        {service.name}
      </span>

      {/* Delivery + ROI — hide on mobile when open to save space */}
      <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
        <span
          className="text-xs font-plus-jakarta px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}
        >
          {service.delivery}
        </span>
        <span
          className="text-xs font-bold font-plus-jakarta px-2.5 py-1 rounded-full"
          style={{ background: isOpen ? "rgba(163,230,53,0.15)" : "rgba(255,255,255,0.06)", color: isOpen ? "#a3e635" : "rgba(255,255,255,0.45)" }}
        >
          ROI {service.roi}
        </span>
      </div>

      <div
        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300"
        style={{
          background: isOpen ? "#a3e635" : "rgba(255,255,255,0.07)",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-[2.5]"
          style={{ stroke: isOpen ? "#0d0d0d" : "rgba(255,255,255,0.5)" }}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
    </button>

    {/* Expanded panel */}
    {isOpen && (
      <div className="pb-6 pl-11 pr-0 space-y-4">
        <p className="text-white/50 font-plus-jakarta text-sm leading-relaxed max-w-2xl">
          {service.desc}
        </p>

        {/* Mobile chips */}
        <div className="flex sm:hidden gap-2 flex-wrap">
          <span className="text-xs font-plus-jakarta px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}>
            {service.delivery}
          </span>
          <span className="text-xs font-bold font-plus-jakarta px-2.5 py-1 rounded-full"
            style={{ background: "rgba(163,230,53,0.15)", color: "#a3e635" }}>
            ROI {service.roi}
          </span>
        </div>

        {/* Story */}
        <blockquote
          className="rounded-xl p-4 max-w-2xl"
          style={{ background: "rgba(255,255,255,0.03)", borderLeft: "2px solid rgba(163,230,53,0.35)" }}
        >
          <p className="text-white/40 text-xs font-plus-jakarta leading-relaxed italic">
            "{service.story}"
          </p>
        </blockquote>

        {/* Cross-sell */}
        {service.crossSell?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {service.crossSell.map(cs => (
              <span key={cs} className="text-[11px] px-2.5 py-1 rounded-full font-plus-jakarta"
                style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)" }}>
                + {cs}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={onCta}
          className="font-plus-jakarta font-bold text-xs px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95"
          style={{ background: "#a3e635", color: "#0d0d0d" }}
        >
          Teklif Al
        </button>
      </div>
    )}
  </div>
)

const Services = () => {
  const { openModal } = useContactModal()
  const [activePlatform, setActivePlatform] = useState(data.platforms[0])
  const [activeCategory, setActiveCategory] = useState(katalog.categories[0].id)
  const [openService, setOpenService] = useState<string | null>(null)

  const currentCategory = katalog.categories.find(c => c.id === activeCategory)!

  const handleToggle = (name: string) => {
    setOpenService(prev => (prev === name ? null : name))
  }

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />
      <FloatingContactButton />

      <main>
        {/* ── Hero ── */}
        <section className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Left: text */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Platform tabs */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 w-fit mb-10 flex-wrap">
              {data.platforms.map(p => (
                <button key={p} onClick={() => setActivePlatform(p)}
                  className="px-4 py-2 rounded-full text-sm font-medium font-plus-jakarta transition-all duration-200"
                  style={{
                    background: activePlatform === p ? "white" : "transparent",
                    color: activePlatform === p ? "#0d0d0d" : "rgba(255,255,255,0.5)",
                  }}>
                  {p}
                </button>
              ))}
            </div>

            <h1 className="font-extrabold font-plus-jakarta leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl mb-6">
              <span style={{ color: "#a3e635" }}>{data.hero.heading1}</span><br />
              <span className="text-white">{data.hero.heading2}</span><br />
              <span className="text-white">{data.hero.heading3}</span>
            </h1>

            <p className="text-white/50 font-plus-jakarta text-lg max-w-md leading-relaxed mb-8">
              {data.hero.subtitle}
            </p>

            <button onClick={openModal}
              className="font-plus-jakarta font-bold text-sm px-7 py-3.5 rounded-full w-fit transition-all hover:scale-105 active:scale-95"
              style={{ background: "#a3e635", color: "#0d0d0d" }}>
              Ücretsiz Görüşme
            </button>
          </div>

          {/* Right: video reel */}
          <div className="w-full lg:w-[420px] flex-shrink-0">
            <VideoReel />
          </div>
        </section>

        {/* ── Catalog ── */}
        <section className="border-t border-white/8">
          {/* Section heading */}
          <div className="px-6 pt-16 pb-10 max-w-5xl mx-auto flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold font-plus-jakarta text-white leading-tight">
                Hizmet<br /><span style={{ color: "#a3e635" }}>Kataloğu</span>
              </h2>
              <p className="text-white/30 font-plus-jakarta text-sm mt-3">
                10 kategoride 87 hizmet — teslim süresi ve ROI verisiyle.
              </p>
            </div>
            <button onClick={openModal}
              className="font-plus-jakarta font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95 flex-shrink-0"
              style={{ background: "#a3e635", color: "#0d0d0d" }}>
              Ücretsiz Analiz
            </button>
          </div>

          {/* Sticky category tabs */}
          <div className="sticky top-20 z-30 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/8">
            <div className="px-6 max-w-5xl mx-auto py-3">
              <div className="flex flex-wrap gap-1.5">
                {katalog.categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setOpenService(null) }}
                    className="px-4 py-2 rounded-full text-xs font-semibold font-plus-jakarta transition-all duration-200 whitespace-nowrap"
                    style={{
                      background: activeCategory === cat.id ? "white" : "rgba(255,255,255,0.06)",
                      color: activeCategory === cat.id ? "#0d0d0d" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {cat.label}
                    {cat.services.length > 0 && (
                      <span className="ml-1.5 opacity-50">{cat.services.length}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Service list */}
          <div className="px-6 pb-10 max-w-5xl mx-auto">
            {currentCategory.services.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <p className="text-white/20 font-plus-jakarta text-sm">Bu kategori yakında eklenecek.</p>
              </div>
            ) : (
              <div className="mt-2">
                {currentCategory.services.map((s, i) => (
                  <ServiceRow
                    key={s.name}
                    service={s}
                    index={i}
                    isOpen={openService === s.name}
                    onToggle={() => handleToggle(s.name)}
                    onCta={openModal}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section className="px-6 pb-20 max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white font-plus-jakarta mb-2">
                Hangi hizmeti seçeceğinizden emin değil misiniz?
              </h3>
              <p className="text-white/35 font-plus-jakarta text-sm">
                Ücretsiz görüşmede ihtiyaçlarınızı analiz edip size özel yol haritası oluşturuyoruz.
              </p>
            </div>
            <button onClick={openModal}
              className="font-plus-jakarta font-bold text-sm px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0"
              style={{ background: "#a3e635", color: "#0d0d0d" }}>
              Ücretsiz Analiz Talebi
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Services
