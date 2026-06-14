export const SITE_NAME = "HARB!"
export const SITE_TAGLINE = "Dijital Dönüşüm Ajansı"
export const SITE_CONFIG = {
  contact: {
    email: "harbiagency@gmail.com",
    phone: "+90 535 763 19 08",
    phoneDisplay: "+90 535 763 19 08",
    address: "İstanbul, Türkiye",
    addressFull: "Sarıyer, İstanbul, Türkiye",
  },
  social: {
    instagram: "https://www.instagram.com/harbidigitall/",
    linkedin: "",
    twitter: "",
    facebook: "",
    youtube: "",
  },
  business: {
    companyName: "HARB! Dijital",
    companyNameShort: "HARB!",
    taxOffice: "",
    taxNumber: "",
    mersis: "",
  },
  urls: {
    website: "https://harbidigital.com",
    blog: "",
  },
} as const
export const NAV_LINKS = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/isler", label: "İşler" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/hizmetler", label: "Hizmetler" },
  // { href: "/ekip", label: "Ekip" },
  { href: "/iletisim", label: "İletişim" },
] as const

export const SERVICES = [
  {
    id: "strategy",
    title: "STRATEJİ",
    description: "Savaş Planı Olmadan Zafer Olmaz.",
  },
  {
    id: "branding",
    title: "BRANDING",
    description: "Kaptansız Gemi Yelken Açmaz.",
  },
  {
    id: "web",
    title: "WEB DEVELOPMENT",
    description: "Dijital Gökdelenler İnşa Ediyoruz.",
  },
  {
    id: "production",
    title: "PRODUCTION",
    description: "Okutmuyoruz, İzletiyoruz.",
  },
] as const

export const STATS = [
  { value: "150+", label: "Proje" },
  { value: "98%", label: "Müşteri Memnuniyeti" },
  { value: "5x", label: "Ortalama ROI" },
  { value: "24/7", label: "Destek" },
] as const

export const BATTLE_PLAN = [
  {
    step: "01",
    title: "ANALİZ",
    description: "Masaya oturduğumuzda önce acı gerçekleri konuşuruz.",
  },
  {
    step: "02",
    title: "STRATEJİ",
    description: "Rotayı çizeriz. Hedef belli, mermiler hazır.",
  },
  {
    step: "03",
    title: "ZAFER",
    description: "Lansman ve sonrası. Rakiplere geçmiş olsun.",
  },
] as const

export const COMPARISON = {
  others: [
    '"Evet efendim"ci yaklaşım',
    "Bitmeyen revizeler",
    "Sıkıcı şablonlar",
  ],
  harbi: [
    '"Hayır" diyebilen profesyoneller',
    "Veri odaklı kararlar",
    "DOMİNASYON",
  ],
} as const
