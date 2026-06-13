import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { useContactModal } from "@/contexts/ContactModalContext"
import data from "@/data/hizmetler.json"
import katalog from "@/data/katalog.json"

type Service = typeof katalog.categories[0]["services"][0]

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
        <section className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 max-w-5xl mx-auto relative">
          {/* Floating ROAS */}
          <div className="absolute top-32 right-0 hidden lg:flex flex-col items-center gap-2">
            <div className="px-3 py-1.5 rounded-full text-xs font-bold font-plus-jakarta"
              style={{ background: "#a3e635", color: "#0d0d0d" }}>{data.floating.roas}</div>
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 flex items-end gap-1 h-20 w-20">
              {[40, 60, 35, 80, 55, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm"
                  style={{ height: `${h}%`, background: "#a3e635", opacity: 0.35 + i * 0.12 }} />
              ))}
            </div>
          </div>

          {/* Floating cost */}
          <div className="absolute bottom-40 right-4 hidden lg:flex items-center gap-2 bg-[#161616] border border-white/10 rounded-full px-4 py-2.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#a3e635] stroke-[2]">
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
            </svg>
            <span className="text-sm font-bold font-plus-jakarta">{data.floating.cost}</span>
          </div>

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

          <h1 className="font-extrabold font-plus-jakarta leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] mb-6 max-w-3xl">
            <span style={{ color: "#a3e635" }}>{data.hero.heading1}</span><br />
            <span className="text-white">{data.hero.heading2}</span><br />
            <span className="text-white">{data.hero.heading3}</span>
          </h1>

          <p className="text-white/50 font-plus-jakarta text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            {data.hero.subtitle}
          </p>

          {/* Social proof cards */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-[#161616] border border-white/8 rounded-2xl p-4 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#a3e635]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-black" style={{ color: "#a3e635" }}>A</span>
                </div>
                <div>
                  <p className="text-sm text-white/80 font-plus-jakarta mb-1">
                    "Satışlarımız bu ay <span className="font-bold" style={{ color: "#a3e635" }}>2 katına çıktı</span>, teşekkürler!"
                  </p>
                  <p className="text-xs text-white/30 font-plus-jakarta">Ahmet Yılmaz, CEO</p>
                </div>
              </div>
            </div>
            <div className="bg-[#161616] border border-white/8 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">👗</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-white font-plus-jakarta">Yaz İndirimi #24</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-plus-jakarta"
                    style={{ background: "rgba(163,230,53,0.2)", color: "#a3e635" }}>Sponsorlu</span>
                </div>
                <p className="text-xs text-white/30 font-plus-jakarta">Aktif · Yayında</p>
              </div>
            </div>
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
