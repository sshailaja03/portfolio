"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  delay: number;
  ease: number;
}

interface ParticleTextProps {
  text: string;
  className?: string;
}

export function ParticleText({ text, className = "" }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 80 };

    const init = () => {
      if (!canvasRef.current || !containerRef.current || !ctx) return;
      
      // Wait for fonts to be ready
      document.fonts.ready.then(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, rect.width, rect.height);
        
        const isMobile = window.innerWidth < 768;
        
        // Dynamically compute font size to fit container width
        // Adjust these ratios based on the text length and desired layout
        let fontSize = Math.min(rect.width / (text.length * 0.55), 140);
        if (isMobile) {
          fontSize = Math.min(rect.width / (text.length * 0.6), 70);
        }

        // Use Satoshi font explicitly as requested
        const fontFamily = '"Satoshi", system-ui, sans-serif';
        
        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = "white"; // Solid color to easily read alpha
        
        ctx.textBaseline = "middle";
        
        if (isMobile) {
          ctx.textAlign = "center";
          ctx.fillText(text, rect.width / 2, rect.height / 2);
        } else {
          ctx.textAlign = "left";
          // offset to counter any natural left padding in the font geometry to align flush
          const metrics = ctx.measureText(text);
          ctx.fillText(text, Math.abs(metrics.actualBoundingBoxLeft || 0), rect.height / 2);
        }

        // Scan pixels
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        ctx.clearRect(0, 0, rect.width, rect.height);

        particles = [];
        
        // Use current theme to set colors
        const isDark = resolvedTheme === "dark" || document.documentElement.classList.contains("dark");
        // Primary and secondary accent colors for particles
        // Neon purple for dark theme, dark purple for light theme
        const primaryColor = isDark ? "#b026ff" : "#4a0080"; 
        const accentColor = isDark ? "#d942ff" : "#2f0052";

        // Adjusted step for balanced particle density
        const step = isMobile ? Math.floor(3 * dpr) : Math.floor(4 * dpr);
        
        for (let y = 0; y < canvas.height; y += step) {
          for (let x = 0; x < canvas.width; x += step) {
            const index = (y * canvas.width + x) * 4;
            const alpha = data[index + 3];
            
            if (alpha > 128) {
              const targetX = x / dpr;
              const targetY = y / dpr;
              
              // Initial dispersed state
              const originX = Math.random() * rect.width;
              // Add slight bias towards the top/bottom for cinematic gathering
              const originY = Math.random() > 0.5 ? Math.random() * -100 : rect.height + Math.random() * 100;
              
              const color = Math.random() > 0.4 ? primaryColor : accentColor;

              particles.push({
                x: originX,
                y: originY,
                originX,
                originY,
                targetX,
                targetY,
                vx: 0,
                vy: 0,
                color,
                // Balanced particle sizes for elegant text formation
                size: Math.random() * 1.4 + 1.0,
                delay: Math.random() * 40, // Stagger effect
                ease: 0.04 + Math.random() * 0.04,
              });
            }
          }
        }
      });
    };

    const animate = () => {
      if (!ctx || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      particles.forEach((p) => {
        if (reducedMotion) {
          p.x = p.targetX;
          p.y = p.targetY;
        } else {
          if (p.delay > 0) {
            p.delay--;
            // Organic floating while dispersed
            p.x += Math.sin(Date.now() * 0.001 + p.originX) * 0.5;
            p.y += Math.cos(Date.now() * 0.001 + p.originY) * 0.5;
          } else {
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            p.x += dx * p.ease;
            p.y += dy * p.ease;

            // Hover interactions
            const mdx = mouse.x - p.x;
            const mdy = mouse.y - p.y;
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mouseDist < mouse.radius) {
              const force = (mouse.radius - mouseDist) / mouse.radius;
              const angle = Math.atan2(mdy, mdx);
              p.x -= Math.cos(angle) * force * 5;
              p.y -= Math.sin(angle) * force * 5;
            } else if (dist < 0.5 && Math.random() > 0.98) {
              // Subtle shimmer/jitter when settled
              p.x += (Math.random() - 0.5) * 1;
              p.y += (Math.random() - 0.5) * 1;
            }
          }
        }

        ctx.fillStyle = p.color;
        // Optimization: only add shadow to a few particles to keep FPS high
        if (p.size > 1.5 && !reducedMotion) {
          ctx.shadowBlur = p.size;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Small delay to ensure container size is final
    const timeoutId = setTimeout(() => {
      init();
      animate();
    }, 100);

    const handleResize = () => {
      clearTimeout(timeoutId);
      setTimeout(init, 300); // Debounce resize
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [text, resolvedTheme, reducedMotion]);

  // Use `mounted` to defer reading document to avoid React Hydration mismatch
  const isDarkCanvas = mounted && (resolvedTheme === "dark" || document.documentElement.classList.contains("dark"));

  return (
    <div 
      ref={containerRef} 
      className={`relative flex items-center justify-center font-heading ${className}`}
    >
      <h1 className="sr-only font-heading font-bold">{text}</h1>
      <canvas
        ref={canvasRef}
        className="block touch-none"
        style={{
          filter: isDarkCanvas
            ? "drop-shadow(0 0 16px rgba(176, 38, 255, 0.6)) drop-shadow(0 0 32px rgba(217, 66, 255, 0.3))"
            : "drop-shadow(0 0 12px rgba(74, 0, 128, 0.4))",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
