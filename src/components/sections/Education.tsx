"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-24 relative bg-primary">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="space-y-4 mb-20 md:mb-24 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent font-bold">Academic Background</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Education.
          </h3>
        </motion.div>

        <motion.div
          className="relative max-w-5xl mx-auto md:mx-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start p-10 md:p-14 rounded-[2rem] bg-muted/50 border border-muted-foreground/10 hover:border-secondary/20 transition-colors relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors pointer-events-none" />
            
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
               <GraduationCap size={32} />
            </div>

            <div className="flex-1 space-y-4 z-10 w-full">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                 <div>
                   <h4 className="text-2xl font-heading font-bold text-foreground">Lovely Professional University</h4>
                   <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mt-1">B.Tech in Computer Science</p>
                 </div>
                 <span className="text-accent font-medium text-sm">Expected June 2027</span>
               </div>
               
               <p className="text-muted-foreground leading-relaxed pt-2">
                 <strong className="text-foreground font-medium">Concentrations:</strong> Cyber Security and UI/UX Designing
               </p>

               <div className="flex flex-wrap items-center gap-4 pt-4">
                 <span className="px-4 py-1.5 rounded-full bg-primary border border-secondary/20 text-secondary text-sm font-bold shadow-sm">
                   CGPA: 7.62
                 </span>
                 <span className="px-4 py-1.5 rounded-full bg-primary border border-accent/20 text-accent text-sm font-bold shadow-sm">
                   Dean’s List
                 </span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
