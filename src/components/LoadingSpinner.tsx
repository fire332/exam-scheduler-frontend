import isChromatic from 'chromatic/isChromatic';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useCounter, useInterval } from 'react-timing-hooks';
import { inRange } from 'utility';

const CHROMATIC_SNAPSHOT_ANGLE = 60;

const dotVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  invisible: {
    opacity: 0,
    y: 6,
  },
};

export default function LoadingSpinner() {
  const [dots, setDots] = useState(0);
  const updateDots = () => (dots === 5 ? setDots(0) : setDots(dots + 1));
  useInterval(updateDots, 500, { startOnMount: true });

  let [rotate] = useCounter({
    start: 0,
    interval: 250, // step every 250ms
    stepSize: 6, // stepSize 6 to emulate the # of positions of a clock's second hand
    startOnMount: true,
  });

  // Lock the angle for Chromatic snapshot testing
  if (isChromatic()) rotate = CHROMATIC_SNAPSHOT_ANGLE;

  const dotEles: ReactNode[] = [];

  for (let i = 0; i < 3; ++i) {
    dotEles.push(
      <motion.span
        key={i}
        className="inline-block"
        animate={inRange(dots, i + 1, i + 3) ? 'visible' : 'invisible'}
        variants={dotVariants}
        transition={{
          y: { type: 'spring', damping: 9, mass: 1, stiffness: 1000 },
          type: 'tween',
          duration: 0.15,
        }}
      >
        .
      </motion.span>,
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 select-none">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-visible rounded-full border-4 border-primary-400">
          <motion.div
            animate={{ rotate }}
            transition={{
              type: 'spring',
              stiffness: 2000,
              damping: 40,
              mass: 1,
            }}
            className="h-[86%] w-0.5"
          >
            <div className="h-1/2 rounded-full bg-primary-500" />
          </motion.div>
        </div>
      </div>
      <h2>Loading{dotEles}</h2>
    </div>
  );
}
