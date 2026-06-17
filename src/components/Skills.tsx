import React from 'react';
import { motion } from 'framer-motion';
import Tilt from './Tilt';

const skillsData = [
  {
    category: "Programming Languages",
    skills: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "Dart", "SQL"]
  },
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "React", "React Native", "Expo"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Flask", "FastAPI", "REST APIs"]
  },
  {
    category: "Mobile Development",
    skills: ["Flutter", "Android Studio"]
  },
  {
    category: "Database & Cloud",
    skills: ["Firebase", "AWS"]
  },
  {
    category: "Machine Learning & AI",
    skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "XGBoost", "CNN", "ANN", "Random Forest", "Logistic Regression", "LLMs", "Ollama", "LLaMA-3"]
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Postman", "VS Code", "Google Colab"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-accent drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] mb-4">Mars // Technical Arsenal</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Systems analysis complete. displaying loaded modules and capabilities.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillsData.map((category, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
          >
            <Tilt className="glass-panel p-6 rounded-2xl border border-primary/30 bg-card/20 backdrop-blur-md hover:bg-card/40 hover:border-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] h-full">
              <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                <h3 className="text-lg font-bold text-foreground mb-4 font-mono border-b border-primary/20 pb-2" style={{ transform: "translateZ(25px)" }}>{category.category}</h3>
                <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(15px)" }}>
                  {category.skills.map((skill, sIndex) => (
                    <span 
                      key={sIndex} 
                      className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
