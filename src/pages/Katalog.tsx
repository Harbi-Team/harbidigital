import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import katalog from "@/data/katalog.json"

const ServiceCard = ({ service, onCta }: { service: typeof katalog.categories[0]["services"][0]; onCta: () => void }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="border rounded-2xl p-5 transition-all duration-200 cursor-pointer group"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white font-plus-jakarta text-base leading-snug group-hover:text-[#a3e635] transition-colors">
            {service.name}
          </h3>
        </div>
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-200 fill-none stroke-white/30 stroke-[2]"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <p className="text-white/40 text-sm font-plus-jakarta leading-relaxed">{service.desc}</p>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-white/8 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/3 rounded-xl p-3">
              <div className="text-[10px] text-white/30 font-plus-jakarta uppercase tracking-wider mb-1">Teslim Süresi</div>
              <div className="text-sm font-bold text-white font-plus-jakarta">{service.delivery}</div>
            </div>
            <div className="bg-white/3 rounded-xl p-3">
              <div className="text-[10px] text-white/30 font-plus-jakarta uppercase tracking-wider mb-1">ROI Dönüşü</div>
              <div className="text-sm font-bold font-plus-jakarta" style={{ color: "#a3e635" }}>{service.roi}</div>
            </div>
          </div>

          <div className="bg-white/3 rounded-xl p-3">
            <div className="text-[10px] text-white/30 font-plus-jakarta uppercase tracking-wider mb-1.5">Sonuç</div>
            <p className="text-sm text-white/60 font-plus-jakarta leading-relaxed">{service.result}</p>
          </div>

          <div className="bg-white/3 rounded-xl p-3">
            <div className="text-[10px] text-white/30 font-plus-jakarta uppercase tracking-wider mb-1.5">Başarı Hikayesi</div>
            <p className="text-sm text-white/60 font-plus-jakarta leading-relaxed italic">"{service.story}"</p>
          </div>

          {service.crossSell && service.crossSell.length > 0 && (
            <div>
              <div className="text-[10px] text-white/30 font-plus-jakarta uppercase tracking-wider mb-2">Çapraz Satış</div>
              <div className="flex flex-wrap gap-1.5">
                {service.crossSell.map(cs => (
                  <span key={cs} className="text-[11px] px-2 py-0.5 rounded-full font-plus-jakarta"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                    {cs}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={e => { e.stopPropagation(); onCta() }}
            className="w-full mt-2 py-2.5 rounded-xl font-plus-jakarta font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "#a3e635", color: "#0d0d0d" }}
          >
            Teklif Al
          </button>
        </div>
      )}
    </div>
  )
}

const Katalog = () => {
  const navigate = useNavigate()
  const openModal = () => navigate("/iletisim")
  const [activeCategory, setActiveCategory] = useState(katalog.categories[0].id)

  const currentCategory = katalog.categories.find(c => c.id === activeCategory)!
  const isEmpty = currentCategory.services.length === 0

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />
      <FloatingContactButton />
      <main className="relative z-10">
        <section className="pt-32 pb-8 px-6 max-w-6xl mx-auto">
          <h1 className="font-extrabold font-plus-jakarta leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl mb-4">
            <span style={{ color: "#a3e635" }}>87 hizmet,</span><br />
            <span className="text-white">tek çatı.</span>
          </h1>
          <p className="text-white/50 font-plus-jakarta text-lg max-w-xl leading-relaxed mb-12">
            10 kategoride ihtiyacınız olan her dijital hizmet. Her biri için net teslim süresi, ROI ve başarı hikayesi.
          </p>
        </section>

        {/* Category tabs */}
        <div className="sticky top-20 z-30 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/8 px-6 pb-3">
          <div className="max-w-6xl mx-auto overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1 w-max">
              {katalog.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium font-plus-jakarta transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: activeCategory === cat.id ? "white" : "rgba(255,255,255,0.06)",
                    color: activeCategory === cat.id ? "#0d0d0d" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {cat.label}
                  {cat.services.length > 0 && (
                    <span className="ml-1.5 text-[10px] font-bold opacity-60">{cat.services.length}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services grid */}
        <section className="px-6 py-12 max-w-6xl mx-auto">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                style={{ background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.2)" }}>
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-[#a3e635] stroke-[1.5]">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white font-plus-jakarta mb-2">Yakında Eklenecek</h3>
              <p className="text-white/40 font-plus-jakarta text-sm max-w-xs">
                Bu kategorideki hizmetler yakında burada olacak.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentCategory.services.map(s => (
                <ServiceCard key={s.name} service={s} onCta={openModal} />
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="rounded-3xl p-8 md:p-12 text-center"
            style={{ background: "rgba(163,230,53,0.04)", border: "1px solid rgba(163,230,53,0.12)" }}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-plus-jakarta mb-4">
              Hangi hizmetin işinize yarayacağından emin değil misiniz?
            </h2>
            <p className="text-white/40 font-plus-jakarta mb-8 max-w-md mx-auto">
              Ücretsiz bir görüşmede ihtiyaçlarınızı analiz edip size özel yol haritası oluşturuyoruz.
            </p>
            <button
              onClick={openModal}
              className="font-plus-jakarta font-bold text-sm text-neutral-950 px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95"
              style={{ background: "#a3e635" }}
            >
              Ücretsiz Analiz Talebi
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Katalog
