import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { toast } from "sonner"
import { pb } from "@/lib/pocketbase"

const Contact = () => {
  const location = useLocation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (location.state) {
      const { name, surname, phone, email, message } = location.state as any
      setFormData(prev => ({
        ...prev,
        name: name && surname ? `${name} ${surname}` : name || "",
        phone: phone || "",
        email: email || "",
        message: message || "",
      }))
    }
  }, [location.state])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await pb.collection("harbiagencycom_contact").create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: `Website: ${formData.website}\n\n${formData.message}`,
      })
      toast.success("Mesajınız alındı! En kısa sürede dönüş yapacağız.")
      setFormData({ name: "", email: "", phone: "", website: "", message: "" })
    } catch {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      <FloatingContactButton />

      <main className="relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none -translate-x-1/3 -translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(163,230,53,0.18) 0%, transparent 70%)" }} />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none translate-x-1/3"
          style={{ background: "radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 70%)" }} />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20">

          {/* Floating card: Calendar (top right) */}
          <div className="hidden lg:block absolute top-28 right-12 xl:right-24 w-52 bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 rotate-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#a3e635] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-neutral-900 stroke-[2]">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="text-xs font-bold text-neutral-800 font-plus-jakarta">Toplantı Planla</span>
            </div>
            <div className="grid grid-cols-4 gap-1 mb-3">
              {["Pts", "Sal", "Çar", "Per"].map((d, i) => (
                <div key={d} className={`text-center py-1.5 rounded-lg text-xs font-bold font-plus-jakarta ${i === 2 ? "bg-[#a3e635] text-neutral-900" : "text-neutral-400"}`}>
                  <div className="text-[9px] mb-0.5 font-normal">{d}</div>
                  {12 + i}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-[#a3e635]/15 rounded-lg p-2">
              <div className="w-5 h-5 rounded-full bg-[#a3e635] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-neutral-900 stroke-[2.5]"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <span className="text-[10px] font-semibold text-neutral-600 font-plus-jakarta">Onaylandı</span>
            </div>
          </div>

          {/* Floating card: Form preview (left) */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-6 xl:left-16 w-44 bg-[#111] rounded-2xl shadow-xl p-4 -rotate-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-[#a3e635]/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-[#a3e635] stroke-[2]"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <span className="text-[10px] font-bold text-white font-plus-jakarta">İletişim Formu</span>
            </div>
            {["Ad Soyad", "E-posta", "Telefon"].map(label => (
              <div key={label} className="mb-2">
                <div className="text-[8px] text-neutral-500 font-plus-jakarta mb-0.5">{label}</div>
                <div className="h-5 bg-neutral-800 rounded-md" />
              </div>
            ))}
            <div className="h-1.5 w-full rounded-full bg-[#a3e635]/30 mt-3">
              <div className="h-full w-2/3 rounded-full bg-[#a3e635]" />
            </div>
          </div>

          {/* Floating card: Chat (bottom right) */}
          <div className="hidden lg:block absolute bottom-32 right-8 xl:right-20 w-52 bg-[#111] rounded-2xl shadow-xl p-4 rotate-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#a3e635] flex items-center justify-center">
                <span className="text-[10px] font-black text-neutral-900">H</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-white font-plus-jakarta">Harbi Destek</div>
                <div className="text-[8px] text-[#a3e635]">● Çevrimiçi</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-neutral-800 rounded-xl rounded-tl-sm px-3 py-2 text-[10px] text-neutral-300 font-plus-jakarta">
                Merhaba! Size nasıl yardımcı olabilirim?
              </div>
              <div className="bg-[#a3e635] rounded-xl rounded-tr-sm px-3 py-2 text-[10px] text-neutral-900 font-bold font-plus-jakarta ml-6">
                Reklam yönetimi hakkında bilgi almak istiyorum.
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full max-w-2xl">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 font-plus-jakarta text-center leading-tight tracking-tight mb-4">
              Başaranlar Arasına Katılın
            </h1>

            <p className="text-neutral-500 text-base md:text-lg font-plus-jakarta text-center leading-relaxed mb-10 max-w-lg mx-auto">
              Bir görüşme planlayın, dijital hayallerinizi nasıl hayata geçirebileceğimizi birlikte planlayalım.
            </p>

            {/* Form card */}
            <div className="bg-white border border-neutral-150 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="İsim*"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all font-plus-jakarta"
                  />
                  <input
                    type="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all font-plus-jakarta"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 gap-2 focus-within:border-[#a3e635] focus-within:ring-2 focus-within:ring-[#a3e635]/20 transition-all">
                    <span className="text-base flex-shrink-0">🇹🇷</span>
                    <input
                      type="tel"
                      placeholder="XXX XXX XX XX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none font-plus-jakarta min-w-0"
                    />
                  </div>
                  <input
                    type="url"
                    placeholder="Web Sitesi*"
                    value={formData.website}
                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all font-plus-jakarta"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <textarea
                    placeholder="İşletmenizle İlgili Neleri Bilmeliyiz?"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all resize-none font-plus-jakarta"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-full min-h-[120px] font-plus-jakarta font-extrabold text-lg text-white rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "#111111", boxShadow: "0 4px 24px rgba(0,0,0,0.2), 0 0 0 3px rgba(163,230,53,0.3)" }}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

        {/* Bottom dark gradient strip */}
        <div className="h-16 w-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.04))" }} />
      </main>

      <Footer />
    </div>
  )
}

export default Contact
