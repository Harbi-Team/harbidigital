import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { useContactModal } from "@/contexts/ContactModalContext"
import data from "@/data/urunler.json"

const Products = () => {
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
            <span style={{ color: "#a3e635" }}>{data.hero.heading1}</span>
            <br />
            <span className="text-white">{data.hero.heading2}</span>
          </h1>
          <p className="text-white/50 font-plus-jakarta text-lg max-w-lg leading-relaxed mb-14">
            {data.hero.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.products.map((p) => (
              <div key={p.name}
                className="relative rounded-2xl p-6 border transition-all duration-200 hover:border-[#a3e635]/40 group"
                style={{
                  background: p.highlight ? "rgba(163,230,53,0.06)" : "rgba(255,255,255,0.03)",
                  border: p.highlight ? "1px solid rgba(163,230,53,0.3)" : "1px solid rgba(255,255,255,0.08)",
                }}>
                {p.highlight && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full font-plus-jakarta"
                    style={{ background: "#a3e635", color: "#0d0d0d" }}>
                    Popüler
                  </span>
                )}
                <h3 className="text-lg font-extrabold text-white font-plus-jakarta mb-2">{p.name}</h3>
                <p className="text-white/40 text-sm font-plus-jakarta leading-relaxed mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full font-plus-jakarta font-medium"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <button onClick={openModal}
                  className="font-plus-jakarta font-bold text-sm w-full py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: p.highlight ? "#a3e635" : "rgba(255,255,255,0.07)",
                    color: p.highlight ? "#0d0d0d" : "white",
                  }}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Products
