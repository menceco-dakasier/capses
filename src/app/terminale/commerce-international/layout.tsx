import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commerce international — Terminale SES",
  description:
    "Quels sont les fondements du commerce international et de l’internationalisation de la production ? Avantages comparatifs, chaînes de valeur, compétitivité, effets du commerce, quiz et sujets du bac 2027.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
