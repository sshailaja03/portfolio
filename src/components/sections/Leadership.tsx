"use client";

import { motion } from "framer-motion";
import { Users, Megaphone } from "lucide-react";

export function Leadership() {
  return (
    <section id="leadership" className="py-24 relative bg-primary">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="space-y-4 mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold">Community & Impact</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Leadership & Activities.
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg font-light">
            Beyond the screen, I am passionate about mentoring others, building communities, and fostering tech ecosystems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Optimus VP */}
          <motion.div
            className="p-10 rounded-[2rem] bg-muted/50 border border-muted-foreground/10 hover:border-secondary/30 transition-colors shadow-sm relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8">
              <Users size={28} />
            </div>
            <h4 className="text-2xl font-heading font-bold text-foreground mb-2">Vice-President</h4>
            <p className="text-secondary text-sm uppercase tracking-widest font-bold mb-6">Optimus Student Organisation</p>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0" />
                <span className="leading-relaxed">Led a thriving tech community of 100+ active members.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0" />
                <span className="leading-relaxed">Hosted and organized 25+ tech-focused events and workshops.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0" />
                <span className="leading-relaxed">Mentored members in UI/UX and software development practices.</span>
              </li>
            </ul>
          </motion.div>

          {/* TA */}
          <motion.div
            className="p-10 rounded-[2rem] bg-muted/50 border border-muted-foreground/10 hover:border-accent/30 transition-colors shadow-sm relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8">
              <Megaphone size={28} />
            </div>
            <h4 className="text-2xl font-heading font-bold text-foreground mb-2">Teaching Assistant & Counselor</h4>
            <p className="text-accent text-sm uppercase tracking-widest font-bold mb-6">Batch of 2029</p>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                <span className="leading-relaxed">Mentored incoming students in core C++ programming.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                <span className="leading-relaxed">Taught foundational UI/UX design principles to beginners.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                <span className="leading-relaxed">Provided academic counseling and project guidance.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
