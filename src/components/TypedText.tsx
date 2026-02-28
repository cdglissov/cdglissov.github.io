import { useEffect, useMemo, useState } from 'react';

type TypedTextProps = {
  phrases: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseMs?: number;
  className?: string;
};

const splitIntoGraphemes = (value: string) => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: 'grapheme'
    });
    return Array.from(segmenter.segment(value), ({ segment }) => segment);
  }

  return Array.from(value);
};

export default function TypedText({
  phrases,
  typingSpeed = 65,
  erasingSpeed = 40,
  pauseMs = 1300,
  className = ''
}: TypedTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();

    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  const currentPhrase = useMemo(() => {
    if (phrases.length === 0) {
      return '';
    }

    return phrases[phraseIndex % phrases.length];
  }, [phraseIndex, phrases]);
  const graphemes = useMemo(() => splitIntoGraphemes(currentPhrase), [currentPhrase]);
  const shouldAnimate = !reduceMotion && phrases.length > 1;

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    let timeoutId = 0;

    if (!deleting && charIndex < graphemes.length) {
      timeoutId = window.setTimeout(() => setCharIndex((value) => value + 1), typingSpeed);
    } else if (!deleting && charIndex === graphemes.length) {
      timeoutId = window.setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIndex > 0) {
      timeoutId = window.setTimeout(() => setCharIndex((value) => value - 1), erasingSpeed);
    } else {
      setDeleting(false);
      setPhraseIndex((value) => (value + 1) % phrases.length);
    }

    return () => window.clearTimeout(timeoutId);
  }, [
    charIndex,
    deleting,
    erasingSpeed,
    graphemes.length,
    pauseMs,
    shouldAnimate,
    phrases.length,
    typingSpeed
  ]);

  if (phrases.length === 0) {
    return null;
  }

  const visibleText = shouldAnimate ? graphemes.slice(0, charIndex).join('') : currentPhrase;

  return (
    <span className={className} aria-label={currentPhrase}>
      {visibleText}
      {shouldAnimate && (
        <span className="ml-1 inline-block w-[1ch] animate-pulse text-accent" aria-hidden="true">
          |
        </span>
      )}
    </span>
  );
}
