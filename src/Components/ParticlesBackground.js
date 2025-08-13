import React, { useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine); // slim bundle only
  };

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: 110, density: { enable: true, area: 900 } },
        color: { value: ['#ffffff', '#8a2be2', '#00ffff', '#ff69b4', '#b0c4de'] },
        shape: { type: 'circle' },                 // slim-safe
        opacity: { value: 0.6, random: true },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 0.8,
          outModes: { default: 'out' },
          // no trail, no attract in slim
        },
        links: { enable: true, distance: 130, color: '#b0c4de', opacity: 0.15, width: 0.7 }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' }, // slim-safe
          resize: true
        },
        modes: {
          repulse: { distance: 100, duration: 0.3 }
        }
      },
      detectRetina: true,
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: { value: 45 },
              move: { speed: 0.5 },
              links: { enable: false }
            },
            interactivity: { events: { onHover: { enable: false } } }
          }
        }
      ]
    }),
    []
  );

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default React.memo(ParticlesBackground);
