import { useEffect, useRef } from 'react';

type NebulaParticle = {
  alpha: number;
  coreAlpha: number;
  coreOffsetX: number;
  coreOffsetY: number;
  coreScale: number;
  dustAlpha: number;
  dustOffsetX: number;
  dustOffsetY: number;
  dustScale: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftX: number;
  driftY: number;
  overlayAlpha: number;
  overlayOffsetX: number;
  overlayOffsetY: number;
  overlayRotation: number;
  overlayRotationSpeed: number;
  overlayScale: number;
  paletteIndex: number;
  pulseAmount: number;
  pulseSpeed: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
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
  speedFactor: number;
  size: number;
  twinkleRate: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

type StarCluster = {
  radius: number;
  x: number;
  y: number;
};

type NebulaPalette = {
  core: string;
  dust: string;
  halo: string;
};

type NebulaSpriteSet = {
  core: HTMLCanvasElement;
  dust: HTMLCanvasElement;
  halo: HTMLCanvasElement;
};

type AlienFlight = {
  bobAmount: number;
  bobRate: number;
  control1X: number;
  control1Y: number;
  control2X: number;
  control2Y: number;
  driftXAmount: number;
  driftXPhase: number;
  driftXRate: number;
  driftYAmount: number;
  driftYPhase: number;
  driftYRate: number;
  durationMs: number;
  endX: number;
  endY: number;
  flipX: boolean;
  phase: number;
  size: number;
  startMs: number;
  startX: number;
  startY: number;
  wobbleAmount: number;
  wobbleRate: number;
};

const NEBULA_PALETTES: NebulaPalette[] = [
  { core: '#ad7fc2', dust: '#151922', halo: '#4f7290' },
  { core: '#bc7b9d', dust: '#121720', halo: '#66789a' },
  { core: '#84aec8', dust: '#171c24', halo: '#58798b' },
  { core: '#9b83ba', dust: '#131822', halo: '#637086' }
];
const STAR_CHANNEL_DIM = 77;
const STAR_CHANNEL_BRIGHT = 255;
const ALIEN_MIN_INTERVAL_MS = 18000;
const ALIEN_MAX_INTERVAL_MS = 30000;
const ALIEN_MIN_DURATION_MS = 12000;
const ALIEN_MAX_DURATION_MS = 20500;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
const starChannel = () => (Math.random() < 0.2 ? STAR_CHANNEL_DIM : STAR_CHANNEL_BRIGHT);
const clampValue = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;
const easeInOutSine = (progress: number) => 0.5 - Math.cos(progress * Math.PI) * 0.5;
const cubicBezier = (p0: number, p1: number, p2: number, p3: number, progress: number) => {
  const oneMinus = 1 - progress;
  return (
    oneMinus * oneMinus * oneMinus * p0 +
    3 * oneMinus * oneMinus * progress * p1 +
    3 * oneMinus * progress * progress * p2 +
    progress * progress * progress * p3
  );
};

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
    let starClusters: StarCluster[] = [];
    let nebulaSprites: NebulaSpriteSet[] = [];
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
    let alienLoaded = false;
    let alienFlight: AlienFlight | null = null;
    let nextAlienFlightAtMs = 0;

    const smokeImage = new Image();
    smokeImage.decoding = 'async';
    smokeImage.src = '/smoke.png';
    const alienImage = new Image();
    alienImage.decoding = 'async';
    alienImage.src = '/happy_alien.png';
    const onAlienLoad = () => {
      alienLoaded = true;
    };

    const scheduleAlienFlight = (fromMs: number) => {
      nextAlienFlightAtMs = fromMs + randomBetween(ALIEN_MIN_INTERVAL_MS, ALIEN_MAX_INTERVAL_MS);
    };

    const createAlienFlight = (startMs: number): AlienFlight => {
      const edge = Math.floor(randomBetween(0, 4));
      const margin = 90;
      let startX = 0;
      let startY = 0;
      let endX = 0;
      let endY = 0;

      if (edge === 0) {
        startX = -margin;
        startY = randomBetween(height * 0.15, height * 0.85);
        endX = width + margin;
        endY = clampValue(
          startY + randomBetween(-height * 0.26, height * 0.26),
          height * 0.1,
          height * 0.9
        );
      } else if (edge === 1) {
        startX = width + margin;
        startY = randomBetween(height * 0.15, height * 0.85);
        endX = -margin;
        endY = clampValue(
          startY + randomBetween(-height * 0.26, height * 0.26),
          height * 0.1,
          height * 0.9
        );
      } else if (edge === 2) {
        startX = randomBetween(width * 0.1, width * 0.9);
        startY = -margin;
        endX = clampValue(
          startX + randomBetween(-width * 0.25, width * 0.25),
          width * 0.06,
          width * 0.94
        );
        endY = height + margin;
      } else {
        startX = randomBetween(width * 0.1, width * 0.9);
        startY = height + margin;
        endX = clampValue(
          startX + randomBetween(-width * 0.25, width * 0.25),
          width * 0.06,
          width * 0.94
        );
        endY = -margin;
      }

      const dx = endX - startX;
      const dy = endY - startY;
      const distance = Math.hypot(dx, dy) || 1;
      const normalX = -dy / distance;
      const normalY = dx / distance;
      const tangentJitter = distance * randomBetween(0.05, 0.16);
      const lateralJitter = Math.min(
        Math.max(width, height) * 0.34,
        distance * randomBetween(0.2, 0.5)
      );

      const c1T = randomBetween(0.2, 0.42);
      const c2T = randomBetween(0.58, 0.82);
      const c1BaseX = lerp(startX, endX, c1T);
      const c1BaseY = lerp(startY, endY, c1T);
      const c2BaseX = lerp(startX, endX, c2T);
      const c2BaseY = lerp(startY, endY, c2T);

      const c1Lateral = randomBetween(-lateralJitter, lateralJitter);
      const c2Lateral = randomBetween(-lateralJitter, lateralJitter);
      const c1Tangent = randomBetween(-tangentJitter, tangentJitter);
      const c2Tangent = randomBetween(-tangentJitter, tangentJitter);
      const control1X = c1BaseX + normalX * c1Lateral + (dx / distance) * c1Tangent;
      const control1Y = c1BaseY + normalY * c1Lateral + (dy / distance) * c1Tangent;
      const control2X = c2BaseX + normalX * c2Lateral + (dx / distance) * c2Tangent;
      const control2Y = c2BaseY + normalY * c2Lateral + (dy / distance) * c2Tangent;

      return {
        bobAmount: randomBetween(3.5, 10),
        bobRate: randomBetween(1.2, 2.4),
        control1X,
        control1Y,
        control2X,
        control2Y,
        driftXAmount: randomBetween(2.5, 10),
        driftXPhase: randomBetween(0, Math.PI * 2),
        driftXRate: randomBetween(0.55, 1.85),
        driftYAmount: randomBetween(2.5, 10),
        driftYPhase: randomBetween(0, Math.PI * 2),
        driftYRate: randomBetween(0.55, 1.85),
        durationMs: randomBetween(ALIEN_MIN_DURATION_MS, ALIEN_MAX_DURATION_MS),
        endX,
        endY,
        flipX: endX < startX,
        phase: randomBetween(0, Math.PI * 2),
        size: clampValue(Math.min(width, height) * randomBetween(0.06, 0.085), 34, 72),
        startMs,
        startX,
        startY,
        wobbleAmount: randomBetween(0.04, 0.13),
        wobbleRate: randomBetween(0.8, 1.9)
      };
    };

    const createTintedNebulaSprite = (color: string, alpha: number) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = smokeImage.width;
      offscreen.height = smokeImage.height;
      const offscreenContext = offscreen.getContext('2d');
      if (!offscreenContext) return offscreen;

      offscreenContext.clearRect(0, 0, offscreen.width, offscreen.height);
      offscreenContext.drawImage(smokeImage, 0, 0);
      offscreenContext.globalCompositeOperation = 'source-atop';
      offscreenContext.fillStyle = color;
      offscreenContext.globalAlpha = alpha;
      offscreenContext.fillRect(0, 0, offscreen.width, offscreen.height);
      offscreenContext.globalCompositeOperation = 'source-over';
      return offscreen;
    };

    const createNebulaSprites = () => {
      if (!smokeImage.width || !smokeImage.height) return;

      nebulaSprites = NEBULA_PALETTES.map((palette) => ({
        core: createTintedNebulaSprite(palette.core, 0.76),
        dust: createTintedNebulaSprite(palette.dust, 0.8),
        halo: createTintedNebulaSprite(palette.halo, 0.6)
      }));

      smokeLoaded = true;
    };

    const targetCounts = (viewportWidth: number, viewportHeight: number) => ({
      nebula: Math.min(17, Math.max(8, Math.floor((viewportWidth * viewportHeight) / 165000))),
      stars: Math.min(380, Math.max(190, Math.floor((viewportWidth * viewportHeight) / 6000)))
    });

    const createNebulaParticle = (
      viewportWidth: number,
      viewportHeight: number
    ): NebulaParticle => {
      const baseNebulaSize = Math.max(viewportWidth, viewportHeight) * 0.42;
      return {
        alpha: randomBetween(0.03, 0.082),
        coreAlpha: randomBetween(0.72, 1.14),
        coreOffsetX: randomBetween(-0.11, 0.11),
        coreOffsetY: randomBetween(-0.11, 0.11),
        coreScale: randomBetween(0.46, 0.78),
        dustAlpha: randomBetween(0.36, 0.76),
        dustOffsetX: randomBetween(-0.09, 0.09),
        dustOffsetY: randomBetween(-0.09, 0.09),
        dustScale: randomBetween(0.68, 1.04),
        driftPhaseX: randomBetween(0, Math.PI * 2),
        driftPhaseY: randomBetween(0, Math.PI * 2),
        driftSpeedX: randomBetween(0.03, 0.11),
        driftSpeedY: randomBetween(0.02, 0.1),
        driftX: randomBetween(6, 28),
        driftY: randomBetween(4, 24),
        overlayAlpha: randomBetween(0.24, 0.54),
        overlayOffsetX: randomBetween(-0.13, 0.13),
        overlayOffsetY: randomBetween(-0.13, 0.13),
        overlayRotation: randomBetween(0, Math.PI * 2),
        overlayRotationSpeed: randomBetween(-0.005, 0.005),
        overlayScale: randomBetween(0.82, 1.3),
        paletteIndex: Math.floor(Math.random() * NEBULA_PALETTES.length),
        pulseAmount: randomBetween(0.024, 0.086),
        pulseSpeed: randomBetween(0.03, 0.1),
        rotation: randomBetween(0, Math.PI * 2),
        rotationSpeed: randomBetween(-0.006, 0.006),
        size: baseNebulaSize * randomBetween(0.48, 0.96),
        velocityX: randomBetween(-0.45, 0.45),
        velocityY: randomBetween(-0.36, 0.36),
        x: randomBetween(-viewportWidth * 0.25, viewportWidth * 1.25),
        y: randomBetween(-viewportHeight * 0.25, viewportHeight * 1.25)
      };
    };

    const createStarClusters = (viewportWidth: number, viewportHeight: number): StarCluster[] => {
      const area = viewportWidth * viewportHeight;
      const maxClusters = Math.min(6, Math.max(2, Math.floor(area / 240000)));
      const clusterCount = Math.floor(randomBetween(0, maxClusters + 1));

      return Array.from({ length: clusterCount }, () => {
        const spreadBase = Math.min(viewportWidth, viewportHeight);
        return {
          radius: randomBetween(spreadBase * 0.035, spreadBase * 0.11),
          x: randomBetween(viewportWidth * 0.08, viewportWidth * 0.92),
          y: randomBetween(viewportHeight * 0.08, viewportHeight * 0.92)
        };
      });
    };

    const createStarParticle = (
      viewportWidth: number,
      viewportHeight: number,
      clusters: StarCluster[]
    ): StarParticle => {
      const size = randomBetween(0.55, 2.35);
      const sizeRatio = (size - 0.55) / (2.35 - 0.55);
      const clusterChance = randomBetween(0.38, 0.66);
      const useCluster = clusters.length > 0 && Math.random() < clusterChance;

      let x = randomBetween(0, viewportWidth);
      let y = randomBetween(0, viewportHeight);

      if (useCluster) {
        const cluster = clusters[Math.floor(Math.random() * clusters.length)];
        const angle = randomBetween(0, Math.PI * 2);
        const distance = cluster.radius * Math.pow(Math.random(), 1.7);
        x = clampValue(cluster.x + Math.cos(angle) * distance, 0, viewportWidth);
        y = clampValue(cluster.y + Math.sin(angle) * distance, 0, viewportHeight);
      }

      return {
        blue: starChannel(),
        green: starChannel(),
        phase: randomBetween(0, Math.PI * 2),
        red: starChannel(),
        speedFactor: 0.85 + sizeRatio * 0.55,
        size,
        twinkleRate: randomBetween(0.35, 1.1),
        velocityX: randomBetween(-3.2, 3.2),
        velocityY: randomBetween(-2.6, 2.6),
        x,
        y
      };
    };

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
        starClusters = createStarClusters(width, height);
        nebulaParticles = Array.from({ length: targetNebulaCount }, () =>
          createNebulaParticle(width, height)
        );
        starParticles = Array.from({ length: targetStarCount }, () =>
          createStarParticle(width, height, starClusters)
        );
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
        if (Math.random() < 0.35) {
          starClusters = createStarClusters(width, height);
        }
        while (starParticles.length < targetStarCount) {
          starParticles.push(createStarParticle(width, height, starClusters));
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
          particle.overlayRotation += particle.overlayRotationSpeed * delta;
        }

        const margin = particle.size * 0.35;
        particle.x = wrapValue(particle.x, -margin, width + margin);
        particle.y = wrapValue(particle.y, -margin, height + margin);

        const driftX =
          Math.sin(time * particle.driftSpeedX + particle.driftPhaseX) * particle.driftX;
        const driftY =
          Math.cos(time * particle.driftSpeedY + particle.driftPhaseY) * particle.driftY;
        const pulsing =
          0.9 +
          Math.sin(time * particle.pulseSpeed + particle.driftPhaseX * 0.8) * particle.pulseAmount;

        context.save();
        context.translate(particle.x + driftX, particle.y + driftY);
        context.rotate(particle.rotation);
        context.globalAlpha = particle.alpha * pulsing;

        if (smokeLoaded && nebulaSprites[particle.paletteIndex]) {
          const spriteSet = nebulaSprites[particle.paletteIndex];
          const baseSize = particle.size;
          const overlaySize = baseSize * particle.overlayScale;
          const coreSize = baseSize * particle.coreScale;
          const dustSize = baseSize * particle.dustScale;
          const overlayX = baseSize * particle.overlayOffsetX;
          const overlayY = baseSize * particle.overlayOffsetY;
          const coreX = baseSize * particle.coreOffsetX;
          const coreY = baseSize * particle.coreOffsetY;
          const dustX = baseSize * particle.dustOffsetX;
          const dustY = baseSize * particle.dustOffsetY;

          context.drawImage(spriteSet.halo, -baseSize / 2, -baseSize / 2, baseSize, baseSize);

          context.save();
          context.rotate(particle.overlayRotation);
          context.globalAlpha = particle.alpha * particle.overlayAlpha * pulsing;
          context.drawImage(
            spriteSet.halo,
            -overlaySize / 2 + overlayX,
            -overlaySize / 2 + overlayY,
            overlaySize,
            overlaySize
          );
          context.restore();

          context.globalAlpha = particle.alpha * particle.coreAlpha * pulsing;
          context.drawImage(
            spriteSet.core,
            -coreSize / 2 + coreX,
            -coreSize / 2 + coreY,
            coreSize,
            coreSize
          );

          context.globalCompositeOperation = 'multiply';
          context.globalAlpha = particle.alpha * particle.dustAlpha * (0.72 + pulsing * 0.28);
          context.drawImage(
            spriteSet.dust,
            -dustSize / 2 + dustX,
            -dustSize / 2 + dustY,
            dustSize,
            dustSize
          );
          context.globalCompositeOperation = 'screen';
        } else {
          const radius = particle.size * 0.45;
          const fallback = context.createRadialGradient(0, 0, 0, 0, 0, radius);
          fallback.addColorStop(0, 'rgba(150, 146, 193, 0.11)');
          fallback.addColorStop(0.52, 'rgba(91, 116, 146, 0.08)');
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

    const drawAlien = (timeMs: number, time: number) => {
      if (reducedMotion || !alienLoaded || !alienImage.width || !alienImage.height) {
        return;
      }

      if (!alienFlight) {
        if (timeMs >= nextAlienFlightAtMs) {
          alienFlight = createAlienFlight(timeMs);
        } else {
          return;
        }
      }

      const progress = (timeMs - alienFlight.startMs) / alienFlight.durationMs;
      if (progress >= 1) {
        alienFlight = null;
        scheduleAlienFlight(timeMs);
        return;
      }

      const easedProgress = easeInOutSine(clampValue(progress, 0, 1));
      const fadeWindow = 0.12;
      const fadeIn = clampValue(progress / fadeWindow, 0, 1);
      const fadeOut = clampValue((1 - progress) / fadeWindow, 0, 1);
      const alpha = Math.min(fadeIn, fadeOut) * 0.88;
      const xPath = cubicBezier(
        alienFlight.startX,
        alienFlight.control1X,
        alienFlight.control2X,
        alienFlight.endX,
        easedProgress
      );
      const yPath = cubicBezier(
        alienFlight.startY,
        alienFlight.control1Y,
        alienFlight.control2Y,
        alienFlight.endY,
        easedProgress
      );
      const xDrift =
        Math.sin(time * alienFlight.driftXRate + alienFlight.driftXPhase) *
        alienFlight.driftXAmount;
      const yDrift =
        Math.sin(time * alienFlight.driftYRate + alienFlight.driftYPhase) *
        alienFlight.driftYAmount;
      const yBob = Math.sin(time * alienFlight.bobRate + alienFlight.phase) * alienFlight.bobAmount;
      const x = xPath + xDrift;
      const y = yPath + yDrift + yBob;
      const wobble =
        Math.sin(time * alienFlight.wobbleRate + alienFlight.phase) * alienFlight.wobbleAmount;

      context.save();
      context.translate(x, y);
      if (alienFlight.flipX) {
        context.scale(-1, 1);
      }
      context.rotate(wobble);
      context.globalAlpha = alpha;
      context.globalCompositeOperation = 'screen';
      context.drawImage(
        alienImage,
        -alienFlight.size / 2,
        -alienFlight.size / 2,
        alienFlight.size,
        alienFlight.size
      );
      context.globalCompositeOperation = 'source-over';
      context.restore();
    };

    const drawStars = (time: number, delta: number) => {
      for (const star of starParticles) {
        if (!reducedMotion) {
          const driftX = Math.sin((star.y + time * 24) * 0.006 + star.phase) * 0.84;
          const driftY = Math.cos((star.x + time * 16) * 0.007 + star.phase) * 0.66;
          const speed = star.speedFactor;
          star.x += (star.velocityX + driftX) * delta * speed;
          star.y += (star.velocityY + driftY) * delta * speed;
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
      drawAlien(timeMs, time);
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
        alienFlight = null;
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
        drawFrame(performance.now());
      } else if (!rafId) {
        scheduleAlienFlight(performance.now());
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
    scheduleAlienFlight(performance.now());

    if (smokeImage.complete) {
      createNebulaSprites();
    } else {
      smokeImage.addEventListener('load', createNebulaSprites);
    }

    if (alienImage.complete) {
      alienLoaded = true;
    } else {
      alienImage.addEventListener('load', onAlienLoad);
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
      alienImage.removeEventListener('load', onAlienLoad);
    };
  }, []);

  return (
    <div aria-hidden="true" className="ambient-canvas-wrap">
      <canvas className="ambient-canvas" ref={canvasRef} />
    </div>
  );
}
