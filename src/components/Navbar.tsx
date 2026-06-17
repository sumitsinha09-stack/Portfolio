import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 backdrop-blur-md bg-background/50 border-b border-primary/20 shadow-lg' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="text-xl font-display font-bold text-foreground relative group">
          WELCOME
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#00bcd4]" />
        </a>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <a 
              key={item.name} 
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider rounded-full"
            >
              <span className="relative z-10">{item.name}</span>
              {hoveredIndex === index && (
                <motion.span
                  layoutId="navbar-hover-pill"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full z-0 shadow-[0_0_15px_rgba(0,188,212,0.2)]"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
