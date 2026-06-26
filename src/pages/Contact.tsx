import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { AsYouType } from "libphonenumber-js"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { toast } from "sonner"
import { pb } from "@/lib/pocketbase"

const formatPhone = (value: string) => new AsYouType("TR").input(value)

const Contact = () => {
  const location = useLocation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (location.state) {
      const { name, surname, phone, email, message } = location.state as any
      setFormData(prev => ({
        ...prev,
        name: name && surname ? `${name} ${surname}` : name || "",
        phone: phone ? formatPhone(phone) : "",
        email: email || "",
        message: message || "",
      }))
    }
  }, [location.state])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await pb.collection("harbiforms").create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        description: formData.message,
      })
      toast.success("Mesajınız alındı! En kısa sürede dönüş yapacağız.")
      setFormData({ name: "", email: "", phone: "", message: "" })
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
          {/* Main content */}
          <div className="w-full max-w-2xl">
            {/* Badge */}
            <div className="flex justify-center mb-5">
              <span
                className="inline-block text-xs font-bold font-plus-jakarta uppercase tracking-wider px-3 py-1.5 rounded-full"
                style={{ background: "rgba(163,230,53,0.12)", color: "#5c8a0f" }}
              >
                İletişim
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 font-plus-jakarta text-center leading-tight tracking-tight mb-4">
              Başaranlar Arasına Katılın
            </h1>

            <p className="text-neutral-500 text-base md:text-lg font-plus-jakarta text-center leading-relaxed mb-10 max-w-lg mx-auto">
              Bir görüşme planlayın, dijital hayallerinizi nasıl hayata geçirebileceğimizi birlikte planlayalım.
            </p>

            {/* Form card */}
            <div className="bg-white border border-neutral-150 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 md:p-10">
              <div className="mb-7">
                <h2 className="text-xl font-extrabold text-neutral-950 font-plus-jakarta mb-1">Bize Ulaşın</h2>
                <p className="text-neutral-400 text-sm font-plus-jakarta">Formu doldurun, 24 saat içinde size dönüş yapalım.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold font-plus-jakarta uppercase tracking-wide text-neutral-500 mb-2">
                    Ad Soyad
                  </label>
                  <div className="relative">
                    <svg viewBox="0 0 24 24" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 fill-none stroke-neutral-400 stroke-[2] pointer-events-none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="name"
                      type="text"
                      placeholder="Adınız ve soyadınız"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all font-plus-jakarta"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold font-plus-jakarta uppercase tracking-wide text-neutral-500 mb-2">
                    Telefon
                  </label>
                  <div className="relative">
                    <svg viewBox="0 0 24 24" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 fill-none stroke-neutral-400 stroke-[2] pointer-events-none">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="532 123 45 67"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                      required
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all font-plus-jakarta"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold font-plus-jakarta uppercase tracking-wide text-neutral-500 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <svg viewBox="0 0 24 24" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 fill-none stroke-neutral-400 stroke-[2] pointer-events-none">
                      <path d="M4 4h16v16H4z" opacity="0" /><path d="M22 6 12 13 2 6" /><rect x="2" y="4" width="20" height="16" rx="2" />
                    </svg>
                    <input
                      id="email"
                      type="email"
                      placeholder="ornek@firma.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all font-plus-jakarta"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold font-plus-jakarta uppercase tracking-wide text-neutral-500 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    id="message"
                    placeholder="İşletmenizle ilgili neleri bilmeliyiz?"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 transition-all resize-none font-plus-jakarta"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-plus-jakarta font-extrabold text-lg text-white rounded-xl py-4 mt-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "#111111", boxShadow: "0 4px 24px rgba(0,0,0,0.2), 0 0 0 3px rgba(163,230,53,0.3)" }}
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </button>
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
