import "./globals.css";

const siteUrl = "https://invitacion2026-asytec-sistemas.netlify.app";
const socialImage = "/og-invitacion-captura.jpg";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Invitación ASYTEC · Fiesta de Fin de Año",
  description:
    "Abrí el sobre para descubrir los detalles de la Fiesta de Fin de Año de ASYTEC Sistemas.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Invitación ASYTEC · Fiesta de Fin de Año",
    description:
      "Abrí el sobre para descubrir los detalles del evento.",
    url: siteUrl,
    siteName: "ASYTEC Sistemas",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Sobre de invitación de ASYTEC Sistemas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invitación ASYTEC · Fiesta de Fin de Año",
    description:
      "Abrí el sobre para descubrir los detalles del evento.",
    images: [socialImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b1e3d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
