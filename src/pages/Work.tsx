import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { useContactModal } from "@/contexts/ContactModalContext"
import data from "@/data/isler.json"

const Work = () => {
  const { openModal } = useContactModal()

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />
      <FloatingContactButton />
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 0% 40%, rgba(100,180,0,0.18) 0%, transparent 55%)" }} />
      <main className="relative z-10">
        <section className="pt-32 pb-16 px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-8 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
            <span className="text-xs text-white/50 font-plus-jakarta tracking-widest uppercase">{data.hero.badge}</span>
          </div>
          <h1 className="font-extrabold font-plus-jakarta leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl mb-4">
            <span className="text-white">{data.hero.heading1}</span><br />
            <span style={{ color: "#a3e635" }}>{data.hero.heading2}</span>
          </h1>
          <p className="text-white/50 font-plus-jakarta text-lg max-w-lg leading-relaxed mb-14">
            {data.hero.subtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.projects.map((w) => (
              <div key={w.name} className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer" style={{ background: w.bg }}>
                {w.image && <img src={w.image} alt={w.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-300" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full font-plus-jakarta mb-3 inline-block"
                    style={{ background: "rgba(163,230,53,0.15)", color: "#a3e635", border: "1px solid rgba(163,230,53,0.3)" }}>
                    {w.tag}
                  </span>
                  <h3 className="text-xl font-extrabold text-white font-plus-jakarta">{w.name}</h3>
                  <p className="text-white/60 text-sm font-plus-jakarta">{w.result}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={openModal}
              className="font-plus-jakarta font-bold text-sm text-neutral-950 px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95"
              style={{ background: "#a3e635" }}>
              Projenizi Konuşalım
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Work
