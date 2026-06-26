import { Link } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import data from "@/data/hakkimizda.json"

const About = () => {
  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />
      <FloatingContactButton />
      <main className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 max-w-5xl mx-auto">
          <h1 className="font-extrabold font-plus-jakarta leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mb-6">
            <span style={{ color: "#a3e635" }}>{data.hero.heading1}</span><br />
            <span className="text-white">{data.hero.heading2}</span>
          </h1>
          <p className="text-white/50 font-plus-jakarta text-lg md:text-xl max-w-xl leading-relaxed mb-12">
            {data.hero.subtitle}
          </p>
          <Link to="/iletisim"
            className="font-plus-jakarta font-bold text-sm text-neutral-950 flex items-center gap-2 px-6 py-3 rounded-full w-fit transition-all hover:scale-105 active:scale-95"
            style={{ background: "#a3e635" }}>
            Bizimle Çalışın
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-neutral-900 stroke-[2]"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </section>

        {/* Neden Kuruldu? */}
        <section className="px-6 py-24 max-w-5xl mx-auto border-t border-white/8">
          <span
            className="inline-block text-xs font-bold font-plus-jakarta uppercase tracking-wider px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(163,230,53,0.1)", color: "#a3e635" }}
          >
            {data.nedenKuruldu.badge}
          </span>

          <h2 className="font-extrabold font-plus-jakarta leading-[1.1] tracking-tight text-3xl sm:text-4xl md:text-5xl mb-6 max-w-2xl">
            <span className="text-white">{data.nedenKuruldu.title}</span>{" "}
            <span style={{ color: "#a3e635" }}>{data.nedenKuruldu.titleHighlight}</span>
          </h2>

          <p className="text-white/50 font-plus-jakarta text-base md:text-lg leading-relaxed max-w-2xl mb-14">
            {data.nedenKuruldu.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/8 mb-12" style={{ background: "rgba(255,255,255,0.08)" }}>
            {data.nedenKuruldu.problems.map((p) => (
              <div key={p.number} className="p-6 md:p-8" style={{ background: "#0d0d0d" }}>
                <span className="font-extrabold font-plus-jakarta text-3xl block mb-3" style={{ color: "rgba(163,230,53,0.4)" }}>
                  {p.number}
                </span>
                <h3 className="font-bold font-plus-jakarta text-lg text-white mb-2">{p.title}</h3>
                <p className="text-white/45 font-plus-jakarta text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <p className="font-bold font-plus-jakarta text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 pl-5" style={{ borderColor: "#a3e635" }}>
            {data.nedenKuruldu.closing}
          </p>
        </section>

        {/* Manifesto */}
        <section className="px-6 py-24 max-w-5xl mx-auto border-t border-white/8">
          <span
            className="inline-block text-xs font-bold font-plus-jakarta uppercase tracking-wider px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(163,230,53,0.1)", color: "#a3e635" }}
          >
            {data.manifesto.badge}
          </span>

          <h2 className="font-extrabold font-plus-jakarta leading-[1.1] tracking-tight text-3xl sm:text-4xl md:text-5xl mb-10 max-w-3xl">
            <span className="text-white">{data.manifesto.headline1}</span><br />
            <span style={{ color: "#a3e635" }}>{data.manifesto.headline2}</span>
          </h2>

          <p className="text-white/60 font-plus-jakarta text-sm uppercase tracking-wide leading-relaxed max-w-xl mb-14">
            {data.manifesto.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Seen block */}
            <div className="rounded-2xl border border-white/8 p-6 md:p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
              <span className="text-xs font-bold font-plus-jakarta uppercase tracking-wider text-white/30 mb-4 block">
                {data.manifesto.seenLabel}
              </span>
              <ul className="space-y-2 mb-5">
                {data.manifesto.seenItems.map((item) => (
                  <li key={item} className="font-extrabold font-plus-jakarta text-lg md:text-xl text-white/70">
                    <span className="text-white/25 mr-2">&gt;</span>{item}
                  </li>
                ))}
              </ul>
              <p className="text-white/40 font-plus-jakarta text-sm leading-relaxed">
                {data.manifesto.seenCaption}
              </p>
            </div>

            {/* Unseen block */}
            <div className="rounded-2xl border p-6 md:p-8" style={{ background: "rgba(163,230,53,0.05)", borderColor: "rgba(163,230,53,0.25)" }}>
              <span className="text-xs font-bold font-plus-jakarta uppercase tracking-wider mb-4 block" style={{ color: "#a3e635" }}>
                {data.manifesto.unseenLabel}
              </span>
              <ul className="space-y-2 mb-5">
                {data.manifesto.unseenItems.map((item) => (
                  <li key={item} className="font-extrabold font-plus-jakarta text-lg md:text-xl text-white">
                    <span className="mr-2" style={{ color: "#a3e635" }}>&gt;</span>{item}
                  </li>
                ))}
              </ul>
              <p className="text-white/50 font-plus-jakarta text-sm leading-relaxed">
                {data.manifesto.unseenCaption}
              </p>
            </div>
          </div>

          <p className="text-white/50 font-plus-jakarta text-base leading-relaxed max-w-2xl mb-10">
            {data.manifesto.bridge}
          </p>

          <p className="font-extrabold font-plus-jakarta text-xl md:text-2xl leading-snug max-w-2xl mb-10">
            {data.manifesto.breakpoint}
          </p>

          <p className="font-bold font-plus-jakarta text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 pl-5" style={{ borderColor: "#a3e635" }}>
            {data.manifesto.closing}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
