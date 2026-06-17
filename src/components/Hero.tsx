import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
  "AI & Full Stack Developer",
  "Barclays Summer Internship Programme 2027 Selectee",
  "Building Intelligent Solutions with AI, Full Stack Development & Innovation"
];

export default function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-[100dvh] flex items-center justify-center pt-20 px-6">
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-primary font-mono tracking-widest uppercase mb-4 text-sm md:text-base">Mission Commander</h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Sumit Sinha
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
            Computer Science Engineering Student
          </p>
          
          <div className="h-16 md:h-12 mb-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTitleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-accent max-w-2xl font-mono"
              >
                {titles[currentTitleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(0,188,212,0.4)] hover:shadow-[0_0_30px_rgba(0,188,212,0.6)]"
            >
              View Projects
            </a>
            <a 
              href="https://drive.google.com/file/d/1NjbeehpsGxsn7N9H6txKOfpS4xt8w9I6/view?usp=share_link" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 bg-card border border-primary/50 text-foreground font-bold rounded-full hover:bg-primary/10 transition-colors"
            >
              Download Resume
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto px-8 py-3 bg-transparent border border-muted-foreground/50 text-muted-foreground font-bold rounded-full hover:border-foreground hover:text-foreground transition-colors"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
