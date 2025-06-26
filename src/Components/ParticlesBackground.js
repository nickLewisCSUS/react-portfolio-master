import React from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
            fullScreen: { enable: false },
            background: { color: { value: 'transparent' } },
            particles: {
            number: { value: 260 },
            color: {
                value: ['#ffffff', '#8a2be2', '#00ffff', '#ff69b4', '#b0c4de']
            },
            shape: {
                type: ['circle', 'star'],
                stroke: {
                    width: 0
                },
                options: {
                    star: {
                    shadow: {
                        enable: true,
                        color: '#ffffff',
                        blur: 2
                    }
                    },
                    circle: {
                    shadow: {
                        enable: true,
                        color: '#ffffff',
                        blur: 2
                    }
                    }
                }
            },
            opacity: {
                value: 0.8,
                random: true,
                anim: { enable: true, speed: 0.6, opacity_min: 0.3, sync: false }
            },
            size: {
                value: { min: 1.5, max: 4 },
                anim: { enable: true, speed: 1.5, size_min: 0.5, sync: false }
            },
            move: {
                enable: true,
                speed: 1.3,
                direction: 'none',
                random: true,
                straight: false,
                outModes: { default: 'out' },
                trail: {
                enable: true,
                length: 4,
                fillColor: 'transparent'
                },
                attract: {
                enable: true,
                rotateX: 800,
                rotateY: 1600
                }
            },
            links: {
                enable: true,
                distance: 130,
                color: '#b0c4de',
                opacity: 0.15,
                width: 0.7
            }
            },
            interactivity: {
            events: {
                onHover: {
                enable: true,
                mode: ['repulse', 'bubble', 'trail']
                },
                resize: true
            },
            modes: {
                repulse: {
                distance: 120,
                duration: 0.4
                },
                bubble: {
                distance: 120,
                duration: 2,
                size: 6,
                opacity: 1
                },
                trail: {
                delay: 0.005,
                pauseOnStop: false
                }
            }
            },
            detectRetina: true
        }}
    />
  );
};

export default React.memo(ParticlesBackground);
