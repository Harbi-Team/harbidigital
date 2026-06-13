import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { useContactModal } from "@/contexts/ContactModalContext"
import data from "@/data/ekip.json"

const Team = () => {
  const { openModal } = useContactModal()

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />
      <FloatingContactButton />
      <main className="relative z-10">
        <section className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
          <h1 className="font-extrabold font-plus-jakarta leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl mb-4">
            <span className="text-white">{data.hero.heading1}</span><br />
            <span style={{ color: "#a3e635" }}>{data.hero.heading2}</span>
          </h1>
          <p className="text-white/50 font-plus-jakarta text-lg max-w-lg leading-relaxed mb-16">
            {data.hero.subtitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.members.map((member) => (
              <div key={member.name} className="group">
                <div className="rounded-2xl overflow-hidden mb-3 aspect-[3/4] relative" style={{ background: "#161616" }}>
                  {member.img ? (
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-extrabold font-plus-jakarta" style={{ color: "#a3e635" }}>{member.name[0]}</span>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-white font-plus-jakarta text-sm">{member.name}</h3>
                <p className="text-white/40 text-xs font-plus-jakarta mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 border border-white/8 rounded-2xl p-8 text-center" style={{ background: "rgba(163,230,53,0.04)" }}>
            <h3 className="text-2xl font-extrabold text-white font-plus-jakarta mb-3">{data.join.heading}</h3>
            <p className="text-white/40 font-plus-jakarta text-sm mb-6 max-w-sm mx-auto">{data.join.desc}</p>
            <button onClick={openModal}
              className="font-plus-jakarta font-bold text-sm text-neutral-950 px-6 py-3 rounded-full transition-all hover:scale-105"
              style={{ background: "#a3e635" }}>
              {data.join.cta}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Team
