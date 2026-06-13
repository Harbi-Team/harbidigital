import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { Link } from "react-router-dom"

const TEAM = [
  {
    name: "Hüseyin Aydın",
    role: "CEO",
    image: "/team/huseyin-aydin.png",
    description: "CEO & Kurucu Ortak",
  },
  {
    name: "Muhammed Ali Aslan",
    role: "CTO",
    image: "/team/muhammed-ali-aslan.png",
    description: "CTO & Kurucu Ortak",
  },
  {
    name: "Yusuf Alemdar",
    role: "Art Director",
    image: "/team/yusufcan-alemdar.png",
    description: "Art Director & Kurucu Ortak",
  },
  {
    name: "Baransel Inal",
    role: "CIO",
    image: "/team/baransel-inal.png",
    description: "CIO & Kurucu Ortak",
  },
  {
    name: "Rabia Töngel",
    role: "Ürün Yöneticisi",
    image: "/team/rabia-tongel.png",
    description: "Ürün Yöneticisi",
  },
]

export const ActTeamPreview = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable animations on desktop
    const isMobile = window.innerWidth < 768

    if (isMobile) return

    const ctx = gsap.context(() => {
      // Title animation - daha hızlı
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: 0.5,
        },
        y: 80,
        opacity: 0,
      })

      // Cards stagger animation - daha hızlı
      gsap.from(".team-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          end: "top 55%",
          scrub: 0.5,
        },
        y: 60,
        opacity: 0,
        stagger: 0.08,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="act-section relative z-20 bg-background py-24"
      id="team-preview"
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-display-large text-foreground mb-4">
            ARKAMIZDA <span className="text-primary">KİM VAR?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dijital savaşın en deneyimli askerleri.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="team-card group relative overflow-hidden border border-border transition-all duration-500 hover:border-primary"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-display-small text-foreground mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold"
          >
            Tüm Ekibi Gör →
          </Link>
        </div>
      </div>
    </section>
  )
}
