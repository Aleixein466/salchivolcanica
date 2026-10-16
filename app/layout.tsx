import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://salchivolcanica-mocoa.alexissoto2021.chatgpt.site"),
  title: "Salchivolcánica | Fuego y hielo en Mocoa",
  description: "Explora el menú de Salchivolcánica: salchipapas, alitas, picadas, heladería, frutas y bebidas en Mocoa, Putumayo.",
  openGraph: { title: "Salchivolcánica", description: "Donde el fuego y el hielo se encuentran.", locale: "es_CO", type: "website" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
