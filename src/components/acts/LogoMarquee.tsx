import {
  SiMeta,
  SiGoogleads,
  SiTiktok,
  SiGoogleanalytics,
  SiGoogletagmanager,
  SiLooker,
  SiHubspot,
  SiClickup,
  SiMake,
  SiZapier,
  SiWordpress,
  SiCloudflare,
  SiDigitalocean,
  SiHostinger,
  SiFigma,
  SiCanva,
} from "react-icons/si"
import LogoLoop from "../ui/LogoLoop"

const LOGOS = [
  { name: "Meta", Icon: SiMeta },
  { name: "Google Ads", Icon: SiGoogleads },
  { name: "TikTok for Business", Icon: SiTiktok },
  { name: "Google Analytics", Icon: SiGoogleanalytics },
  { name: "Google Tag Manager", Icon: SiGoogletagmanager },
  { name: "Looker Studio", Icon: SiLooker },
  { name: "HubSpot", Icon: SiHubspot },
  { name: "ClickUp", Icon: SiClickup },
  { name: "Make", Icon: SiMake },
  { name: "Zapier", Icon: SiZapier },
  { name: "WordPress", Icon: SiWordpress },
  { name: "Cloudflare", Icon: SiCloudflare },
  { name: "DigitalOcean", Icon: SiDigitalocean },
  { name: "Hostinger", Icon: SiHostinger },
  { name: "Figma", Icon: SiFigma },
  { name: "Canva", Icon: SiCanva },
]

export const LogoMarquee = () => {
  const techLogos = LOGOS.map(({ name, Icon }) => ({
    node: (
      <div className="flex items-center gap-2 text-neutral-400 hover:text-neutral-800 transition-colors duration-500">
        <Icon className="w-6 h-6 flex-shrink-0" />
        <span className="text-sm font-semibold font-plus-jakarta whitespace-nowrap">{name}</span>
      </div>
    ),
    title: name,
  }))

  return (
    <section className="bg-white py-10 border-t border-neutral-100 overflow-hidden">
      <p className="text-center text-xs font-bold font-plus-jakarta uppercase tracking-wider text-neutral-400 mb-7">
        Kullandığımız ve entegre olduğumuz araçlar
      </p>

      <div className="relative w-full overflow-hidden">
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={24}
          gap={40}
          hoverSpeed={0}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#ffffff"
          ariaLabel="Kullandığımız ve entegre olduğumuz araçlar"
        />
      </div>
    </section>
  )
}

