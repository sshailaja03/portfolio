"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrailPoint {
  x: number;
  y: number;
  t: number; // timestamp ms
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

// ─── Section Color Map ────────────────────────────────────────────────────────

const SECTION_COLORS: Record<string, RGB> = {
  home:          { r: 138, g: 110, b: 180 }, // deep purple   #8A6EB4
  about:         { r:  79, g: 109, b: 138 }, // muted blue    #4F6D8A
  projects:      { r: 111, g: 135, b: 129 }, // sage green    #6F8781
  process:       { r:  79, g: 109, b: 138 }, // muted blue    #4F6D8A
  skills:        { r:  79, g: 109, b: 138 }, // muted blue    #4F6D8A
  education:     { r:  90, g: 128, b: 128 }, // warm teal     #5A8080
  certifications:{ r:  90, g: 128, b: 128 }, // warm teal     #5A8080
  leadership:    { r:  90, g: 128, b: 128 }, // warm teal     #5A8080
  contact:       { r: 192, g: 112, b: 104 }, // soft coral    #C07068
};

const DEFAULT_COLOR: RGB = { r: 138, g: 110, b: 180 };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

function rgbToString(c: RGB, alpha: number): string {
  return `rgba(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)},${alpha.toFixed(3)})`;
}

/**
 * Catmull-Rom spline: draws a smooth curve through p1→p2 using p0 and p3 as
 * control tangent helpers. Returns array of interpolated [x,y] pairs.
 */
function catmullRomPoints(
  p0: TrailPoint,
  p1: TrailPoint,
  p2: TrailPoint,
  p3: TrailPoint,
  segments = 8
): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const t2 = t * t;
    const t3 = t2 * t;
    const x =
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
    const y =
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
    pts.push([x, y]);
  }
  return pts;
}

// ─── Component ────────────────────────────────────────────────────────────────

