import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { useContactModal } from "@/contexts/ContactModalContext"
import data from "@/data/hizmetler.json"

const Services = () => {
  const { openModal } = useContactModal()
  const [activePlatform, setActivePlatform] = useState(data.platforms[0])

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />
      <FloatingContactButton />
      <main className="relative z-10">
        <section className="min-h-screen flex flex-col justify-center pt-32 pb-16 px-6 max-w-5xl mx-auto relative">
          {/* Floating ROAS card */}
          <div className="absolute top-32 right-0 hidden lg:flex flex-col items-center gap-2">
            <div className="px-3 py-1.5 rounded-full text-xs font-bold font-plus-jakarta" style={{ background: "#a3e635", color: "#0d0d0d" }}>{data.floating.roas}</div>
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 flex items-end gap-1 h-20 w-20">
              {[40, 60, 35, 80, 55, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: "#a3e635", opacity: 0.4 + i * 0.1 }} />
              ))}
            </div>
          </div>
          {/* Floating cost card */}
          <div className="absolute bottom-40 right-4 hidden lg:flex items-center gap-2 bg-[#161616] border border-white/10 rounded-full px-4 py-2.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#a3e635] stroke-[2]"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>
            <span className="text-sm font-bold font-plus-jakarta">{data.floating.cost}</span>
          </div>
          {/* Platform tabs */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 w-fit mb-10 flex-wrap">
            {data.platforms.map(p => (
              <button key={p} onClick={() => setActivePlatform(p)}
                className="px-4 py-2 rounded-full text-sm font-medium font-plus-jakarta transition-all duration-200"
                style={{ background: activePlatform === p ? "white" : "transparent", color: activePlatform === p ? "#0d0d0d" : "rgba(255,255,255,0.5)" }}>
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
          <div className="flex flex-wrap gap-4">
            <div className="bg-[#161616] border border-white/8 rounded-2xl p-4 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#a3e635]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-black" style={{ color: "#a3e635" }}>A</span>
                </div>
                <div>
                  <p className="text-sm text-white/80 font-plus-jakarta mb-1">"Satışlarımız bu ay <span className="font-bold" style={{ color: "#a3e635" }}>2 katına çıktı</span>, teşekkürler! 🚀"</p>
                  <p className="text-xs text-white/30 font-plus-jakarta">Ahmet Yılmaz, CEO</p>
                </div>
              </div>
            </div>
            <div className="bg-[#161616] border border-white/8 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0"><span className="text-lg">👗</span></div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-white font-plus-jakarta">Yaz İndirimi #24</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-plus-jakarta" style={{ background: "rgba(163,230,53,0.2)", color: "#a3e635" }}>Sponsorlu</span>
                </div>
                <p className="text-xs text-white/30 font-plus-jakarta">Aktif · Yayında</p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 pb-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold font-plus-jakarta text-white mb-10">Tüm Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.services.map((s) => (
              <div key={s.title} className="border border-white/8 rounded-2xl p-6 hover:border-[#a3e635]/30 transition-all duration-200 group" style={{ background: "rgba(255,255,255,0.03)" }}>
                <h3 className="text-lg font-extrabold text-white font-plus-jakarta mb-2 group-hover:text-[#a3e635] transition-colors">{s.title}</h3>
                <p className="text-white/40 text-sm font-plus-jakarta leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.metrics.map(m => (
                    <li key={m} className="flex items-center gap-2 text-sm text-white/60 font-plus-jakarta">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#a3e635" }} />{m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Services
