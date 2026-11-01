"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./home-mascot.module.css";

export function HomeMascot() {
  const stage = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      figure.current?.style.setProperty("transform", "none");
    };
    const follow = (event: PointerEvent) => {
      if (paused || !media.matches || !stage.current) return;
      const bounds = stage.current.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left - bounds.width / 2) / (window.innerWidth / 2)));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top - bounds.height / 2) / (window.innerHeight / 2)));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        figure.current?.style.setProperty("transform", `translate(${x * 5}px, ${y * 3}px) rotate(${x * 1.5}deg)`);
      });
    };
    window.addEventListener("pointermove", follow, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    media.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", follow);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      media.removeEventListener("change", reset);
      reset();
    };
  }, [paused]);

  return <div className={styles.stage} ref={stage}>
    <div className={styles.figure} ref={figure}>
      <Image src="/brand/capses-mascot.webp" alt="Le lapin CAPSES, casquette à l’envers et emblème sur le tee-shirt." width={1024} height={1536} sizes="(max-width: 720px) 210px, 310px" preload />
    </div>
    <button className={styles.motionToggle} type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Activer le mouvement" : "Mettre en pause le mouvement"}</button>
  </div>;
}
