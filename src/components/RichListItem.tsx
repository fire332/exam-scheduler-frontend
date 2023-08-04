import { motion } from 'framer-motion';
import type { PropsWithChildren, ReactNode } from 'react';

// TODO: refactor to support all needed lists

interface Props {
  heading: string;
  subheading?: string;
  actionElements?: ReactNode;
}

function RichListItem({
  heading,
  subheading,
  children,
  actionElements,
}: PropsWithChildren<Props>) {
  return (
    <motion.li
      className="flex w-full flex-row gap-x-24 rounded-lg p-4 text-surface-900 hover:bg-surface-100"
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{
        x: { type: 'spring', damping: 100, mass: 3, stiffness: 1000 },
        opacity: { duration: 0.5, type: 'tween' },
      }}
    >
      <div className="grow">
        {subheading ?? <div className="text-lg font-bold">{subheading}</div>}
        <div className="text-xl font-bold">{heading}</div>
        <div className="color-surface-700 text-sm">{children}</div>
      </div>

      <div className="flex flex-row items-stretch gap-x-4">
        {actionElements}
      </div>
    </motion.li>
  );
}

export default RichListItem;
