import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useContactModal } from "@/contexts/ContactModalContext"

const FAQS = [
  {
    q: "Hangi kanalları kullanıyorsunuz?",
    a: "Meta (Facebook & Instagram), Google Ads, TikTok, YouTube ve e-posta pazarlama kanallarını aktif olarak yönetiyoruz. Her müşteri için en verimli kanal karmasını belirliyor ve bütçeyi buna göre dağıtıyoruz.",
  },
  {
    q: "İçerik üretiyorum ama takipçi sayım neden artmıyor?",
    a: "İçerik üretmek tek başına yeterli değil; doğru hedef kitleye, doğru formatta ve doğru zamanda ulaşmak gerekiyor. Strateji olmadan yapılan içerikler görünür olmaz. Biz algoritmayı ve hedef kitlenizi anlayarak bu boşluğu kapatıyoruz.",
  },
  {
    q: "Müşteri dönüşümünü nasıl geliştiriyorsunuz?",
    a: "A/B testleri, ısı haritası analizleri, kullanıcı davranış takibi ve landing page optimizasyonlarıyla dönüşüm hunisindeki sızıntıları tespit edip gideriyoruz. Ortalama %40-90 dönüşüm artışı sağlıyoruz.",
  },
  {
    q: "Minimum bütçe kaç TL / ay olmalıdır?",
    a: "Reklam harcaması için aylık minimum 10.000 TL öneriyoruz. Hizmet bedelimiz ise proje kapsamına göre değişiyor. Ücretsiz ön görüşmede ihtiyaçlarınızı analiz ederek size özel teklif sunuyoruz.",
  },
  {
    q: "Ne kadar sürede sonuç görmeye başlarım?",
    a: "İlk optimizasyon sonuçları genellikle 2-4 hafta içinde görülür. Kalıcı ve ölçeklenebilir büyüme için ise 3 aylık bir süreç gerekiyor. İlk aydan itibaren haftalık raporlarla süreci şeffaf paylaşıyoruz.",
  },
]

export const Act9Cost = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { openModal } = useContactModal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".act9-content",
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

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28" id="act9">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Heading */}
        <div className="act9-content text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-plus-jakarta tracking-tight">
            Aklınızdaki sorulara cevaplar
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="act9-content">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-neutral-200 rounded-xl px-6 data-[state=open]:bg-[#f8f8f8] transition-colors"
              >
                <AccordionTrigger className="text-neutral-900 font-semibold text-sm md:text-base font-plus-jakarta py-5 hover:no-underline text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-500 text-sm leading-relaxed font-plus-jakarta pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="act9-content text-center mt-12">
          <button
            onClick={openModal}
            className="font-plus-jakarta font-extrabold text-sm tracking-wider bg-black text-white hover:bg-neutral-900 border-[2px] border-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_30px_rgba(163,230,53,0.45)] rounded-full px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Görüşme Planla
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-none stroke-[#a3e635] stroke-[2.5]"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
