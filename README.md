# Invitación Fiesta de Fin de Año · ASYTEC

Sitio estático hecho con Next.js (App Router).

## Usar

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # genera el sitio estático en la carpeta "out"
```

La carpeta `out` se puede subir a Netlify, Vercel, GitHub Pages o cualquier hosting.

## Qué editar

Todo está en `lib/config.js`:

- Fecha y hora (`EVENT_DATE`), textos, lugar y horario (`EVENT`).
- Link de confirmación (`RSVP_URL`): WhatsApp, mail o formulario.
- Fotos del lugar y del equipo: copiá las imágenes en `public/` y listalas en `VENUE_PHOTOS` y `TEAM_PHOTOS`.

El logo está en `components/Logo.js` (reemplazalo por el logo real en `public/`).
