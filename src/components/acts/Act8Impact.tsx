import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import { toast } from "sonner"

export const Act8Impact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".act8-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      toast.error("Lütfen isim ve e-posta alanlarını doldurun.")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    toast.success("Talebiniz alındı! En kısa sürede sizi arayacağız.")
    setForm({ name: "", email: "", city: "" })
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#f8f8f8] py-20 md:py-28"
      id="act8"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="act8-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#a3e635]" />
              <span className="text-xs font-bold text-neutral-400 tracking-[0.25em] uppercase font-plus-jakarta">
                İletişim
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 font-plus-jakarta tracking-tight leading-[1.1] mb-5">
              Detaylı Bilgi için Sizi Arayalım
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed font-plus-jakarta mb-8">
              Markanızı büyütmek için doğru stratejiyi birlikte belirleyelim.
              Formu doldurun, uzman ekibimiz en kısa sürede sizi arasın.
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#a3e635]/15 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#a3e635] stroke-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .3l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.3-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-plus-jakarta">Bizi arayabilirsiniz</p>
                <a
                  href="tel:+905357631908"
                  className="text-neutral-900 font-bold font-plus-jakarta text-sm hover:text-[#a3e635] transition-colors"
                >
                  +90 535 763 19 08
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 font-plus-jakarta">
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-[#f8f8f8] border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 text-sm font-plus-jakarta placeholder:text-neutral-400 focus:outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 font-plus-jakarta">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ornek@sirket.com"
                  className="w-full bg-[#f8f8f8] border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 text-sm font-plus-jakarta placeholder:text-neutral-400 focus:outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 font-plus-jakarta">
                  İl / İlçe
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="İstanbul, Kadıköy"
                  className="w-full bg-[#f8f8f8] border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 text-sm font-plus-jakarta placeholder:text-neutral-400 focus:outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-neutral-900 hover:bg-black text-white font-bold text-sm font-plus-jakarta rounded-xl px-6 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
              >
                {loading ? "Gönderiliyor..." : "Gönder"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
