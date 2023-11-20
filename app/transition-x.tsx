'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function TransitionX({ path }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        poiinterEvents="none"
        className="slide-inOut-x"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{
          duration: 0.25,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
          repeat: 1,
          repeatType: 'reverse',
        }}
      />
    </AnimatePresence>
  );
}
