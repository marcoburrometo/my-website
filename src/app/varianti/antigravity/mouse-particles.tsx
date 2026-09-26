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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let rafId = 0;
    let width = 0;
    let height = 0;
    let pointerX = -2000;
    let pointerY = -2000;
    let pointerVX = 0;
    let pointerVY = 0;
    let pointerHeld = false;
    const pointerPower = 1.3;

    const isDark = resolvedTheme !== "light";

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const areaDensity = isTouch ? 1150 : 950;
    const particleCount = Math.max(
      isTouch ? 520 : 700,
      Math.min(isTouch ? 850 : 1250, Math.floor((window.innerWidth * window.innerHeight) / areaDensity))
    );
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      size: Math.random() * 2.4 + 0.55,
      hue: isDark ? 175 + Math.random() * 140 : 190 + Math.random() * 100,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
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

    const draw = () => {
      ctx.fillStyle = isDark ? "rgba(6, 9, 19, 0.20)" : "rgba(242, 248, 255, 0.22)";
      ctx.fillRect(0, 0, width, height);

      const cellSize = 92;
      const spatialGrid = new Map<string, number[]>();

      for (let index = 0; index < particles.length; index += 1) {
        const p = particles[index];
        const dx = pointerX - p.x;
        const dy = pointerY - p.y;
        const distSq = dx * dx + dy * dy;
        const influence = 205 * 205;

        if (distSq < influence) {
          const force = (influence - distSq) / influence;
          const angle = Math.atan2(dy, dx);
          const direction = forceMode === "repel" ? -1 : 1;
          const strength = force * (0.11 + Math.min(Math.hypot(pointerVX, pointerVY), 42) * 0.0018) * pointerPower;
          p.vx += Math.cos(angle) * strength * direction;
          p.vy += Math.sin(angle) * strength * direction;
          p.vx += pointerVX * force * 0.004;
          p.vy += pointerVY * force * 0.004;

          if (pointerHeld) {
            const orbitStrength = force * 0.12;
            p.vx += -Math.sin(angle) * orbitStrength;
            p.vy += Math.cos(angle) * orbitStrength;
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

        const cellX = Math.floor(p.x / cellSize);
        const cellY = Math.floor(p.y / cellSize);
        const cellKey = `${cellX}:${cellY}`;
        const cell = spatialGrid.get(cellKey);
        if (cell) cell.push(index);
        else spatialGrid.set(cellKey, [index]);
      }

      for (let index = 0; index < particles.length; index += 1) {
        const p = particles[index];
        const cellX = Math.floor(p.x / cellSize);
        const cellY = Math.floor(p.y / cellSize);

        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
            const nearby = spatialGrid.get(`${cellX + offsetX}:${cellY + offsetY}`);
            if (!nearby) continue;

            for (const nearbyIndex of nearby) {
              if (nearbyIndex <= index) continue;
              const other = particles[nearbyIndex];
              const dx = other.x - p.x;
              const dy = other.y - p.y;
              const distance = Math.hypot(dx, dy);
              if (distance >= 88) continue;

              const alpha = (1 - distance / 88) * (isDark ? 0.32 : 0.24);
              ctx.beginPath();
              ctx.strokeStyle = `hsla(${(p.hue + other.hue) / 2}, 100%, ${isDark ? 72 : 43}%, ${alpha})`;
              ctx.lineWidth = 0.7;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = isDark
          ? `hsla(${p.hue}, 100%, 68%, 0.92)`
          : `hsla(${p.hue}, 90%, 46%, 0.88)`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    draw();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [forceMode, resolvedTheme]);

  return (
    <div className={styles.particleLayer}>
      <canvas aria-hidden className="h-full w-full" ref={canvasRef} />
      <div aria-label="Particle interactions" className={styles.controls}>
        <div aria-label="Mouse force" className={styles.modeControl} role="group">
          <button
            aria-pressed={forceMode === "repel"}
            className={forceMode === "repel" ? styles.activeMode : styles.modeButton}
            onClick={() => setForceMode("repel")}
            type="button"
          >
            Repel
          </button>
          <button
            aria-pressed={forceMode === "attract"}
            className={forceMode === "attract" ? styles.activeMode : styles.modeButton}
            onClick={() => setForceMode("attract")}
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
