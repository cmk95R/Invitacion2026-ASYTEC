import "./globals.css";
import EnvelopeIntro from "../components/EnvelopeIntro";

export const metadata = {
  title: "Fiesta de Fin de Año · ASYTEC Sistemas",
  description:
    "Fiesta de Fin de Año ASYTEC Sistemas. 11 de noviembre, Fontana Bar, Núñez. 19:00 a 22:00.",
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
      <body>
        <EnvelopeIntro />
        {children}
      </body>
    </html>
  );
}
