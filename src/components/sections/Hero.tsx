"use client";

import { motion } from "framer-motion";
import { ParticleText } from "@/components/canvas/ParticleText";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Soft glowing ambient light behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-sm font-medium tracking-wide"
          >
            Available for new opportunities
          </motion.div>

          <motion.div 
            className="w-full max-w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <ParticleText 
              text="Shailaja Singh" 
              className="w-full h-[80px] md:h-[120px] lg:h-[140px]" 
            />
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            UI/UX designer and problem solver crafting clean, intuitive, visually rich digital experiences.
          </motion.p>

          <motion.p
            className="text-base text-muted-foreground max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            I blend technical precision with creative empathy to build products that feel as good as they look.
          </motion.p>

          <motion.div
            className="pt-8 flex flex-col sm:flex-row flex-wrap items-center md:items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.a 
              href="/cv/12321463_Shailaja(GENERIC%20SDE).pdf" 
              download="Shailaja_Singh_CV.pdf"
              className="px-8 py-4 bg-transparent border border-muted-foreground/30 text-foreground rounded-full font-medium tracking-wide hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(217,122,111,0.2)] transition-all flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Download CV
                <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </motion.a>
            <a
              href="#projects"
              className="px-8 py-4 bg-secondary text-primary-foreground rounded-full font-medium tracking-wide hover:bg-secondary/90 hover:shadow-[0_0_20px_rgba(124,154,146,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border border-muted-foreground/30 text-foreground rounded-full font-medium tracking-wide hover:border-secondary hover:text-secondary hover:shadow-[0_0_20px_rgba(124,154,146,0.2)] transition-all hover:scale-105 active:scale-95"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
