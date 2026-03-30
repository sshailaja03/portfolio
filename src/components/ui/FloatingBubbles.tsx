"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BubbleProps {
  color: string;
  size: number;
}

const Bubble = ({ color, size }: BubbleProps) => {
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setInitialPos({
      x: Math.random() * 100,
      y: Math.random() * 100,
    });
    setTargetPos({
      x: Math.random() * 100,
      y: Math.random() * 100,
    });
    setDuration(15 + Math.random() * 20);
  }, []);

  if (duration === 0) return null;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none blur-[2px] border border-white/10"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${initialPos.x}%`,
        top: `${initialPos.y}%`,
        opacity: 0.4,
      }}
      animate={{
        left: [`${initialPos.x}%`, `${targetPos.x}%`, `${100 - initialPos.x}%`],
        top: [`${initialPos.y}%`, `${targetPos.y}%`, `${100 - initialPos.y}%`],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    />
  );
};

export function FloatingBubbles() {
  const bubbles = [
    { color: "var(--color-secondary)", size: 40 },
    { color: "var(--color-accent)", size: 60 },
    { color: "var(--color-secondary)", size: 30 },
    { color: "var(--color-accent)", size: 50 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble, i) => (
        <Bubble key={i} color={bubble.color} size={bubble.size} />
      ))}
    </div>
  );
}
