import isChromatic from 'chromatic/isChromatic';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCounter, useInterval } from 'react-timing-hooks';

const CHROMATIC_SNAPSHOT_ANGLE = 60;

export default function LoadingSpinner() {
  const [dots, setDots] = useState('.');
  const updateDots = () =>
    dots.length >= 3 ? setDots(dots.charAt(0)) : setDots(dots + dots.charAt(0));
  useInterval(updateDots, 500, { startOnMount: true });

  let [rotate] = useCounter({
    start: 0,
    interval: 250, // step every 250ms
    stepSize: 6, // stepSize 6 to emulate the # of positions of a clock's second hand
    startOnMount: true,
  });

  // Lock the angle for Chromatic snapshot testing
  if (isChromatic()) rotate = CHROMATIC_SNAPSHOT_ANGLE;

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
      <h2>{`Loading${dots}`}</h2>
    </div>
  );
}
