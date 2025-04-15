import { motion } from "framer-motion";

export default function Footer() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://github.com/", icon: "fab fa-github", label: "GitHub" },
    { href: "https://linkedin.com/", icon: "fab fa-linkedin-in", label: "LinkedIn" },
    { href: "https://leetcode.com/", icon: "fab fa-leetcode", label: "LeetCode" },
    { href: "https://twitter.com/", icon: "fab fa-twitter", label: "Twitter" },
  ];

  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a href="#" className="text-2xl font-bold font-poppins text-white">
              <span className="text-primary">H</span>arsh Nagrani
            </a>
            <p className="mt-2 text-muted-foreground">Frontend React Developer</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <a 
              href="#" 
              download="harsh-nagrani-resume.pdf"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-full transition-all text-sm inline-flex items-center"
            >
              Download CV <i className="fas fa-download ml-1"></i>
            </a>
          </motion.div>
        </div>
        
        <hr className="border-muted my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 Harsh Nagrani. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors social-icon" 
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
