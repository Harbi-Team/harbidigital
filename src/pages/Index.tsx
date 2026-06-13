import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContactButton } from "@/components/layout/FloatingContactButton"
import { Act1Intro } from "@/components/acts/Act1Intro"
import { Act2Problem } from "@/components/acts/Act2Problem"
import { Act4Arsenal } from "@/components/acts/Act4Arsenal"
import { Act5Proof } from "@/components/acts/Act5Proof"
import { Act6Plan } from "@/components/acts/Act6Plan"
import { Act7Difference } from "@/components/acts/Act7Difference"
import { Act9Cost } from "@/components/acts/Act9Cost"

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
        <Act2Problem />
        <Act4Arsenal />
        <Act5Proof />
        <Act7Difference />
        <Act6Plan />
        <Act9Cost />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Index
