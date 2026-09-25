import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croissance économique — Terminale SES",
  description:
    "Quels sont les sources et les défis de la croissance économique ? Objectifs officiels, notions, mécanismes, données actualisées, quiz et sujets du bac 2027.",
  alternates: { canonical: "/terminale/croissance-economique" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
