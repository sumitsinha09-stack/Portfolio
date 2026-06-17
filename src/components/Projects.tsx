import React from 'react';
import { motion } from 'framer-motion';
import Tilt from './Tilt';

const projects = [
  {
    title: "PDR (Paisa Do Re)",
    subtitle: "AI-Powered Alternate Credit Scoring",
    description: "Built for Barclays Hack-O-Hire 2026. B2B platform to score credit-invisible MSMEs and NTC borrowers. Uses XGBoost (AUC: 0.74), fraud detection, SHAP-based XAI for regulatory compliance.",
    tech: ["XGBoost", "SHAP", "FastAPI", "React"],
    github: "https://github.com/sumitsinha09-stack/PDR.git",
    featured: true
  },
  {
    title: "TAXISYS",
    subtitle: "Efficient Data Entry and Analysis",
    description: "Web service for real-time spreadsheet integration with automated column classification to streamline data processing workflows.",
    tech: ["Python", "SQL", "Scikit-learn", "Pandas", "React", "JavaScript"],
    github: "https://github.com/sumitsinha09-stack/TAXIYS.git",
    featured: false
  },
  {
    title: "Chennai Metro App",
    subtitle: "Urban Navigation Solution",
    description: "Metro navigation app with route planning, station info, live updates, cab integration, and emergency SOS features.",
    tech: ["React Native", "Maps API", "Node.js"],
    github: "https://github.com/sumitsinha09-stack/Chennai-Metro.git",
    featured: false
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-accent mb-4 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">Jupiter // Constructs</h2>
        <p className="text-muted-foreground">Deployed structures and engineered systems.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Tilt className={`glass-panel rounded-2xl overflow-hidden border ${project.featured ? 'border-primary shadow-[0_0_30px_rgba(0,188,212,0.15)] bg-card/60' : 'border-primary/20 bg-card/30'} backdrop-blur-xl group hover:border-primary/60 transition-all duration-300 flex flex-col h-full`}>
              <div className="p-8 flex flex-col h-full" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                <div className="mb-4" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-primary/80 font-mono text-sm mt-1">{project.subtitle}</p>
                </div>
                
                <p className="text-muted-foreground mb-6 flex-grow" style={{ transform: "translateZ(15px)" }}>
                  {project.description}
                </p>
                
                <div className="mt-auto" style={{ transform: "translateZ(25px)" }}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-black/50 border border-border rounded text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sm font-bold text-primary hover:text-accent transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                    <span>Access Repository</span>
                  </a>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
