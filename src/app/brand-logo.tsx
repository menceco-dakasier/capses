import Image from "next/image";
import styles from "./brand-logo.module.css";

/** One shared lockup for every navigation, with its own accessible name. */
export function BrandLogo({ tagline = false }: { tagline?: boolean }) {
  return <span className={styles.lockup}>
    <Image className={styles.image} src="/brand/capses-wordmark.svg" alt="CAPSES" width={212} height={44} />
    {tagline && <span className={styles.tagline}>Comprendre · apprendre · progresser</span>}
  </span>;
}
