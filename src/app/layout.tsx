import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://capses.vercel.app"),
  title: {
    default: "CAPSES — Réussir en Sciences économiques et sociales",
    template: "%s | CAPSES",
  },
  description:
    "Cours, notions, méthodes, quiz et exercices de Sciences économiques et sociales pour progresser au lycée et préparer le baccalauréat.",
  applicationName: "CAPSES",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "CAPSES",
    title: "CAPSES — Réussir en Sciences économiques et sociales",
    description:
      "Cours, notions, méthodes, quiz et exercices de SES pour progresser au lycée et préparer le baccalauréat.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1758525861622-f4e7ac86a2d7?auto=format&fit=crop&w=1200&q=82",
        width: 1200,
        height: 630,
        alt: "CAPSES — Réviser les Sciences économiques et sociales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAPSES — Réussir en SES",
    description:
      "Cours, notions, méthodes, quiz et exercices de Sciences économiques et sociales.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
