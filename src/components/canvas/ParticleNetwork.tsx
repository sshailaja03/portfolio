"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleLayerProps {
  count: number;
  size: number;
  color: string;
  baseOpacity: number;
  speed: { x: number; y: number };
  radius: number;
  mouseFollowSpeed?: number;
  scrollRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

function ParticleLayer({ count, size, color, baseOpacity, speed, radius, mouseFollowSpeed = 0.02, scrollRef, reducedMotion }: ParticleLayerProps) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * radius;
    }
    return positions;
  }, [count, radius]);

  const { pointer, viewport } = useThree();

  useFrame((state) => {
    if (points.current) {
      // Gentle global rotation
      const timeMultiplier = reducedMotion ? 0.3 : 1.0;
      points.current.rotation.x = state.clock.elapsedTime * speed.x * timeMultiplier;
      points.current.rotation.y = state.clock.elapsedTime * speed.y * timeMultiplier;
      
      // Scroll-based parallax on the entire particle layer
      // Shifts particles slightly upwards as user scrolls downwards
      points.current.position.y = -scrollRef.current * 4; // Shift up to 4 units

      // Gentle parallax effect on mouse move if reduced motion is false
      if (!reducedMotion) {
        const targetX = (pointer.x * viewport.width) / 10;
        const targetY = (pointer.y * viewport.height) / 10;
        points.current.position.x += (targetX - points.current.position.x) * mouseFollowSpeed;
        // Combine mouse follow with scroll parallax
        points.current.position.y += (targetY - (points.current.position.y + scrollRef.current * 4)) * mouseFollowSpeed;
      }
    }

    // Dynamic opacity based on scroll: bright inside hero, darker in content sections
    if (material.current) {
      // Fade out slightly as we scroll down to let content breathe
      const targetOpacity = baseOpacity * (1 - scrollRef.current * 0.5);
      material.current.opacity += (targetOpacity - material.current.opacity) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        size={size}
        color={color}
        sizeAttenuation={true}
        transparent={true}
        opacity={baseOpacity}
        depthWrite={false}
      />
    </points>
  );
}

export function ParticleNetwork() {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      scrollRef.current = ratio;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 bg-transparent pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, isMobile() ? 1.5 : 2]} // Performance preservation
      >
        <ParticleLayer
          count={isMobile() ? 400 : 1000}
          size={0.03}
          color="#7C9A92"
          baseOpacity={0.6}
          speed={{ x: 0.01, y: 0.015 }}
          radius={22}
          mouseFollowSpeed={0.01}
          scrollRef={scrollRef}
          reducedMotion={reducedMotion}
        />
        <ParticleLayer
          count={isMobile() ? 200 : 500}
          size={0.05}
          color="#4A6FA5"
          baseOpacity={0.7}
          speed={{ x: 0.015, y: 0.02 }}
          radius={18}
          mouseFollowSpeed={0.025}
          scrollRef={scrollRef}
          reducedMotion={reducedMotion}
        />
        <ParticleLayer
          count={isMobile() ? 50 : 150}
          size={0.08}
          color="#8C7AA9"
          baseOpacity={0.8}
          speed={{ x: 0.02, y: 0.03 }}
          radius={12}
          mouseFollowSpeed={0.04}
          scrollRef={scrollRef}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}

function isMobile() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  return false;
}
