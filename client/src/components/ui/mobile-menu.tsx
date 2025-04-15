import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  navLinks: { href: string; label: string }[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button 
        id="mobile-menu-button" 
        className="md:hidden w-10 h-10 flex items-center justify-center" 
        onClick={toggleMenu}
        aria-label="Open mobile menu"
      >
        <i className="fas fa-bars text-2xl"></i>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-black/95 backdrop-blur-md fixed inset-0 z-50 flex flex-col items-center justify-center space-y-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button 
              className="absolute top-6 right-6 text-3xl text-foreground"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <i className="fas fa-times"></i>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
