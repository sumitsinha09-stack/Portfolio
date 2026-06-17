import React from 'react';
import { motion } from 'framer-motion';
import Tilt from './Tilt';

const certs = [
  {
    title: "Flutter & Dart",
    subtitle: "App Development Certification",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    link: "https://drive.google.com/file/d/1hupzfQppxoQtxo2cj1djoQ9SgXFRzSof/view?usp=share_link"
  },
  {
    title: "Techfest 2024–2025",
    subtitle: "Won First Prize in TechKnow 2024–2025 at SRM Institute of Science and Technology for developing an RFID-Based Toll Gate System.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    link: "https://www.linkedin.com/posts/sumit-sinha-0b789a279_iot-srmist-nanotechnology-activity-7328328057235152896-0cg_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEPwzQsBZlAy3m6QF695dpJo0In4sLsZCFs"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">Venus // Credentials</h2>
        <p className="text-muted-foreground">Verified operational proficiencies.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {certs.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Tilt className="h-full">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-6 p-6 rounded-2xl glass-panel bg-card/40 border border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,188,212,0.15)] transition-all cursor-pointer flex h-full"
                style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30" style={{ transform: "translateZ(30px)" }}>
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cert.icon} />
                  </svg>
                </div>
                <div style={{ transform: "translateZ(25px)" }}>
                  <h3 className="font-bold text-lg text-foreground">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{cert.subtitle}</p>
                </div>
              </a>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
