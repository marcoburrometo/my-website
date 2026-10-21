"use client";

import type { PointerEvent, ReactNode } from "react";

type SignalBloomStageProps = {
  children: ReactNode;
  className: string;
};

export function SignalBloomStage({ children, className }: SignalBloomStageProps) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const tiltX = ((x / bounds.width) * 2 - 1) * 1.2;
    const tiltY = ((y / bounds.height) * 2 - 1) * -1.2;

    event.currentTarget.style.setProperty("--signal-x", `${x}px`);
    event.currentTarget.style.setProperty("--signal-y", `${y}px`);
    event.currentTarget.style.setProperty("--signal-tilt-x", `${tiltX}deg`);
    event.currentTarget.style.setProperty("--signal-tilt-y", `${tiltY}deg`);
    event.currentTarget.style.setProperty("--signal-opacity", "1");
  }

  function handlePointerLeave(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--signal-opacity", "0");
    event.currentTarget.style.setProperty("--signal-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--signal-tilt-y", "0deg");
  }

  return (
    <section
      className={className}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      {children}
    </section>
  );
}
