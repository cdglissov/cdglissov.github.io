import { useEffect, useRef } from 'react';

type NebulaParticle = {
  alpha: number;
  drift: number;
  phase: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  spriteIndex: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

type StarParticle = {
  blue: number;
  green: number;
  phase: number;
  red: number;
  size: number;
  twinkleRate: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

const NEBULA_COLORS = ['#34d399', '#2dd4bf', '#67e8f9', '#0ea5e9', '#60a5fa', '#a78bfa'];
const STAR_CHANNEL_DIM = 77;
const STAR_CHANNEL_BRIGHT = 255;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
const starChannel = () => (Math.random() < 0.2 ? STAR_CHANNEL_DIM : STAR_CHANNEL_BRIGHT);

const wrapValue = (value: number, min: number, max: number) => {
  if (value < min) return max;
  if (value > max) return min;
  return value;
};

export default function AmbientBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let nebulaParticles: NebulaParticle[] = [];
    let starParticles: StarParticle[] = [];
    let nebulaSprites: HTMLCanvasElement[] = [];
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = 0;
    let height = 0;
    let rafId = 0;
    let resizeRafId = 0;
    let lastTime = 0;
    let stopped = false;
    let smokeLoaded = false;

    const smokeImage = new Image();
    smokeImage.decoding = 'async';
    smokeImage.src = '/smoke.png';

    const createNebulaSprites = () => {
      if (!smokeImage.width || !smokeImage.height) return;

      nebulaSprites = NEBULA_COLORS.map((color) => {
        const offscreen = document.createElement('canvas');
        offscreen.width = smokeImage.width;
        offscreen.height = smokeImage.height;
        const offscreenContext = offscreen.getContext('2d');
        if (!offscreenContext) return offscreen;

        offscreenContext.clearRect(0, 0, offscreen.width, offscreen.height);
        offscreenContext.drawImage(smokeImage, 0, 0);
        offscreenContext.globalCompositeOperation = 'source-atop';
        offscreenContext.fillStyle = color;
        offscreenContext.globalAlpha = 0.95;
        offscreenContext.fillRect(0, 0, offscreen.width, offscreen.height);
        offscreenContext.globalCompositeOperation = 'source-over';
        return offscreen;
      });

      smokeLoaded = true;
    };

    const targetCounts = (viewportWidth: number, viewportHeight: number) => ({
      nebula: Math.min(24, Math.max(12, Math.floor((viewportWidth * viewportHeight) / 110000))),
      stars: Math.min(380, Math.max(190, Math.floor((viewportWidth * viewportHeight) / 6000)))
    });

    const createNebulaParticle = (viewportWidth: number, viewportHeight: number): NebulaParticle => {
      const baseNebulaSize = Math.max(viewportWidth, viewportHeight) * 0.42;
      return {
        alpha: randomBetween(0.05, 0.14),
        drift: randomBetween(14, 42),
        phase: randomBetween(0, Math.PI * 2),
        rotation: randomBetween(0, Math.PI * 2),
        rotationSpeed: randomBetween(-0.015, 0.015),
        size: baseNebulaSize * randomBetween(0.5, 0.95),
        spriteIndex: Math.floor(Math.random() * NEBULA_COLORS.length),
        velocityX: randomBetween(-1.2, 1.2),
        velocityY: randomBetween(-0.9, 0.9),
        x: randomBetween(-viewportWidth * 0.15, viewportWidth * 1.15),
        y: randomBetween(-viewportHeight * 0.15, viewportHeight * 1.15)
      };
    };

    const createStarParticle = (viewportWidth: number, viewportHeight: number): StarParticle => ({
      blue: starChannel(),
      green: starChannel(),
      phase: randomBetween(0, Math.PI * 2),
      red: starChannel(),
      size: randomBetween(0.55, 2.35),
      twinkleRate: randomBetween(0.35, 1.1),
      velocityX: randomBetween(-2.8, 2.8),
      velocityY: randomBetween(-2.3, 2.3),
      x: randomBetween(0, viewportWidth),
      y: randomBetween(0, viewportHeight)
    });

    const resize = () => {
      const previousWidth = width || window.innerWidth;
      const previousHeight = height || window.innerHeight;
      const previousMax = Math.max(previousWidth, previousHeight);

      width = window.innerWidth;
      height = window.innerHeight;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const { nebula: targetNebulaCount, stars: targetStarCount } = targetCounts(width, height);

      if (!nebulaParticles.length || !starParticles.length) {
        nebulaParticles = Array.from({ length: targetNebulaCount }, () => createNebulaParticle(width, height));
        starParticles = Array.from({ length: targetStarCount }, () => createStarParticle(width, height));
        return;
      }

      const scaleX = width / previousWidth;
      const scaleY = height / previousHeight;
      const sizeScale = Math.max(width, height) / previousMax;

      for (const particle of nebulaParticles) {
        particle.x *= scaleX;
        particle.y *= scaleY;
        particle.size *= sizeScale;
      }

      for (const star of starParticles) {
        star.x *= scaleX;
        star.y *= scaleY;
      }

      if (nebulaParticles.length < targetNebulaCount) {
        while (nebulaParticles.length < targetNebulaCount) {
          nebulaParticles.push(createNebulaParticle(width, height));
        }
      } else if (nebulaParticles.length > targetNebulaCount) {
        nebulaParticles.length = targetNebulaCount;
      }

      if (starParticles.length < targetStarCount) {
        while (starParticles.length < targetStarCount) {
          starParticles.push(createStarParticle(width, height));
        }
      } else if (starParticles.length > targetStarCount) {
        starParticles.length = targetStarCount;
      }
    };

    const drawNebula = (time: number, delta: number) => {
      context.globalCompositeOperation = 'screen';

      for (const particle of nebulaParticles) {
        if (!reducedMotion) {
          particle.x += particle.velocityX * delta;
          particle.y += particle.velocityY * delta;
          particle.rotation += particle.rotationSpeed * delta;
        }

        const margin = particle.size * 0.35;
        particle.x = wrapValue(particle.x, -margin, width + margin);
        particle.y = wrapValue(particle.y, -margin, height + margin);

        const driftX = Math.sin(time * 0.09 + particle.phase) * particle.drift;
        const driftY = Math.cos(time * 0.07 + particle.phase * 1.3) * particle.drift * 0.7;
        const pulsing = 0.86 + Math.sin(time * 0.12 + particle.phase) * 0.14;

        context.save();
        context.translate(particle.x + driftX, particle.y + driftY);
        context.rotate(particle.rotation);
        context.globalAlpha = particle.alpha * pulsing;

        if (smokeLoaded && nebulaSprites[particle.spriteIndex]) {
          context.drawImage(
            nebulaSprites[particle.spriteIndex],
            -particle.size / 2,
            -particle.size / 2,
            particle.size,
            particle.size
          );
        } else {
          const radius = particle.size * 0.45;
          const fallback = context.createRadialGradient(0, 0, 0, 0, 0, radius);
          fallback.addColorStop(0, 'rgba(96, 165, 250, 0.2)');
          fallback.addColorStop(1, 'rgba(96, 165, 250, 0)');
          context.fillStyle = fallback;
          context.beginPath();
          context.arc(0, 0, radius, 0, Math.PI * 2);
          context.fill();
        }

        context.restore();
      }

      context.globalCompositeOperation = 'source-over';
    };

    const drawStars = (time: number, delta: number) => {
      for (const star of starParticles) {
        if (!reducedMotion) {
          const driftX = Math.sin((star.y + time * 24) * 0.006 + star.phase) * 0.72;
          const driftY = Math.cos((star.x + time * 16) * 0.007 + star.phase) * 0.58;
          star.x += (star.velocityX + driftX) * delta;
          star.y += (star.velocityY + driftY) * delta;
        }

        star.x = wrapValue(star.x, -4, width + 4);
        star.y = wrapValue(star.y, -4, height + 4);

        const twinkle = 0.2 + (Math.sin(time * star.twinkleRate + star.phase) * 0.5 + 0.5) * 0.52;
        context.fillStyle = `rgba(${star.red}, ${star.green}, ${star.blue}, ${twinkle.toFixed(3)})`;
        context.fillRect(star.x, star.y, star.size, star.size);
      }
    };

    const renderFrame = (timeMs: number, delta: number) => {
      const time = timeMs * 0.001;
      context.clearRect(0, 0, width, height);
      drawNebula(time, delta);
      drawStars(time, delta);
    };

    const drawFrame = (timeMs: number) => {
      if (stopped) return;

      const delta = Math.min((timeMs - lastTime) * 0.001 || 0.016, 0.05);
      lastTime = timeMs;
      renderFrame(timeMs, delta);

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;

      if (reducedMotion) {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
        drawFrame(performance.now());
      } else if (!rafId) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    const onResize = () => {
      if (resizeRafId) return;
      resizeRafId = window.requestAnimationFrame(() => {
        resizeRafId = 0;
        resize();
        lastTime = performance.now();
        renderFrame(lastTime, 0);
      });
    };

    resize();

    if (smokeImage.complete) {
      createNebulaSprites();
    } else {
      smokeImage.addEventListener('load', createNebulaSprites);
    }

    window.addEventListener('resize', onResize, { passive: true });
    reducedMotionQuery.addEventListener('change', onReducedMotionChange);

    if (reducedMotion) {
      drawFrame(performance.now());
    } else {
      rafId = window.requestAnimationFrame(drawFrame);
    }

    return () => {
      stopped = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      if (resizeRafId) window.cancelAnimationFrame(resizeRafId);
      window.removeEventListener('resize', onResize);
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange);
      smokeImage.removeEventListener('load', createNebulaSprites);
    };
  }, []);

  return (
    <div aria-hidden="true" className="ambient-canvas-wrap">
      <canvas className="ambient-canvas" ref={canvasRef} />
    </div>
  );
}
