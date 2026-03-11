import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { Navbar } from "../components/Navbar";
import { ServicesSection } from "../components/ServicesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
