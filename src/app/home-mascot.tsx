"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./home-mascot.module.css";

export function HomeMascot({ compact = false }: { compact?: boolean }) {
  const eyeId = useId().replace(/:/g, "");
  const stage = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 721px)");
    let frame = 0;
    let lastTime = 0;
    let pointer: { x: number; y: number } | null = null;
    const pose = { x: 0, y: 0, angle: 0, eyeX: 0, eyeY: 0 };
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const paint = () => {
      const node = figure.current;
      if (!node) return;
      node.style.setProperty("--body-x", `${pose.x}px`);
      node.style.setProperty("--body-y", `${pose.y}px`);
      node.style.setProperty("--body-angle", `${pose.angle}deg`);
      node.style.setProperty("--gaze-x", `${pose.eyeX}px`);
      node.style.setProperty("--gaze-y", `${pose.eyeY}px`);
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      pointer = null;
      pose.x = pose.y = pose.angle = pose.eyeX = pose.eyeY = 0;
      paint();
    };
    const tick = (time: number) => {
      frame = 0;
      if (!pointer || paused || !media.matches || !stage.current || !figure.current) return;
      // Read geometry together, then write transforms without triggering React renders.
      const bounds = stage.current.getBoundingClientRect();
      const width = figure.current.offsetWidth;
      const height = figure.current.offsetHeight;
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) { reset(); return; }
      const dt = lastTime ? Math.min(40, time - lastTime) : 16;
      lastTime = time;
      const centre = bounds.left + (compact ? pose.x : (bounds.width - width) / 2) + width * .60;
      const eyeTop = bounds.top + (compact ? 10 : 8) + pose.y + height * .33;
      const gazeX = clamp((pointer.x - centre) / Math.max(140, window.innerWidth * .30), -1, 1);
      const gazeY = clamp((pointer.y - eyeTop) / Math.max(120, window.innerHeight * .30), -1, 1);
      const targetX = compact
        ? clamp(pointer.x - bounds.left - width * .60, 8, Math.max(8, bounds.width - width - 8))
        : gazeX * 7;
      const moving = Math.abs(targetX - pose.x);
      // Eyes lead; the body catches up slowly and settles on its feet.
      const targetY = compact ? -Math.min(4, moving * .05) : -Math.abs(gazeY) * 3;
      const targetAngle = compact ? clamp((targetX - pose.x) * .05, -5, 5) : gazeX * 2.6;
      const bodyEase = 1 - Math.exp(-dt / (compact ? 230 : 180));
      const eyeEase = 1 - Math.exp(-dt / 65);
      pose.x += (targetX - pose.x) * bodyEase;
      pose.y += (targetY - pose.y) * bodyEase;
      pose.angle += (targetAngle - pose.angle) * bodyEase;
      pose.eyeX += (gazeX * 13 - pose.eyeX) * eyeEase;
      pose.eyeY += (gazeY * 8 - pose.eyeY) * eyeEase;
      paint();
      const unsettled = Math.abs(targetX - pose.x) + Math.abs(targetY - pose.y)
        + Math.abs(targetAngle - pose.angle) + Math.abs(gazeX * 13 - pose.eyeX) + Math.abs(gazeY * 8 - pose.eyeY);
      if (unsettled > .06) frame = requestAnimationFrame(tick);
      else lastTime = 0;
    };
    const follow = (event: PointerEvent) => {
      if (paused || !media.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("resize", reset, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    media.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("resize", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      media.removeEventListener("change", reset);
      reset();
    };
  }, [paused, compact]);

  return <div className={`${styles.stage} ${compact ? styles.compact : ""}`} ref={stage}>
    <div className={styles.figure} ref={figure}>
      <Image src="/brand/capses-mascot.webp" alt="Le lapin CAPSES, casquette à l’envers et emblème sur le tee-shirt." width={1024} height={1536} sizes={compact ? "110px" : "(max-width: 720px) 210px, 310px"} preload={!compact} />
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
    <button className={styles.motionToggle} type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Activer la mascotte" : "Mettre la mascotte en pause"}</button>
  </div>;
}
