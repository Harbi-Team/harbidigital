import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

const ALL_TAGS = [
  { label: "İçerik Üretimi" },
  { label: "İş Analizi" },
  { label: "SEO Yönetimi" },
  { label: "Reklam Yönetimi" },
  { label: "Veri Analizi" },
  { label: "E-Posta Pazarlama" },
]

export const Act2Problem = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in entry animation
      gsap.fromTo(
        ".float-tag",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        ".act2-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Orbit animation logic
      const tags = document.querySelectorAll(".float-tag")
      const orbit = { angle: 0 }
      
      const updatePositions = () => {
        const width = window.innerWidth
        // Calculate responsive radii
        const radiusX = Math.min(Math.max(width * 0.35, 360), 520)
        const radiusY = 160
        
        tags.forEach((tag, i) => {
          const startAngle = (i * 2 * Math.PI) / 6
          const currentAngle = startAngle + orbit.angle
          const x = Math.cos(currentAngle) * radiusX
          const y = Math.sin(currentAngle) * radiusY
          
          gsap.set(tag, {
            x: x,
            y: y,
            xPercent: -50,
            yPercent: -50,
          })
        })
      }
      
      const anim = gsap.to(orbit, {
        angle: 2 * Math.PI,
        duration: 35, // Slow rotation for a smooth effect
        ease: "none",
        repeat: -1,
        onUpdate: updatePositions,
      })

      window.addEventListener("resize", updatePositions)
      updatePositions()

      return () => {
        window.removeEventListener("resize", updatePositions)
        anim.kill()
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-28 md:py-36 overflow-hidden"
      id="act2"
    >
      {/* Rotating orbit tags */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
        {ALL_TAGS.map((tag, i) => (
          <div
            key={i}
            className="float-tag absolute left-1/2 top-1/2 flex items-center gap-2.5 bg-white border border-neutral-200 shadow-md rounded-full px-4 py-2.5 z-20"
          >
            <span className="w-2 h-2 rounded-full bg-[#a3e635] flex-shrink-0" />
            <span className="text-sm font-semibold text-neutral-700 font-plus-jakarta whitespace-nowrap">
              {tag.label}
            </span>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="act2-content grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <p className="text-neutral-900 text-xl md:text-2xl leading-relaxed font-plus-jakarta font-semibold">
            Veri odaklı pazarlama sanatıyla mühendisliği harmanlayarak büyüme
            odaklı çözümler sunuyoruz.
          </p>
          <p className="text-neutral-500 text-base md:text-lg leading-relaxed font-plus-jakarta">
            Tam da bu yüzden, büyüme bizim için bir motto değil, sürekli
            yenilenen bir yol haritasıdır. İşletmenizin potansiyelini maksimuma
            çıkarmak için her adımda yanınızdayız.
          </p>
        </div>
      </div>
    </section>
  )
}
