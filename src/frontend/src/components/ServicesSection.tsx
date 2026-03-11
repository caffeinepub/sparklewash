import { Badge } from "@/components/ui/badge";
import { Car, Droplets, Layers, Sparkles, Wind } from "lucide-react";
import { Phone } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Droplets,
    title: "Exterior Car Cleaning",
    description:
      "Complete exterior wash removing dirt, grime, and road residue for a spotless finish.",
  },
  {
    icon: Wind,
    title: "Interior Vacuum Cleaning",
    description:
      "Deep vacuum of seats, carpets, and floor mats leaving the cabin fresh and clean.",
  },
  {
    icon: Sparkles,
    title: "Dashboard & Interior Wax",
    description:
      "Premium wax treatment for dashboard and interior surfaces with a lasting shine.",
  },
  {
    icon: Layers,
    title: "Outer Wax",
    description:
      "Protective wax coating on exterior paint for gloss, protection, and water repellency.",
  },
  {
    icon: Car,
    title: "Foam Wash",
    description:
      "High-foam pre-soak wash that safely lifts stubborn dirt before the final rinse.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            className="mb-4 border font-semibold px-4 py-1"
            style={{
              background: "oklch(0.72 0.18 52 / 0.15)",
              borderColor: "oklch(0.72 0.18 52 / 0.35)",
              color: "oklch(0.80 0.18 52)",
            }}
          >
            What We Offer
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground tracking-tight mb-4">
            Our <span style={{ color: "oklch(0.80 0.18 52)" }}>Services</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-base md:text-lg">
            Professional doorstep car care — we come to you, wherever you are.
          </p>
        </motion.div>

        <div
          data-ocid="services.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                data-ocid={`services.item.${index + 1}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border p-7 flex flex-col gap-4 transition-shadow bg-card"
                style={{ borderColor: "oklch(0.72 0.18 52 / 0.15)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "oklch(0.72 0.18 52 / 0.15)",
                    boxShadow: "0 0 0 1px oklch(0.72 0.18 52 / 0.25)",
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: "oklch(0.80 0.18 52)" }}
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href="tel:9623244475"
            data-ocid="services.primary_button"
            className="inline-flex items-center gap-3 font-bold text-base px-10 py-4 rounded-xl shadow-glow hover:opacity-90 transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.65 0.20 38))",
              color: "oklch(0.10 0.015 260)",
            }}
          >
            <Phone className="w-5 h-5" />
            Call to Book: 9623244475
          </a>
        </motion.div>
      </div>
    </section>
  );
}
