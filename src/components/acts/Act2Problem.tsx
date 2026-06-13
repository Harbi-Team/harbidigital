import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

const LEFT_TAGS = [
  { label: "İçerik Üretimi" },
  { label: "İş Analizi" },
  { label: "SEO Yönetimi" },
]

const RIGHT_TAGS = [
  { label: "Reklam Yönetimi" },
  { label: "Veri Analizi" },
  { label: "E-Posta Pazarlama" },
]

export const Act2Problem = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".float-tag",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-28 md:py-36 overflow-hidden"
      id="act2"
    >
      {/* Left floating tags */}
      <div className="absolute left-[3%] xl:left-[6%] top-0 bottom-0 hidden lg:flex flex-col justify-around py-20 pointer-events-none">
        {LEFT_TAGS.map((tag, i) => (
          <div
            key={i}
            className="float-tag flex items-center gap-2.5 bg-white border border-neutral-200 shadow-md rounded-full px-4 py-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#a3e635] flex-shrink-0" />
            <span className="text-sm font-semibold text-neutral-700 font-plus-jakarta whitespace-nowrap">
              {tag.label}
            </span>
          </div>
        ))}
      </div>

      {/* Right floating tags */}
      <div className="absolute right-[3%] xl:right-[6%] top-0 bottom-0 hidden lg:flex flex-col justify-around py-20 pointer-events-none">
        {RIGHT_TAGS.map((tag, i) => (
          <div
            key={i}
            className="float-tag flex items-center gap-2.5 bg-white border border-neutral-200 shadow-md rounded-full px-4 py-2.5"
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
