'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function TransitionY({ path }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        poiinterEvents="none"
        className="slide-inOut"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
          repeat: 1,
          repeatType: 'reverse',
        }}
      />
    </AnimatePresence>
  );
}
