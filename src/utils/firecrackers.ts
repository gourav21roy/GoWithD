import confetti from 'canvas-confetti';

// Rose petal shapes created via SVG path
let cachedRosePetalShapes: confetti.Shape[] | null = null;

function getRosePetalShapes(): confetti.Shape[] | ('circle')[] {
  if (cachedRosePetalShapes) return cachedRosePetalShapes;

  try {
    if (typeof window !== 'undefined' && typeof confetti.shapeFromPath === 'function') {
      // Natural curved rose petal
      const rosePetal1 = confetti.shapeFromPath({
        path: 'M 0 0 C -8 -12 -14 -24 -4 -34 C 6 -44 20 -36 16 -20 C 12 -8 5 -3 0 0 Z'
      });
      // Soft rounded rose petal
      const rosePetal2 = confetti.shapeFromPath({
        path: 'M 0 -20 C 11 -20 16 -12 16 0 C 16 12 11 20 0 20 C -11 20 -16 12 -16 0 C -16 -12 -11 -20 0 -20 Z'
      });
      // Gently fluttering petal
      const rosePetal3 = confetti.shapeFromPath({
        path: 'M 0 0 C -6 -10 -12 -20 -2 -28 C 8 -36 18 -28 14 -16 C 10 -8 5 -3 0 0 Z'
      });

      cachedRosePetalShapes = [rosePetal1, rosePetal2, rosePetal3];
      return cachedRosePetalShapes;
    }
  } catch (err) {
    console.warn('Rose petal shape initialization fallback:', err);
  }

  return ['circle'];
}

/**
 * Auspicious Rose Petals Shower
 * Delicate, sparse fluttering of deep crimson and red rose petals on button click.
 */
export const triggerRosePetalsShower = (originX: number = 0.5, originY: number = 0.5) => {
  try {
    playAuspiciousChime();
  } catch {
    // Silently ignore audio errors
  }

  // Pure natural rose petal tones (no yellow or gold)
  const rosePetalColors = [
    '#BE123C', // Deep Crimson Rose
    '#9F1239', // Velvet Ruby Rose
    '#E11D48', // Classic Red Rose
    '#DC2626', // Scarlet Rose
    '#FB7185'  // Soft Rose Pink Accent
  ];

  const shapes = getRosePetalShapes();

  try {
    // Single subtle, elegant toss with fewer petals (light quantity as requested)
    confetti({
      particleCount: 18,
      spread: 60,
      startVelocity: 22,
      origin: { x: originX, y: originY },
      colors: rosePetalColors,
      shapes: shapes,
      ticks: 280,
      gravity: 0.6,
      decay: 0.94,
      scalar: 1.3,
      drift: 0.05
    });
  } catch (err) {
    console.warn('Rose petals shower error:', err);
  }
};

// Aliases for compatibility
export const triggerGoldenPetalsShower = triggerRosePetalsShower;
export const triggerFirecrackers = triggerRosePetalsShower;

/**
 * Plays a gentle, auspicious chime sound suitable for a floral blessing
 */
function playAuspiciousChime() {
  if (typeof window === 'undefined') return;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.03, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // Soft single warm chime
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(660, t);

  gain.gain.setValueAtTime(0.04, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

  osc.connect(gain);
  gain.connect(masterGain);

  osc.start(t);
  osc.stop(t + 0.8);

  setTimeout(() => {
    try {
      ctx.close();
    } catch {}
  }, 1000);
}
