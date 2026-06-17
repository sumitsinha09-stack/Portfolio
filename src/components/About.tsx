import React from 'react';
import { motion } from 'framer-motion';
import profilePhoto from "@assets/profile_photo.jpg";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 md:p-12 border border-primary/20 bg-card/30 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center relative z-10">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary relative z-10">
                <img 
                  src={profilePhoto} 
                  alt="Sumit Sinha" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 drop-shadow-[0_0_10px_rgba(0,188,212,0.5)]">Earth // About</h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                B.Tech CSE student at SRM University. Strong foundation in C, C++, Java, Python, JavaScript, TypeScript. Passionate about AI, Machine Learning, Full Stack Development, Mobile Development, and Cloud Technologies.
              </p>
              <p>
                Barclays Hack-O-Hire 2026 Finalist and member of Team Neural Nexus. Dedicated to building intelligent solutions and pushing the boundaries of what's possible.
              </p>
              
              <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-primary/30">
                <h3 className="text-xl text-foreground font-bold mb-2">Education</h3>
                <p className="text-primary font-mono">SRMIST, B.Tech in Computer Science Engineering</p>
                <p className="text-sm">May 2024 - Expected May 2028</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
