"use client";

import { motion } from "framer-motion";

const uxSkills = [
  "UI/UX Fundamentals",
  "Wireframing",
  "Prototyping",
  "Interaction Design",
  "User Research",
  "Design Systems",
  "Responsive Design",
  "Accessibility Awareness",
];

const techSkills = [
  "C++",
  "Python",
  "JavaScript",
  "HTML/CSS",
  "Kotlin",
  "SQL",
  "Android Studio",
  "Git",
  "Bootstrap",
  "Postman",
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="space-y-4 mb-20 md:mb-24 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent font-bold">Toolkit</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Skills & Technologies.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* UX/UI Skills */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-secondary flex-1 opacity-20" />
              <h4 className="text-xl font-heading font-bold text-secondary">Design & Research</h4>
              <div className="h-px bg-secondary flex-1 opacity-20 md:hidden" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              {uxSkills.map((skill, index) => (
                <motion.div 
                  key={skill}
                  className="px-5 py-2.5 rounded-full border border-muted-foreground/20 bg-muted/30 text-foreground font-medium text-sm hover:border-secondary transition-colors hover:bg-secondary/5 cursor-default box-border shadow-sm hover:shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-accent flex-1 opacity-20 md:hidden" />
              <h4 className="text-xl font-heading font-bold text-accent">Engineering & Dev</h4>
              <div className="h-px bg-accent flex-1 opacity-20" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              {techSkills.map((skill, index) => (
                <motion.div 
                  key={skill}
                  className="px-5 py-2.5 rounded-full border border-muted-foreground/20 bg-primary/50 text-foreground font-medium text-sm hover:border-accent transition-colors hover:bg-accent/5 cursor-default glass shadow-sm hover:shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
