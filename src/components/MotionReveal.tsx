import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type MotionRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export default function MotionReveal({ children, className = '', delay = 0 }: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
