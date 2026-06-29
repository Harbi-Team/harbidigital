import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { Act1Intro } from "@/components/acts/Act1Intro"
import { LogoMarquee } from "@/components/acts/LogoMarquee"
import { Act1Mission } from "@/components/acts/Act1Mission"
import { Act2Problem } from "@/components/acts/Act2Problem"
import { Act5Proof } from "@/components/acts/Act5Proof"
import { Act6Plan } from "@/components/acts/Act6Plan"
import { Act7Difference } from "@/components/acts/Act7Difference"
import { Act9Cost } from "@/components/acts/Act9Cost"
import { PostGallery, type PostGalleryItem } from "@/components/acts/PostGallery"
import socialPosts from "@/data/social-posts.json"

const Index = () => {
  return (
    <div className="relative">
      {/* Header */}
      <Header />

      {/* Floating Contact Button */}
      <FloatingContactButton />

      {/* Main Content - 10 Act Scroll Experience */}
      <main className="relative z-10">
        <Act1Intro />
        <LogoMarquee />
        <Act1Mission />
        <Act2Problem />
        <Act7Difference />
        <Act6Plan />
        <PostGallery items={socialPosts as PostGalleryItem[]} />
        <Act9Cost />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Index
