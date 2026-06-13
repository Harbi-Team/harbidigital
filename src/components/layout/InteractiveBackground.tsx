import { useEffect, useRef } from "react"

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const targetMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system
    class Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      vx: number
      vy: number
      size: number
      opacity: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.vx = 0
        this.vy = 0
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update(mouseX: number, mouseY: number) {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          this.vx -= Math.cos(angle) * force * 2
          this.vy -= Math.sin(angle) * force * 2
        }

        // Return to base position
        this.vx += (this.baseX - this.x) * 0.05
        this.vy += (this.baseY - this.y) * 0.05

        // Apply velocity with damping
        this.vx *= 0.95
        this.vy *= 0.95

        this.x += this.vx
        this.y += this.vy
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(163, 230, 53, ${this.opacity * 0.25})`
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 150

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particles.push(new Particle(x, y))
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      targetMousePos.current.x = e.clientX
      targetMousePos.current.y = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      // Smooth mouse position
      mousePos.current.x +=
        (targetMousePos.current.x - mousePos.current.x) * 0.1
      mousePos.current.y +=
        (targetMousePos.current.y - mousePos.current.y) * 0.1

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mousePos.current.x, mousePos.current.y)
        particle.draw(ctx)
      })

      // Draw connections
      ctx.strokeStyle = "rgba(163, 230, 53, 0.08)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  )
}
