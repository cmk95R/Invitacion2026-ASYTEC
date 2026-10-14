"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Carousel({ images, alt = "Foto" }) {
  const containerRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      const v = window.innerWidth >= 768 ? 3 : 1;
      setItemsPerView(v);
      setI(0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const len = images.length;
  const maxIndex = Math.max(0, len - itemsPerView);
  const slidePercent = 100 / itemsPerView;

  const next = () => {
    setDir(1);
    setI((p) => (p >= maxIndex ? 0 : p + 1));
  };
  const prev = () => {
    setDir(-1);
    setI((p) => (p <= 0 ? maxIndex : p - 1));
  };

  useEffect(() => {
    if (paused || len <= itemsPerView) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, len, itemsPerView]);

  useEffect(() => {
    if (i > maxIndex) setI(maxIndex);
  }, [maxIndex, i]);

  if (len === 0) return null;

  const pages = maxIndex + 1;

  return (
    <div
      ref={containerRef}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="carousel-track"
        animate={{ x: `${-i * slidePercent}%` }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) next();
          else if (info.offset.x > 60) prev();
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="carousel-slide"
            style={{ flex: `0 0 ${slidePercent}%` }}
          >
            <img
              src={src}
              alt={`${alt} ${idx + 1}`}
              className="carousel-img"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>

      {len > itemsPerView && (
        <>
          <button
            className="carousel-btn prev"
            onClick={prev}
            aria-label="Anterior"
            type="button"
          >
            ‹
          </button>
          <button
            className="carousel-btn next"
            onClick={next}
            aria-label="Siguiente"
            type="button"
          >
            ›
          </button>
          <div className="carousel-dots" role="tablist">
            {Array.from({ length: pages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === i}
                aria-label={`Página ${idx + 1}`}
                className={`dot ${idx === i ? "active" : ""}`}
                onClick={() => {
                  setDir(idx > i ? 1 : -1);
                  setI(idx);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}