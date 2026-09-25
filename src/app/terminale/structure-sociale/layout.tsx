import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Structure sociale — Terminale SES",
  description:
    "Comment est structurée la société française actuelle ? Objectifs officiels, notions, transformations de l’emploi, Marx, Weber, classes sociales, données, quiz et sujets du bac 2027.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
