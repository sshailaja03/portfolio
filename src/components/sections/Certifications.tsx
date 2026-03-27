"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certs = [
  { name: "Cloud Computing", issuer: "NPTEL", link: "https://drive.google.com/file/d/16J9jBxmS7Y08gPvKhdxuAE_tQhwC98dp/view" },
  { name: "DSA Summer Bootcamp", issuer: "LPU", link: "https://drive.google.com/file/d/1udjr2BK-M0HiVilH9v_t8Z6A1Sq7XvXz/view" },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="space-y-4 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent font-bold">Continuous Learning</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Certifications.
          </h3>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert, index) => (
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="flex items-center gap-6 p-6 md:p-8 rounded-[1.5rem] bg-muted/30 border border-muted-foreground/10 hover:border-accent/30 transition-all group shadow-sm bg-primary/40 glass cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                <Award size={24} />
              </div>
              <div>
                <h4 className="text-lg font-heading font-bold text-foreground group-hover:text-accent transition-colors">{cert.name}</h4>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mt-1">{cert.issuer}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
