import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: "Barclays Summer Internship Programme 2027",
    role: "Selectee",
    date: "Selected through Hack-O-Hire",
    description: "Secured placement in the 2027 summer internship programme through outstanding performance in the Hack-O-Hire finale.",
    highlight: true
  },
  {
    title: "Barclays Hack-O-Hire 2026",
    role: "Finalist (Team Neural Nexus)",
    date: "Reached Finale",
    description: "Competed at Barclays Chennai Campus, building innovative solutions and demonstrating technical excellence under pressure.",
    highlight: true
  },
  {
    title: "IEEE CS SB SRMIST",
    role: "Technical Member",
    date: "March 2026 - Present",
    description: "Coordinated technical sessions and ensured smooth on-ground event operations. Contributed to building a strong technical community."
  },
  {
    title: "SNS Polycraft India",
    role: "UI/UX Designer",
    date: "Feb 2026 - Present",
    description: "Refined navigation elements and developed process flow diagrams to enhance user experience and product usability."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4 drop-shadow-[0_0_10px_rgba(0,188,212,0.5)]">Saturn // Mission Logs</h2>
        <p className="text-muted-foreground">Historical records of operational deployments.</p>
      </div>

      <div className="relative border-l-2 border-primary/30 ml-4 md:ml-8 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-background ${exp.highlight ? 'bg-accent shadow-[0_0_10px_#00ffff]' : 'bg-primary'}`} />
            
            <div className={`glass-panel p-6 md:p-8 rounded-2xl border ${exp.highlight ? 'border-accent/50 bg-accent/5' : 'border-primary/20 bg-card/30'} backdrop-blur-md hover:-translate-y-1 transition-transform duration-300`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">{exp.title}</h3>
                  <h4 className="text-primary font-mono mt-1">{exp.role}</h4>
                </div>
                <span className="inline-block px-3 py-1 bg-black/40 border border-primary/20 text-muted-foreground text-sm rounded-full whitespace-nowrap self-start">
                  {exp.date}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
