import { Badge } from "@/components/ui/badge";
import { Phone, SprayCan, Star } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Call Us",
    description:
      "One tap is all it takes. Call 9623244475 and our team will quickly assist you with timings and any queries you have.",
  },
  {
    icon: SprayCan,
    number: "02",
    title: "Drive In",
    description:
      "Bring your vehicle to PARMATMA EK CAR WASH at your preferred time. Our expert team is ready and waiting.",
  },
  {
    icon: Star,
    number: "03",
    title: "Drive Away Sparkling",
    description:
      "In no time your car will be immaculate — looking and smelling better than the day you bought it.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.12 0.02 260)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.72 0.18 52) 0%, transparent 55%), radial-gradient(circle at 80% 50%, oklch(0.62 0.18 38) 0%, transparent 55%)",
        }}
      />

      {/* Dark car detail image as subtle background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('/assets/generated/car-detail-dark.dim_800x500.jpg')",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            className="mb-4 border-0 font-semibold px-4 py-1 text-foreground"
            style={{
              background: "oklch(0.72 0.18 52)",
              color: "oklch(0.10 0.015 260)",
            }}
          >
            Simple Process
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-dark-muted text-lg max-w-xl mx-auto font-body">
            Three effortless steps stand between you and a spotless car.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px opacity-30"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.72 0.18 52), transparent)",
            }}
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.62 0.20 38))",
                    boxShadow: "0 0 40px oklch(0.72 0.18 52 / 0.35)",
                  }}
                >
                  <step.icon
                    className="w-9 h-9"
                    style={{ color: "oklch(0.10 0.015 260)" }}
                  />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "oklch(0.10 0.015 260)",
                    border: "1px solid oklch(0.72 0.18 52 / 0.4)",
                  }}
                >
                  <span
                    className="font-display font-black text-xs"
                    style={{ color: "oklch(0.72 0.18 52)" }}
                  >
                    {index + 1}
                  </span>
                </div>
              </div>

              <div
                className="font-display font-black text-6xl leading-none mb-4 select-none"
                style={{ color: "oklch(0.72 0.18 52 / 0.10)" }}
              >
                {step.number}
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-3">
                {step.title}
              </h3>
              <p className="text-dark-muted font-body text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
