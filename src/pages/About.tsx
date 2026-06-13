import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { useContactModal } from "@/contexts/ContactModalContext"
import data from "@/data/hakkimizda.json"

const About = () => {
  const { openModal } = useContactModal()

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />
      <FloatingContactButton />
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 0% 40%, rgba(100,180,0,0.18) 0%, transparent 55%)" }} />
      <main className="relative z-10">
        <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-8 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
            <span className="text-xs text-white/50 font-plus-jakarta tracking-widest uppercase">{data.hero.badge}</span>
          </div>
          <h1 className="font-extrabold font-plus-jakarta leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mb-6">
            <span style={{ color: "#a3e635" }}>{data.hero.heading1}</span><br />
            <span className="text-white">{data.hero.heading2}</span>
          </h1>
          <p className="text-white/50 font-plus-jakarta text-lg md:text-xl max-w-xl leading-relaxed mb-12">
            {data.hero.subtitle}
          </p>
          <button onClick={openModal}
            className="font-plus-jakarta font-bold text-sm text-neutral-950 flex items-center gap-2 px-6 py-3 rounded-full w-fit transition-all hover:scale-105 active:scale-95"
            style={{ background: "#a3e635" }}>
            Bizimle Çalışın
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-neutral-900 stroke-[2]"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
          <div className="grid grid-cols-3 gap-6 mt-20 pt-10 border-t border-white/10 max-w-xl">
            {data.stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold font-plus-jakarta" style={{ color: "#a3e635" }}>{value}</div>
                <div className="text-sm text-white/40 font-plus-jakarta mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="px-6 pb-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold font-plus-jakarta text-white mb-10">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.values.map(({ title, desc }) => (
              <div key={title} className="border border-white/8 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center" style={{ background: "rgba(163,230,53,0.15)" }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: "#a3e635" }} />
                </div>
                <h3 className="font-bold text-white font-plus-jakarta mb-2">{title}</h3>
                <p className="text-white/40 text-sm font-plus-jakarta leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
