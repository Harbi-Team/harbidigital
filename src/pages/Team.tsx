import { Link } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import data from "@/data/ekip.json"

const Team = () => {
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

          {/* Team grid — 3x2, Linear-style cards */}
          <h2 className="text-sm font-bold font-plus-jakarta uppercase tracking-wider text-white/30 mb-6">
            Harbi'nin Arkasındaki İnsanlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.members.map((member) => {
              const CardTag = member.link ? "a" : "div"
              return (
                <CardTag
                  key={member.name}
                  {...(member.link ? { href: member.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group relative rounded-2xl overflow-hidden"
                  style={{ background: "#111111" }}
                >
                  <div className="aspect-[3/4] relative overflow-hidden" style={{ background: "#161616" }}>
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-110 group-hover:blur-[2px] group-hover:brightness-[0.4]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-extrabold font-plus-jakarta" style={{ color: "#a3e635" }}>{member.name[0]}</span>
                      </div>
                    )}

                    {/* Hover bio overlay */}
                    <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white/85 text-sm font-plus-jakarta leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-1.5">
                      <div className="font-bold text-white font-plus-jakarta text-[14px]">{member.name}</div>
                    </div>
                    <p className="text-white/40 text-xs font-plus-jakarta mt-0.5">{member.role}</p>
                  </div>
                </CardTag>
              )
            })}
          </div>

          {/* Birlikte Çalışıyoruz */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-plus-jakarta mb-4">
              {data.together.heading}
            </h3>
            <p className="text-white/50 font-plus-jakarta text-base leading-relaxed max-w-2xl mx-auto">
              {data.together.intro}{" "}
              {data.together.roles.map((role, i) => (
                <span key={role}>
                  <span className="font-bold" style={{ color: "#a3e635" }}>{role}</span>
                  {i < data.together.roles.length - 1 ? ", " : " "}
                </span>
              ))}
              {data.together.outro}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Team
