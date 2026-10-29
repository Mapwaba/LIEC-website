import { getAssetPath } from "@/lib/assets";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIEC — Lyon International Education Consulting | Études en France",
  description:
    "Construis ton projet d’études en France avec LIEC. De l’orientation au dossier de candidature, nous t’accompagnons pour avancer avec méthode et confiance.",
  icons: {
    icon: getAssetPath("/logo_LIEC (1).png"),
    shortcut: getAssetPath("/logo_LIEC (1).png"),
    apple: getAssetPath("/logo_LIEC (1).png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href={getAssetPath("/logo_LIEC (1).png")} type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased selection:bg-tertiary-fixed selection:text-on-tertiary-fixed font-sans">
        {children}
      </body>
    </html>
  );
}
