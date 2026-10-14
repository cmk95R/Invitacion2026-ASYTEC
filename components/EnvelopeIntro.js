"use client";

import { useEffect, useState } from "react";

export default function EnvelopeIntro() {
  const [opened, setOpened] = useState(false);
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem("inv-opened")) setOpened(true);
    } catch {}
  }, []);

  const handleOpen = () => {
    if (opened || phase > 0) return;
    setPhase(1);
    setTimeout(() => setPhase(2), 550);
    setTimeout(() => setPhase(3), 1400);
    setTimeout(() => {
      setOpened(true);
      try {
        sessionStorage.setItem("inv-opened", "1");
      } catch {}
    }, 2400);
  };

  if (!mounted || opened) return null;

  return (
    <div
      className={`envelope-overlay ${phase >= 4 ? "leaving" : ""}`}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
    >
      <div className="envelope-stage">
        <div className="envelope">
          <div className="envelope-body">
            <div className="envelope-shadow" />
            <div className="envelope-letter">
              <div className="letter-inner">
                <p className="letter-script">A/SYTEC</p>
                <p className="letter-sub">S I S T E M A S</p>
                <div className="letter-divider" />
                <p className="letter-event">Fiesta de Fin de Año</p>
                <p className="letter-date">11 · 11 · 2026 · FONTANA BAR</p>
              </div>
            </div>
          </div>
          <div className={`envelope-flap ${phase >= 2 ? "open" : ""}`} />
          <div className={`envelope-seal ${phase >= 1 ? "broken" : ""}`}>
            <span>A</span>
          </div>
        </div>

        <p className={`envelope-hint ${phase > 0 ? "hide" : ""}`}>
          Tocá para abrir
        </p>
      </div>
    </div>
  );
}