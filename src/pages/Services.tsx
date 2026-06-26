import { useNavigate } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import data from "@/data/hizmetler.json"
import katalog from "@/data/katalog.json"

type Service = typeof katalog.categories[0]["services"][0]

const GROUPS = katalog.categories.filter(c => c.services.length > 0)
const TOTAL_SERVICES = GROUPS.reduce((sum, c) => sum + c.services.length, 0)

const ServiceCard = ({ service }: { service: Service }) => (
  <div
    className="border rounded-2xl p-5 h-full"
    style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}
  >
    <h3 className="font-bold text-white font-plus-jakarta text-base leading-snug mb-2">
      {service.name}
    </h3>

    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs font-plus-jakarta px-2.5 py-1 rounded-full"
        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}>
        {service.delivery}
      </span>
      <span className="text-xs font-bold font-plus-jakarta px-2.5 py-1 rounded-full"
        style={{ background: "rgba(163,230,53,0.1)", color: "#a3e635" }}>
        ROI {service.roi}
      </span>
    </div>

    <p className="text-white/50 text-sm font-plus-jakarta leading-relaxed">{service.desc}</p>
  </div>
)

const Services = () => {
  const navigate = useNavigate()
  const openModal = () => navigate("/iletisim")

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />
      <FloatingContactButton />

      <main>
        {/* ── Hero ── */}
        <section className="pt-32 pb-20 px-6 max-w-3xl mx-auto text-center flex flex-col items-center">
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
                {GROUPS.length} kategoride {TOTAL_SERVICES} hizmet — teslim süresi ve ROI verisiyle.
              </p>
            </div>
            <button onClick={openModal}
              className="font-plus-jakarta font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95 flex-shrink-0"
              style={{ background: "#a3e635", color: "#0d0d0d" }}>
              Ücretsiz Analiz
            </button>
          </div>

          {/* Grouped service cards */}
          <div className="px-6 pb-10 max-w-5xl mx-auto space-y-14">
            {GROUPS.map(cat => (
              <div key={cat.id}>
                <div className="flex items-baseline gap-2 mb-5">
                  <h3 className="text-lg font-bold font-plus-jakarta text-white">{cat.label}</h3>
                  <span className="text-xs font-plus-jakarta text-white/30">{cat.services.length} hizmet</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
                  {cat.services.map(s => (
                    <ServiceCard key={s.name} service={s} />
                  ))}
                </div>
              </div>
            ))}
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
