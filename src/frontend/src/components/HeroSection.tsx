import { Phone } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-car-wash-dark.dim_1400x700.jpg')",
        }}
      />
      <div className="absolute inset-0 gradient-hero" />

      {/* Subtle amber vignette at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.72 0.18 52 / 0.08), transparent)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.72 0.18 52 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.18 52 / 0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-sm text-white/80 text-sm font-medium mb-6">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "oklch(0.72 0.18 52)" }}
            />
            Doorstep Car Wash Service
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-6"
        >
          Your Car Deserves
          <br />
          <span style={{ color: "oklch(0.80 0.18 52)" }}>to Sparkle</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body leading-relaxed"
        >
          Premium car washing services that restore brilliance and protect your
          investment. Drive in dirty, drive out gleaming — every single time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          <a
            href="tel:9623244475"
            data-ocid="hero.primary_button"
            className="inline-flex items-center gap-2 gradient-amber font-bold text-base px-8 py-4 rounded-xl shadow-glow hover:opacity-90 transition-all hover:scale-105"
            style={{ color: "oklch(0.10 0.015 260)" }}
          >
            <Phone className="w-5 h-5" />
            Call Now: 9623244475
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex justify-center"
        >
          <button
            type="button"
            onClick={() => scrollTo("#how-it-works")}
            className="text-white/50 hover:text-white/80 transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <svg
              role="img"
              aria-label="Scroll down"
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Scroll down</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 border-t"
        style={{
          backgroundColor: "oklch(0.08 0.02 260 / 0.85)",
          borderColor: "oklch(0.72 0.18 52 / 0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto px-4 py-4 grid grid-cols-3 gap-4">
          {[
            { value: "15K+", label: "Cars Washed" },
            { value: "6yr+", label: "Experience" },
            { value: "Doorstep", label: "Service" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display font-black text-xl md:text-2xl"
                style={{ color: "oklch(0.80 0.18 52)" }}
              >
                {stat.value}
              </div>
              <div className="text-white/50 text-xs md:text-sm font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
