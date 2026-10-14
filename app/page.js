"use client";

import { motion } from "framer-motion";
import Carousel from "../components/Carousel";
import Countdown from "../components/Countdown";
import Logo from "../components/Logo";
import {
  EVENT,
  EVENT_DATE,
  RSVP_URL,
  MAP_URL,
  HERO_IMAGE,
  VENUE_PHOTOS,
  TEAM_PHOTOS,
} from "../lib/config";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px -10% 0px" },
  transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] },
};

export default function Home() {
  return (
    <main>
      <motion.header
        className="hero"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <Logo transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }} />
      </motion.header>

      <motion.section className="welcome" {...fadeUp}>
        <div className="wrap">
          <h1 className="script">{EVENT.title}</h1>
          <p>{EVENT.intro}</p>
          <a className="btn" href={RSVP_URL}>
            Confirmar asistencia
          </a>
        </div>
      </motion.section>

      <motion.section className="event" {...fadeUp}>
        <div className="wrap">
          <p className="kicker">El evento será el próximo</p>
          <h2 className="script">{EVENT.dateLabel}</h2>
          <p className="venue">{EVENT.venue}</p>
          <p className="addr">{EVENT.address}</p>
          <a
            className="btn btn--ghost"
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver ubicación
          </a>
          <Countdown date={EVENT_DATE} />
        </div>
      </motion.section>

      <motion.section
        className="gallery"
        aria-label="Fotos del lugar"
        {...fadeUp}
      >
        {VENUE_PHOTOS.length > 0 ? (
          <Carousel images={VENUE_PHOTOS} alt={EVENT.venue} />
        ) : (
          [1, 2, 3].map((n) => (
            <figure key={n}>
              Foto {n} · {EVENT.venue}
            </figure>
          ))
        )}
      </motion.section>

      <motion.section className="time" {...fadeUp}>
        <div className="wrap">
          <p>En el siguiente horario:</p>
          <p className="hours script">{EVENT.hours}</p>
          <p>{EVENT.dress}</p>
        </div>
      </motion.section>

      <motion.section className="reminder" {...fadeUp}>
        <div className="wrap">
          <p>
            Por favor confirma tu asistencia antes del{" "}
            <strong>{EVENT.rsvpDeadline}</strong> ya que esto es muy importante
            para la organización del evento.
          </p>
          <a className="btn" href={RSVP_URL}>
            Confirmar asistencia
          </a>
        </div>
      </motion.section>

      <motion.section className="team" aria-label="Equipo ASYTEC" {...fadeUp}>
        <div className="grid">
          {TEAM_PHOTOS.length > 0
            ? TEAM_PHOTOS.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" />
              ))
            : Array.from({ length: 18 }, (_, i) => (
                <span key={i} aria-hidden="true" />
              ))}
        </div>
      </motion.section>

      <motion.footer {...fadeUp}>
        <Logo />
      </motion.footer>
    </main>
  );
}