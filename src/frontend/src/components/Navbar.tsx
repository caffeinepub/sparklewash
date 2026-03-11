import { Button } from "@/components/ui/button";
import { Loader2, LogIn, LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { login, clear, isLoggingIn, isLoginSuccess, isInitializing } =
    useInternetIdentity();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Reviews", href: "#reviews" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled
          ? "oklch(0.10 0.015 260 / 0.97)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : undefined,
        borderBottom: isScrolled
          ? "1px solid oklch(0.72 0.18 52 / 0.15)"
          : undefined,
      }}
    >
      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        <a
          href="/"
          className="flex items-center gap-2 font-display font-bold text-xl text-white"
        >
          <img
            src="/assets/uploads/IMG_20260306_091441_995-1.webp"
            alt="PARMATMA EK CAR WASH Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          PARMATMA EK CAR WASH
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => scrollTo(link.href)}
                data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "-")}.link`}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {isInitializing ? (
            <Loader2 className="w-4 h-4 animate-spin text-white/50" />
          ) : isLoginSuccess ? (
            <div className="flex items-center gap-2">
              <a
                href="/admin"
                className="text-sm font-medium text-white/70 hover:text-white underline underline-offset-2 transition-colors"
              >
                Admin
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4 mr-1" />
              )}
              Login
            </Button>
          )}
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: "oklch(0.10 0.015 260)",
              borderBottom: "1px solid oklch(0.72 0.18 52 / 0.15)",
            }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-2 text-white/70 font-medium hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div
                className="flex gap-2 pt-2"
                style={{ borderTop: "1px solid oklch(0.72 0.18 52 / 0.15)" }}
              >
                {!isLoginSuccess && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={login}
                    disabled={isLoggingIn}
                    className="flex-1 border-white/20 text-white bg-transparent hover:bg-white/10"
                  >
                    {isLoggingIn ? (
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <LogIn className="w-4 h-4 mr-1" />
                    )}
                    Login
                  </Button>
                )}
                {isLoginSuccess && (
                  <>
                    <a href="/admin" className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-white/20 text-white bg-transparent"
                      >
                        Admin
                      </Button>
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clear}
                      className="flex-1 text-white/70 hover:text-white"
                    >
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
