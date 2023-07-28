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
      className="w-full flex gap-x-24 p-4 flex-row text-surface-900 hover:bg-surface-100 rounded-lg"
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
    >
      <div className="grow">
        {subheading ?? <div className="text-lg font-bold">{subheading}</div>}
        <div className="text-xl font-bold">{heading}</div>
        <div className="color-surface-700 text-sm">{children}</div>
      </div>

      <div className="flex flex-row gap-x-4 items-stretch">
        {actionElements}
      </div>
    </motion.li>
  );
}

export default RichListItem;
