import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Maruti Swift Owner",
    initials: "RK",
    rating: 5,
    review:
      "PARMATMA EK CAR WASH ne meri gaadi bilkul naya jaisa kar di. Service bahut achhi hai aur staff bahut professional hai. Main zaroor wapas aaunga!",
    accent: "oklch(0.72 0.18 52)",
  },
  {
    name: "Sunita Sharma",
    role: "Honda City Driver",
    initials: "SS",
    rating: 5,
    review:
      "Bahut badhiya service! Meri family ki car ab chamakti hai. Price bhi reasonable hai. Highly recommend karti hoon sabko.",
    accent: "oklch(0.75 0.16 45)",
  },
  {
    name: "Vikram Singh",
    role: "Innova Owner",
    initials: "VS",
    rating: 5,
    review:
      "Main kaafi time se yahan aa raha hoon. Har baar car ekdum perfect clean hoti hai. Best car wash in the area!",
    accent: "oklch(0.68 0.20 55)",
  },
  {
    name: "Priya Patel",
    role: "Hyundai i20 Owner",
    initials: "PP",
    rating: 5,
    review:
      "Ghar pe aakar gaadi saaf karte hain — itni convenient service pehle kabhi nahi mili! Foam wash ek dum zabardast tha. 100% recommend!",
    accent: "oklch(0.72 0.18 52)",
  },
  {
    name: "Anil Deshmukh",
    role: "Tata Nexon Owner",
    initials: "AD",
    rating: 5,
    review:
      "6 saal se yeh log kaam kar rahe hain aur quality mein koi compromise nahi. Interior vacuum aur dashboard wax ke baad gaadi bilkul showroom jaisi lagi.",
    accent: "oklch(0.75 0.16 45)",
  },
  {
    name: "Meena Joshi",
    role: "Wagon R Owner",
    initials: "MJ",
    rating: 5,
    review:
      "Staff bahut polite aur mehnat karne wala hai. Outer wax ke baad gaadi itni chamki ki padosi bhi poochne lage! Bahut shukriya PARMATMA EK CAR WASH.",
    accent: "oklch(0.68 0.20 55)",
  },
  {
    name: "Suresh Nair",
    role: "Honda Jazz Owner",
    initials: "SN",
    rating: 5,
    review:
      "Doorstep service ka matlab hai time aur petrol dono bachte hain. Price ekdum sahi hai. Mere poore mohalle mein yahi sab use karte hain ab.",
    accent: "oklch(0.72 0.18 52)",
  },
];

const STAR_INDICES = [0, 1, 2, 3, 4] as const;

export function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.10 0.015 260)" }}
    >
      {/* Subtle amber glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.72 0.18 52) 0%, transparent 70%)",
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
            className="mb-4 border-0 font-semibold px-4 py-1"
            style={{
              background: "oklch(0.72 0.18 52)",
              color: "oklch(0.10 0.015 260)",
            }}
          >
            Customer Love
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight mb-4">
            What Our Customers
            <span style={{ color: "oklch(0.80 0.18 52)" }}> Are Saying</span>
          </h2>
          <p className="text-dark-muted text-lg max-w-xl mx-auto font-body">
            Don't take our word for it — here's what real PARMATMA EK CAR WASH
            customers experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              data-ocid={`testimonials.item.${index + 1}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-8 relative transition-shadow border"
              style={{
                backgroundColor: "oklch(0.14 0.022 260)",
                borderColor: "oklch(0.72 0.18 52 / 0.15)",
                boxShadow: "0 4px 24px oklch(0.04 0.01 260 / 0.5)",
              }}
            >
              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px oklch(0.72 0.18 52 / 0.35)",
                }}
              />

              <Quote
                className="absolute top-6 right-6 w-8 h-8 opacity-10"
                style={{ color: t.accent }}
              />

              <div className="flex gap-1 mb-5">
                {STAR_INDICES.slice(0, t.rating).map((starIdx) => (
                  <Star
                    key={starIdx}
                    className="w-4 h-4 fill-current"
                    style={{ color: "oklch(0.80 0.18 52)" }}
                  />
                ))}
              </div>

              <p className="text-white/70 font-body text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.review}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.62 0.20 38))",
                    color: "oklch(0.10 0.015 260)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white">
                    {t.name}
                  </div>
                  <div className="text-dark-muted text-xs font-body">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
