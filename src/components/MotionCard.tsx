import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type MotionCardProps = PropsWithChildren<{
  className?: string;
}>;

export default function MotionCard({ children, className = '' }: MotionCardProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );
}
