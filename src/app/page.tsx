import { Hero, Pricing } from '@/components/sections/home'

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
    </>
  )
}