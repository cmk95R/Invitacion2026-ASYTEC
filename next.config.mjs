/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera un sitio estático en la carpeta "out" (se puede subir a cualquier hosting)
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
