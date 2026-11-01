"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./home-mascot.module.css";

export function HomeMascot() {
  const eyeId = useId().replace(/:/g, "");
  const stage = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 721px)");
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      figure.current?.style.setProperty("--gaze-x", "0px");
      figure.current?.style.setProperty("--gaze-y", "0px");
    };
    const follow = (event: PointerEvent) => {
      if (paused || !media.matches || !stage.current) return;
      const bounds = figure.current?.getBoundingClientRect();
      if (!bounds) return;
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left - bounds.width * .60) / Math.max(160, window.innerWidth * .35)));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top - bounds.height * .33) / Math.max(140, window.innerHeight * .35)));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        figure.current?.style.setProperty("--gaze-x", `${x * 13}px`);
        figure.current?.style.setProperty("--gaze-y", `${y * 8}px`);
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
      {/* The eyelid masks stay still; only the original textured irises move. */}
      <svg className={styles.eyes} viewBox="0 0 1024 1536" aria-hidden="true" focusable="false">
        <defs>
          <path id={`${eyeId}-left`} d="M499 478C499 463 510 456 527 458C550 459 573 472 582 487C587 496 589 508 582 516C571 523 545 514 526 506C509 498 499 491 499 478Z" />
          <path id={`${eyeId}-right`} d="M658 522C667 510 684 505 701 509C719 511 726 519 725 536C724 551 717 555 700 556C679 558 660 550 657 539C655 532 655 528 658 522Z" />
          <clipPath id={`${eyeId}-left-socket`}><use href={`#${eyeId}-left`} /></clipPath>
          <clipPath id={`${eyeId}-right-socket`}><use href={`#${eyeId}-right`} /></clipPath>
          <clipPath id={`${eyeId}-left-iris`}><ellipse cx="546" cy="486" rx="26.5" ry="26.5" /></clipPath>
          <clipPath id={`${eyeId}-right-iris`}><ellipse cx="678" cy="529" rx="23" ry="24" /></clipPath>
          <radialGradient id={`${eyeId}-white`} cx="45%" cy="40%" r="70%"><stop offset="0" stopColor="#fffdf9" /><stop offset=".65" stopColor="#fff4ee" /><stop offset="1" stopColor="#c6aaa5" /></radialGradient>
        </defs>
        <g clipPath={`url(#${eyeId}-left-socket)`}>
          <use href={`#${eyeId}-left`} fill={`url(#${eyeId}-white)`} />
          <g className={styles.iris}><g clipPath={`url(#${eyeId}-left-iris)`}><image href="/brand/capses-mascot.webp" width="1024" height="1536" /></g></g>
        </g>
        <g clipPath={`url(#${eyeId}-right-socket)`}>
          <use href={`#${eyeId}-right`} fill={`url(#${eyeId}-white)`} />
          <g className={styles.iris}><g clipPath={`url(#${eyeId}-right-iris)`}><image href="/brand/capses-mascot.webp" width="1024" height="1536" /></g></g>
        </g>
      </svg>
    </div>
    <button className={styles.motionToggle} type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Activer le suivi du regard" : "Mettre en pause le regard"}</button>
  </div>;
}
