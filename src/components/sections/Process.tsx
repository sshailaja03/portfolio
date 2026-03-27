"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Layers, Sparkles } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Research & Empathize",
    description: "Understanding the core problem, user needs, and business goals through data and feedback.",
    icon: <Search className="text-secondary" size={28} />
  },
  {
    id: "02",
    title: "Structure & Wireframe",
    description: "Mapping out user flows and creating low-fidelity wireframes to test layout and logic.",
    icon: <PenTool className="text-accent" size={28} />
  },
  {
    id: "03",
    title: "Design & Prototype",
    description: "Crafting high-fidelity interfaces and interactive prototypes to validate the experience.",
    icon: <Layers className="text-secondary" size={28} />
  },
  {
    id: "04",
    title: "Test & Refine",
    description: "Iterating based on user feedback and technical constraints to polish the final product.",
    icon: <Sparkles className="text-accent" size={28} />
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 relative bg-primary overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="space-y-4 mb-20 md:mb-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold">How I Work</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            A disciplined approach to design.
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg font-light">
            I believe that great design relies on clarity, structure, and continuous iteration. Here is how I turn complex problems into intuitive solutions.
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal Line connector (Desktop) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-0 w-full h-px bg-muted-foreground/20 z-0">
             <motion.div 
               className="h-full bg-secondary origin-left"
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                className="relative flex flex-col items-center lg:items-start text-center lg:text-left group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary border-2 border-muted-foreground/10 flex items-center justify-center mb-8 shadow-sm group-hover:border-secondary transition-colors relative z-10 group-hover:bg-muted/50">
                  {step.icon}
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold font-heading shadow-md">
                    {step.id}
                  </div>
                </div>

                <h4 className="text-2xl font-heading font-bold text-foreground mb-3">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