const TRAIL_MAX_POINTS = 120;
const TRAIL_LIFETIME_MS = 850; // how long a point stays visible
const SPLINE_SEGMENTS = 14;      // interpolation steps per segment pair
const BASE_WIDTH = 2.5;
const MAX_WIDTH = 4.5;
const GLOW_BLUR = 12;
const COLOR_LERP_SPEED = 0.04;  // fraction per frame → ~25 frames to blend

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── Accessibility & device guards ─────────────────────────────────────────
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Sizing ────────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── State ─────────────────────────────────────────────────────────────────
    const trail: TrailPoint[] = [];
    let mouse = { x: -9999, y: -9999 };
    let lastMouse = { x: -9999, y: -9999 };
    let rafId = 0;
    let enabled = true; // toggled by Alt+C

    let currentColor: RGB = { ...DEFAULT_COLOR };
    let targetColor: RGB = { ...DEFAULT_COLOR };

    // ── Alt+C toggle ──────────────────────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "c") {
        enabled = !enabled;
        if (!enabled) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // ── Mouse tracking ────────────────────────────────────────────────────────
    // mousemove only records position; points are added here too so we get
    // the real inter-frame path with accurate timestamps.
    const onMouseMove = (e: MouseEvent) => {
      lastMouse = { ...mouse };
      mouse = { x: e.clientX, y: e.clientY };
      trail.push({ x: mouse.x, y: mouse.y, t: performance.now() });
      if (trail.length > TRAIL_MAX_POINTS) trail.shift();
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Section detection via IntersectionObserver ────────────────────────────
    const sectionIds = Object.keys(SECTION_COLORS);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              targetColor = SECTION_COLORS[id];
            }
          });
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // ── Render loop ───────────────────────────────────────────────────────────
    const draw = () => {
      rafId = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!enabled) return;

      // Advance colour interpolation
      currentColor = lerpRGB(currentColor, targetColor, COLOR_LERP_SPEED);

      const now = performance.now();

      // Prune points older than the lifetime window
      while (trail.length > 0 && now - trail[0].t > TRAIL_LIFETIME_MS) {
        trail.shift();
      }

      if (trail.length < 2) return;

      // Pad the start/end for Catmull-Rom (mirror first/last points)
      const pts = [
        { ...trail[0], x: 2 * trail[0].x - trail[1].x, y: 2 * trail[0].y - trail[1].y },
        ...trail,
        {
          ...trail[trail.length - 1],
          x: 2 * trail[trail.length - 1].x - trail[trail.length - 2].x,
          y: 2 * trail[trail.length - 1].y - trail[trail.length - 2].y,
        },
      ];

      // ── Build flat spline array with interpolated timestamps ───────────────
      // Each entry is [x, y, timestamp] so we can determine real age later.
      // Timestamps are linearly interpolated between each pair of trail points.
      // The ENTIRE trail is collected into one array; we never stroke individual
      // segments, eliminating the visible round-cap dot artefacts at joints.
      const allPts: Array<[number, number, number]> = [];
      for (let i = 1; i < pts.length - 2; i++) {
        const splinePts = catmullRomPoints(
          pts[i - 1], pts[i], pts[i + 1], pts[i + 2],
          SPLINE_SEGMENTS
        );
        const tStart = pts[i].t;
        const tEnd   = pts[i + 1].t;
        const start  = i === 1 ? 0 : 1;
        for (let j = start; j < splinePts.length; j++) {
          const frac      = j / SPLINE_SEGMENTS;
          const timestamp = tStart + (tEnd - tStart) * frac;
          allPts.push([splinePts[j][0], splinePts[j][1], timestamp]);
        }
      }

      if (allPts.length < 2) return;

      // Speed → line width
      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const speedT = Math.min(speed / 30, 1);
      const width = BASE_WIDTH + speedT * (MAX_WIDTH - BASE_WIDTH);

      // ── Time-based age bands ───────────────────────────────────────────────
      // Split the spline path into N contiguous bands by real age (ms).
      // Each band covers a fixed time window; freshest band = highest opacity.
      //
      // KEY FIX: opacity is tied to REAL TIME, not buffer position.
      // When the cursor stops, all points age together, so all bands get dimmer
      // continuously — the trail visibly fades rather than freezing until the
      // prune loop fires.
      //
      // allPts is ordered oldest→newest, so each age band is a contiguous
      // slice → we stroke each as ONE path → zero visible joint artefacts.
      const NUM_BANDS = 6;
      const bandDuration = TRAIL_LIFETIME_MS / NUM_BANDS; // ms per band

      // Opacity ramp: band 0 = oldest (faintest), band NUM_BANDS-1 = newest (brightest)
      const bandOpacity = [0.05, 0.10, 0.16, 0.22, 0.30, 0.40];
      const bandGlowOp  = [0.04, 0.07, 0.11, 0.15, 0.19, 0.24];

      const strokePath = (
        points: Array<[number, number, number]>,
        color: string,
        lw: number,
        composite: GlobalCompositeOperation,
        blur: number,
        shadowCol?: string
      ) => {
        if (points.length < 2) return;
        ctx.save();
        ctx.globalCompositeOperation = composite;
        ctx.strokeStyle = color;
        ctx.lineWidth = lw;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = blur;
        if (shadowCol) ctx.shadowColor = shadowCol;
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let j = 1; j < points.length; j++) ctx.lineTo(points[j][0], points[j][1]);
        ctx.stroke();
        ctx.restore();
      };

      for (let b = 0; b < NUM_BANDS; b++) {
        // Age range for this band (age = how many ms ago the point was recorded)
        const ageMax = (NUM_BANDS - b)     * bandDuration; // oldest edge
        const ageMin = (NUM_BANDS - b - 1) * bandDuration; // newest edge

        // Filter to contiguous slice: allPts is time-ordered so we can do a
        // single linear scan to find start/end indices.
        let startIdx = -1;
        let endIdx   = -1;
        for (let k = 0; k < allPts.length; k++) {
          const age = now - allPts[k][2];
          if (age <= ageMax && age > ageMin) {
            if (startIdx === -1) startIdx = k;
            endIdx = k;
          }
        }
        if (startIdx === -1 || endIdx <= startIdx) continue;

        const slice = allPts.slice(startIdx, endIdx + 1);
        const coreOp = bandOpacity[b];
        const glowOp = bandGlowOp[b];

        // Glow pass (additive, wider with shadow bloom)
        strokePath(
          slice,
          rgbToString(currentColor, glowOp),
          width + GLOW_BLUR * 0.7,
          "lighter",
          GLOW_BLUR,
          rgbToString(currentColor, 0.5)
        );

        // Core line pass
        strokePath(
          slice,
          rgbToString(currentColor, coreOp),
          width,
          "source-over",
          0
        );
      }
    };

    draw();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
      aria-hidden="true"
    />
  );
}
