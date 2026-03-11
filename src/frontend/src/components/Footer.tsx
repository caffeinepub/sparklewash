import { Clock, Droplets, ExternalLink, MapPin, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      id="contact"
      className="font-body"
      style={{
        backgroundColor: "oklch(0.08 0.015 260)",
        borderTop: "1px solid oklch(0.72 0.18 52 / 0.15)",
        color: "oklch(0.65 0.03 240)",
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-2xl text-white mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.62 0.20 38))",
                }}
              >
                <Droplets
                  className="w-5 h-5"
                  style={{ color: "oklch(0.10 0.015 260)" }}
                />
              </div>
              PARMATMA EK CAR WASH
            </div>
            <p
              style={{ color: "oklch(0.50 0.03 240)" }}
              className="text-sm leading-relaxed max-w-xs"
            >
              Premium car care services delivered with precision and passion.
              Your vehicle deserves nothing but the best.
            </p>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-4">
              Find Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.72 0.18 52)" }}
                />
                <span style={{ color: "oklch(0.55 0.03 240)" }}>
                  123 Clean St, Cartown, CT 06001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.72 0.18 52)" }}
                />
                <a
                  href="tel:9623244475"
                  style={{ color: "oklch(0.55 0.03 240)" }}
                  className="hover:text-white transition-colors"
                >
                  9623244475
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-4">
              Hours
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.72 0.18 52)" }}
                />
                <div style={{ color: "oklch(0.55 0.03 240)" }}>
                  <div>Every Day: 8am – 6pm</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid oklch(0.72 0.18 52 / 0.10)",
            color: "oklch(0.40 0.02 240)",
          }}
        >
          <span>© {year} PARMATMA EK CAR WASH. All rights reserved.</span>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            Built with ❤️ using caffeine.ai
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
