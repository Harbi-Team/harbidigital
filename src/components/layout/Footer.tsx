import { useContactModal } from "@/contexts/ContactModalContext"
import footerData from "@/data/footer.json"

const TEAM_AVATARS = footerData.avatars

export const Footer = () => {
  const { openModal } = useContactModal()

  return (
    <footer className="bg-white px-1">
      {/* Card with white 8px border */}
      <div
        className="relative overflow-hidden w-full min-h-[100vh] flex flex-col"
        style={{
          border: "8px solid white",
          borderRadius: "28px",
          backgroundColor: "rgb(0,0,0)",
          outline: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {/* Lime-green radial gradient bg from top-left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(100% 100% at 0% 0%, rgb(194,247,0) 0%, rgb(0,0,0) 100%)",
            WebkitMask: "radial-gradient(125% 100% at 0% 0%, black 0%, rgba(0,0,0,0.22) 88%, transparent 100%)",
            mask: "radial-gradient(125% 100% at 0% 0%, black 0%, rgba(0,0,0,0.22) 88%, transparent 100%)",
          }}
        />

        {/* Diagonal light ray stripes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(white 0%, white 84%, transparent 100%)",
              WebkitMask: "linear-gradient(90deg, transparent 0%, black 20%, transparent 36%, black 55%, rgba(0,0,0,0.13) 67%, black 78%, transparent 97%)",
              mask: "linear-gradient(90deg, transparent 0%, black 20%, transparent 36%, black 55%, rgba(0,0,0,0.13) 67%, black 78%, transparent 97%)",
              opacity: 0.05,
              transform: "skewX(45deg)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(white 0%, white 67%, transparent 100%)",
              WebkitMask: "linear-gradient(90deg, transparent 10%, black 20%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.42) 40%, black 49%, rgba(0,0,0,0.27) 55%, rgba(0,0,0,0.13) 78%, black 89%, transparent 97%)",
              mask: "linear-gradient(90deg, transparent 10%, black 20%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.42) 40%, black 49%, rgba(0,0,0,0.27) 55%, rgba(0,0,0,0.13) 78%, black 89%, transparent 97%)",
              opacity: 0.05,
              transform: "skewX(45deg)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center flex-1 px-8 md:px-16 pt-32 pb-8 justify-between">

          {/* CTA heading */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-plus-jakarta text-center leading-tight">
            <span className="text-white">Hemen </span>
            <span style={{ color: "rgba(255,255,255,0.45)" }}>Planla</span>
          </h2>

          <p className="text-white/60 text-base md:text-lg font-plus-jakarta text-center max-w-md leading-relaxed mb-8">
            Markanıza özel çözümler geliştirerek işletmenizi büyütmeye hazır mısınız?
          </p>

          {/* Lime green pill wrapper → black button */}
          <div
            className="p-[5px]"
            style={{ background: "rgb(194,247,0)", borderRadius: "90px" }}
          >
            <button
              onClick={openModal}
              className="font-plus-jakarta font-bold text-sm text-white flex items-center gap-2.5 px-6 py-3"
              style={{
                background: "black",
                borderRadius: "80px",
                boxShadow: "rgba(0,0,0,0.18) 0px 24px 74px -2.5px, black 0px -16px 48px 0px inset",
              }}
            >
              Görüşme Planla
              <svg viewBox="0 0 256 256" className="w-4 h-4 fill-white opacity-50 flex-shrink-0">
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-38.34-85.66a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L116,164.69l42.34-42.35A8,8,0,0,1,169.66,122.34Z" />
              </svg>
            </button>
          </div>

          {/* Team avatars */}
          <div className="flex mt-20">
            {TEAM_AVATARS.map((url, i) => (
              <div
                key={i}
                className="relative flex-shrink-0"
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: i === 0 ? 0 : -20,
                  zIndex: TEAM_AVATARS.length - i,
                }}
              >
                <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{ border: "3px solid white", boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px" }}
                >
                  <img
                    src={url}
                    alt={`Ekip ${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar: copyright + social icons */}
          <div
            className="w-full pt-5 flex items-center justify-between flex-wrap gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.45)" }}
          >
            <p className="text-white text-sm font-plus-jakarta">
              © Designed by{" "}
              <span style={{ color: "rgb(194,247,0)" }}>HARB! DIGITAL</span>
              , {new Date().getFullYear()}
            </p>

            <div className="flex items-center gap-2">
              {/* @ email */}
              <a
                href="mailto:harbidigital34@gmail.com"
                aria-label="E-posta"
                className="flex items-center justify-center transition-opacity hover:opacity-80"
                style={{
                  width: 36, height: 36,
                  borderRadius: "154px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <svg viewBox="0 0 256 256" className="w-[15px] h-[15px] fill-current">
                  <path d="M128,24a104,104,0,0,0,0,208c21.51,0,44.1-6.48,60.43-17.33a8,8,0,0,0-8.86-13.33C166,210.38,146.21,216,128,216a88,88,0,1,1,88-88c0,26.45-10.88,32-20,32s-20-5.55-20-32V88a8,8,0,0,0-16,0v4.26a48,48,0,1,0,5.93,65.1c6,12,16.35,18.64,30.07,18.64,22.54,0,36-17.94,36-48A104.11,104.11,0,0,0,128,24Zm0,136a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="#"
                aria-label="TikTok"
                className="flex items-center justify-center transition-opacity hover:opacity-80"
                style={{
                  width: 36, height: 36,
                  borderRadius: "154px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <svg viewBox="0 0 256 256" className="w-[15px] h-[15px] fill-current">
                  <path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex items-center justify-center transition-opacity hover:opacity-80"
                style={{
                  width: 36, height: 36,
                  borderRadius: "154px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <svg viewBox="0 0 256 256" className="w-[15px] h-[15px] fill-current">
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/harbidigitall/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center transition-opacity hover:opacity-80"
                style={{
                  width: 36, height: 36,
                  borderRadius: "154px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <svg viewBox="0 0 256 256" className="w-[15px] h-[15px] fill-current">
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
