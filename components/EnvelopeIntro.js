'use client';

import { useEffect, useRef, useState } from 'react';
import { EVENT, EVENT_DATE } from '../lib/config';

const CONFETTI_COLORS = [
  '#ffd043',
  '#f3c85c',
  '#ffe885',
  '#e5b225',
  '#fff0a6',
  '#ffd043',
  '#f15a24',
];

const CONFETTI = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  x: (index * 37 + 11) % 100,
  drift: ((index * 29) % 90) - 45,
  delay: ((index * 7) % 13) / 20,
  duration: 2.15 + ((index * 11) % 15) / 10,
  size: 4 + ((index * 5) % 6),
  color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
}));

export default function EnvelopeIntro({ onReveal, onReplay }) {
  const [phase, setPhase] = useState('closed');
  const timers = useRef([]);
  const eventYear = new Date(EVENT_DATE).getFullYear();

  useEffect(() => {
    if (phase === 'hidden') return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useEffect(
    () => () => timers.current.forEach((timer) => window.clearTimeout(timer)),
    [],
  );

  const openInvitation = () => {
    if (phase !== 'closed') return;

    setPhase('opening');
    timers.current.push(
      window.setTimeout(() => onReveal?.(), 1120),
      window.setTimeout(() => setPhase('leaving'), 1320),
      window.setTimeout(() => setPhase('hidden'), 2120),
    );
  };

  const replay = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onReplay?.();
    setPhase('closed');
  };

  const visible = phase !== 'hidden';
  const active = phase === 'opening' || phase === 'leaving';

  return (
    <>
      {visible && (
        <div
          className={`intro-overlay ${phase === 'leaving' ? 'is-leaving' : ''}`}
          aria-hidden={phase === 'leaving'}
        >
          <div className='intro-ambient' aria-hidden='true' />

          {active && (
            <div className='intro-confetti' aria-hidden='true'>
              {CONFETTI.map((piece) => (
                <i
                  key={piece.id}
                  style={{
                    '--confetti-x': `${piece.x}%`,
                    '--confetti-drift': `${piece.drift}px`,
                    '--confetti-delay': `${piece.delay}s`,
                    '--confetti-duration': `${piece.duration}s`,
                    '--confetti-size': `${piece.size}px`,
                    '--confetti-color': piece.color,
                  }}
                />
              ))}
            </div>
          )}

          <div className='intro-content'>
            <div className='intro-brand' aria-label='ASYTEC Sistemas'>
              <span />
              <strong>ASYTEC SISTEMAS</strong>
              <span />
            </div>

            <div
              className={`intro-envelope ${active ? 'is-opening' : ''}`}
              role='button'
              tabIndex={phase === 'closed' ? 0 : -1}
              aria-label='Abrir invitación'
              onClick={openInvitation}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openInvitation();
                }
              }}
            >
              <div className='intro-envelope-back' />

              <div className='intro-letter'>
                <small>INVITACIÓN ESPECIAL</small>
                <b>{eventYear}</b>
                <h2>{EVENT.title}</h2>
                <p>{EVENT.dateLabel} · {EVENT.venue}</p>
              </div>

              <div className='intro-fold intro-fold--left' />
              <div className='intro-fold intro-fold--right' />
              <div className='intro-fold intro-fold--bottom' />
              <div className='intro-envelope-flap'>
                <span />
              </div>

              <div className='intro-seal' aria-hidden='true'>
                <div>
                  <img src='/logo A.png' alt='' />
                </div>
              </div>
            </div>

            <button
              className='intro-open-btn'
              type='button'
              onClick={openInvitation}
              disabled={active}
            >
              <svg viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M3 7.5 12 14l9-6.5M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z' />
              </svg>
              Abrir invitación
            </button>

            <p className='intro-hint'>
              <span />
              Toca el sobre o el botón para descubrir los detalles
            </p>
          </div>
        </div>
      )}

      {!visible && (
        <button className='intro-replay' type='button' onClick={replay}>
          <svg viewBox='0 0 24 24' aria-hidden='true'>
            <path d='M4 4v6h6M20 20v-6h-6M5.4 9a8 8 0 0 1 13-3M18.6 15a8 8 0 0 1-13 3' />
          </svg>
          Ver sobre
        </button>
      )}
    </>
  );
}
