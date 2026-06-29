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
    className="border rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#a3e635] hover:bg-[#a3e635]/3 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
    style={{
      background: "rgba(0, 0, 0, 0.015)",
      border: "1px solid rgba(0, 0, 0, 0.05)",
    }}
  >
    <h3 className="font-bold text-neutral-900 font-plus-jakarta text-base leading-snug mb-3 transition-colors duration-300">
      {service.name}
    </h3>
    <p className="text-neutral-500 text-sm font-plus-jakarta leading-relaxed">{service.desc}</p>
  </div>
)

const Services = () => {
  const navigate = useNavigate()
  const openModal = () => navigate("/iletisim")

  return (
    <div className="bg-white min-h-screen text-neutral-900">
      <Header />
      <FloatingContactButton />

      <main>
        {/* ── Hero ── */}
        <section className="pt-36 pb-20 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="font-extrabold font-plus-jakarta leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl mb-6">
            <span className="text-neutral-900">{data.hero.heading1}</span><br />
            <span className="bg-[#a3e635] text-neutral-950 px-6 py-1.5 rounded-2xl inline-block mt-2 shadow-sm font-black">
              {data.hero.heading2}
            </span><br />
            <span className="text-neutral-900">{data.hero.heading3}</span>
          </h1>

          <p className="text-neutral-500 font-plus-jakarta text-lg max-w-lg leading-relaxed mb-8">
            {data.hero.subtitle}
          </p>

          <button
            onClick={openModal}
            className="font-plus-jakarta font-extrabold text-sm px-8 py-4 rounded-full w-fit bg-neutral-950 text-white hover:bg-neutral-900 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md shadow-neutral-200"
          >
            Ücretsiz Görüşme
          </button>
        </section>

        {/* ── Catalog ── */}
        <section className="border-t border-neutral-100">
          {/* Section heading */}
          <div className="px-6 pt-20 pb-12 max-w-5xl mx-auto flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold font-plus-jakarta text-neutral-900 leading-tight">
                Hizmet<br />
                <span className="bg-[#a3e635] text-neutral-950 px-4 py-0.5 rounded-xl inline-block mt-2 shadow-sm">
                  Kataloğu
                </span>
              </h2>
              <p className="text-neutral-400 font-plus-jakarta text-sm mt-4">
                {GROUPS.length} farklı kategoride {TOTAL_SERVICES} hizmet ile dijital büyümenizi destekliyoruz.
              </p>
            </div>
            <button
              onClick={openModal}
              className="font-plus-jakarta font-extrabold text-sm px-6 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 bg-neutral-950 text-white hover:bg-neutral-900 flex-shrink-0 shadow-sm"
            >
              Ücretsiz Analiz
            </button>
          </div>

          {/* Grouped service cards */}
          <div className="px-6 pb-20 max-w-5xl mx-auto space-y-16">
            {GROUPS.map(cat => (
              <div key={cat.id}>
                <div className="flex items-baseline gap-2 mb-6 border-b border-neutral-100 pb-3">
                  <h3 className="text-lg font-bold font-plus-jakarta text-neutral-900">{cat.label}</h3>
                  <span className="text-xs font-plus-jakarta text-neutral-400">{cat.services.length} hizmet</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                  {cat.services.map(s => (
                    <ServiceCard key={s.name} service={s} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section className="px-6 pb-24 max-w-5xl mx-auto">
          <div
            className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm"
            style={{
              background: "rgba(0, 0, 0, 0.015)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 font-plus-jakarta mb-3">
                Hangi hizmeti seçeceğinizden emin değil misiniz?
              </h3>
              <p className="text-neutral-500 font-plus-jakarta text-sm leading-relaxed">
                Ücretsiz görüşmede ihtiyaçlarınızı analiz edip size özel yol haritası oluşturuyoruz.
              </p>
            </div>
            <button
              onClick={openModal}
              className="font-plus-jakarta font-extrabold text-sm px-8 py-4 rounded-full transition-all hover:bg-neutral-800 hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0 bg-neutral-950 text-white shadow-md"
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

export default Services
