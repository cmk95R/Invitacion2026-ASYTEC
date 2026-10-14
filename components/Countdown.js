"use client";

import { useEffect, useState } from "react";

function pad(n) {
  return String(n).padStart(2, "0");
}

function calc(target) {
  const s = Math.floor(Math.max(0, target - Date.now()) / 1000);
  return {
    d: Math.floor(s / 86400),
    h: pad(Math.floor((s % 86400) / 3600)),
    m: pad(Math.floor((s % 3600) / 60)),
    s: pad(s % 60),
  };
}

export default function Countdown({ date }) {
  const [t, setT] = useState(null);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const target = new Date(date).getTime();
    setT(calc(target));
    const id = setInterval(() => {
      setT(calc(target));
      setTick(true);
      setTimeout(() => setTick(false), 450);
    }, 1000);
    return () => clearInterval(id);
  }, [date]);

  const v = (x) => (t ? t[x] : "--");

  return (
    <div className="countdown" role="timer" aria-live="off">
      <div className={tick ? "tick" : ""}>
        <strong>{v("d")}</strong>
        <small>Días</small>
      </div>
      <div className={tick ? "tick" : ""}>
        <strong>{v("h")}</strong>
        <small>Horas</small>
      </div>
      <div className={tick ? "tick" : ""}>
        <strong>{v("m")}</strong>
        <small>Minutos</small>
      </div>
      <div className={tick ? "tick" : ""}>
        <strong>{v("s")}</strong>
        <small>Segundos</small>
      </div>
    </div>
  );
}
