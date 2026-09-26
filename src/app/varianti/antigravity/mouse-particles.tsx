"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import styles from "./styles.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
};

export function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [forceMode, setForceMode] = useState<"repel" | "attract">("repel");
  const forceModeRef = useRef(forceMode);

  const chooseForceMode = (mode: "repel" | "attract") => {
    forceModeRef.current = mode;
    setForceMode(mode);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let pointerX = -2000;
    let pointerY = -2000;
    let pointerVX = 0;
    let pointerVY = 0;
    let pointerHeld = false;
    let frameId = 0;
    let previousFrameTime = 0;

    const isDark = resolvedTheme !== "light";

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const areaDensity = isTouch ? 1250 : 1450;
    const particleCount = Math.max(
      isTouch ? 240 : 420,
      Math.min(isTouch ? 430 : 800, Math.floor((window.innerWidth * window.innerHeight) / areaDensity))
    );
    const frameInterval = isTouch ? 1000 / 30 : 1000 / 40;
    const cellSize = 92;
    const linkDistance = 88;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      size: Math.random() * 2.4 + 0.55,
      hue: isDark ? 175 + Math.random() * 140 : 190 + Math.random() * 100,
    }));
    const nextInCell = new Int32Array(particleCount);
    const lineBuckets = Array.from({ length: 4 }, () => [] as number[]);
    let columns = 1;
    let rows = 1;
    let cellHeads = new Int32Array(1);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, isTouch ? 1.5 : 1.75);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.max(1, Math.ceil(width / cellSize));
      rows = Math.max(1, Math.ceil(height / cellSize));
      cellHeads = new Int32Array(columns * rows);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerVX = Math.max(-42, Math.min(42, event.clientX - pointerX));
      pointerVY = Math.max(-42, Math.min(42, event.clientY - pointerY));
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const onPointerLeave = () => {
      pointerX = -2000;
      pointerY = -2000;
      pointerVX = 0;
      pointerVY = 0;
      pointerHeld = false;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.target !== canvas) return;
      pointerHeld = true;
    };

    const onPointerUp = () => {
      pointerHeld = false;
    };

    const draw = (timestamp: number) => {
      frameId = 0;
      if (document.hidden) return;
      if (timestamp - previousFrameTime < frameInterval) {
        scheduleFrame();
        return;
      }
      previousFrameTime = timestamp;

      ctx.fillStyle = isDark ? "rgba(6, 9, 19, 0.20)" : "rgba(242, 248, 255, 0.22)";
      ctx.fillRect(0, 0, width, height);

      cellHeads.fill(-1);
      for (const bucket of lineBuckets) bucket.length = 0;
      const pointerSpeed = Math.min(Math.hypot(pointerVX, pointerVY), 42);
      const forceDirection = forceModeRef.current === "repel" ? -1 : 1;

      for (let index = 0; index < particles.length; index += 1) {
        const p = particles[index];
        const dx = pointerX - p.x;
        const dy = pointerY - p.y;
        const distSq = dx * dx + dy * dy;
        const influence = 205 * 205;

        if (distSq < influence && distSq > 0.01) {
          const force = (influence - distSq) / influence;
          const distance = Math.sqrt(distSq);
          const unitX = dx / distance;
          const unitY = dy / distance;
          const strength = force * (0.11 + pointerSpeed * 0.0018) * 1.3;
          p.vx += unitX * strength * forceDirection;
          p.vy += unitY * strength * forceDirection;
          p.vx += pointerVX * force * 0.004;
          p.vy += pointerVY * force * 0.004;

          if (pointerHeld) {
            const orbitStrength = force * 0.12;
            p.vx += -unitY * orbitStrength;
            p.vy += unitX * orbitStrength;
          }
        }

        p.vx *= 0.982;
        p.vy *= 0.982;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 7) {
          p.vx = (p.vx / speed) * 7;
          p.vy = (p.vy / speed) * 7;
        }
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const cellX = Math.min(columns - 1, Math.max(0, Math.floor(p.x / cellSize)));
        const cellY = Math.min(rows - 1, Math.max(0, Math.floor(p.y / cellSize)));
        const cellIndex = cellY * columns + cellX;
        nextInCell[index] = cellHeads[cellIndex];
        cellHeads[cellIndex] = index;
      }

      for (let index = 0; index < particles.length; index += 1) {
        const p = particles[index];
        const cellX = Math.min(columns - 1, Math.max(0, Math.floor(p.x / cellSize)));
        const cellY = Math.min(rows - 1, Math.max(0, Math.floor(p.y / cellSize)));

        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          const nearbyX = cellX + offsetX;
          if (nearbyX < 0 || nearbyX >= columns) continue;

          for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
            const nearbyY = cellY + offsetY;
            if (nearbyY < 0 || nearbyY >= rows) continue;
            const nearbyCellIndex = nearbyY * columns + nearbyX;

            for (let nearbyIndex = cellHeads[nearbyCellIndex]; nearbyIndex !== -1; nearbyIndex = nextInCell[nearbyIndex]) {
              if (nearbyIndex <= index) continue;
              const other = particles[nearbyIndex];
              const dx = other.x - p.x;
              const dy = other.y - p.y;
              const distanceSq = dx * dx + dy * dy;
              if (distanceSq >= linkDistance * linkDistance) continue;

              const distance = Math.sqrt(distanceSq);
              const bucketIndex = Math.min(3, Math.floor((distance / linkDistance) * 4));
              lineBuckets[bucketIndex].push(p.x, p.y, other.x, other.y);
            }
          }
        }
      }

      const lineAlpha = isDark ? [0.09, 0.15, 0.22, 0.3] : [0.07, 0.12, 0.18, 0.24];
      for (let bucketIndex = 0; bucketIndex < lineBuckets.length; bucketIndex += 1) {
        const segments = lineBuckets[bucketIndex];
        if (segments.length === 0) continue;

        ctx.beginPath();
        for (let offset = 0; offset < segments.length; offset += 4) {
          ctx.moveTo(segments[offset], segments[offset + 1]);
          ctx.lineTo(segments[offset + 2], segments[offset + 3]);
        }
        ctx.strokeStyle = isDark
          ? `rgba(96, 194, 255, ${lineAlpha[bucketIndex]})`
          : `rgba(19, 103, 148, ${lineAlpha[bucketIndex]})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = isDark
          ? `hsla(${p.hue}, 100%, 68%, 0.92)`
          : `hsla(${p.hue}, 90%, 46%, 0.88)`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      pointerVX *= 0.72;
      pointerVY *= 0.72;
      scheduleFrame();
    };

    const scheduleFrame = () => {
      if (frameId === 0 && !document.hidden) {
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else {
        scheduleFrame();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("visibilitychange", onVisibilityChange);
    scheduleFrame();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [resolvedTheme]);

  return (
    <div className={styles.particleLayer}>
      <canvas aria-hidden className="h-full w-full" ref={canvasRef} />
      <div aria-label="Particle interactions" className={styles.controls}>
        <div aria-label="Mouse force" className={styles.modeControl} role="group">
          <button
            aria-pressed={forceMode === "repel"}
            className={forceMode === "repel" ? styles.activeMode : styles.modeButton}
            onClick={() => chooseForceMode("repel")}
            type="button"
          >
            Repel
          </button>
          <button
            aria-pressed={forceMode === "attract"}
            className={forceMode === "attract" ? styles.activeMode : styles.modeButton}
            onClick={() => chooseForceMode("attract")}
            type="button"
          >
            Attract
          </button>
        </div>
        <span className={styles.vortexHint}>Hold on the background to create a vortex</span>
      </div>
    </div>
  );
}
