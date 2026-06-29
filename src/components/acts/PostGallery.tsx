import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Image as ImageIcon, Clapperboard } from "lucide-react"

export type PostGalleryItem = {
  image: string
  type: "post" | "reel"
  link: string
}

interface PostGalleryProps {
  title?: string
  subtitle?: string
  items: PostGalleryItem[]
}

export const PostGallery = ({
  title = "SOSYAL MEDYA İÇERİKLERİMİZ",
  subtitle = "Ajans içinden kareler, başarı hikâyeleri ve ilgi çekici kampanya örnekleri sosyal medya hesaplarımızda!",
  items,
}: PostGalleryProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden" id="post-gallery">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 font-plus-jakarta tracking-tight">
            {title}
          </h2>
          <div className="w-16 h-1.5 bg-[#a3e635] mx-auto mt-5 rounded-full" />
          <p className="text-neutral-500 text-base md:text-lg mt-5 max-w-xl mx-auto font-plus-jakarta">
            {subtitle}
          </p>
        </div>

        {/* Slider */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {items.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative shrink-0 basis-[55%] sm:basis-[32%] md:basis-[22%] lg:basis-[18%] aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-900 group"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  {item.type === "reel" ? (
                    <Clapperboard className="w-4 h-4 text-white" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-white" />
                  )}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Önceki"
            className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Sonraki"
            className="w-11 h-11 rounded-full bg-[#a3e635] flex items-center justify-center text-black hover:brightness-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
