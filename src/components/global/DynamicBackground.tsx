"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ParticleNetwork } from "@/components/canvas/ParticleNetwork";

export function DynamicBackground() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map scroll progress to transform values for the dynamic shapes
  // The shapes will move, rotate, and slightly scale to create a soft shifting environment
  
  // Blob 1: Secondary color (Sage Green)
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);

  // Blob 2: Accent color (Coral)
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.1]);

  // Blob 3: Primary foreground color mixed in lightly (to add depth)
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale3 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-50 pointer-events-none bg-background">
        <div className="noise" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none bg-background overflow-hidden">
      <div className="absolute inset-0 saturate-150">
        
        {/* Soft light blob 1 */}
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] rounded-full filter blur-[100px] md:blur-[140px] opacity-[0.15] dark:opacity-[0.08] mix-blend-multiply dark:mix-blend-screen transition-opacity duration-1000 will-change-transform"
          style={{
            background: 'var(--color-secondary)',
            y: y1,
            x: x1,
            rotate: rotate1,
            scale: scale1
          }}
        />

        {/* Soft light blob 2 */}
        <motion.div
          className="absolute top-[40%] right-[-10%] w-[50vw] h-[70vh] rounded-full filter blur-[120px] md:blur-[150px] opacity-[0.15] dark:opacity-[0.08] mix-blend-multiply dark:mix-blend-screen transition-opacity duration-1000 will-change-transform"
          style={{
            background: 'var(--color-accent)',
            y: y2,
            x: x2,
            rotate: rotate2,
            scale: scale2
          }}
        />

        {/* Soft light blob 3 */}
        <motion.div
          className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[50vh] rounded-full filter blur-[100px] md:blur-[130px] opacity-[0.12] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-screen transition-opacity duration-1000 will-change-transform"
          style={{
            background: 'var(--color-primary-foreground)',
            y: y3,
            x: x3,
            rotate: rotate3,
            scale: scale3
          }}
        />
      </div>

      <div className="noise" aria-hidden="true" />
      
      {/* Increased z-index locally or just keep it natural order since it mounts after background blobs */}
      <div className="absolute inset-0 mix-blend-screen dark:mix-blend-plus-lighter opacity-80 dark:opacity-100">
         <ParticleNetwork />
      </div>

      {/* Vignette to prevent hard edges on large screens and center focus */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, var(--background) 120%)"
        }}
      />
    </div>
  );
}
