import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Link, type MakeLinkOptions } from '@tanstack/router';
import { AnimatePresence, motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type Props = MakeLinkOptions;

const MotionLink = motion<MakeLinkOptions>(Link);

export default function PageHeader({
  children,
  ...linkOpts
}: PropsWithChildren<Props>) {
  return (
    <header className="mb-6 flex h-20 w-full items-stretch text-xl font-bold">
      <AnimatePresence>
        {linkOpts.to && (
          // @ts-expect-error idk how to fix type. Should work though.
          <MotionLink
            {...linkOpts}
            layoutId="sheet-header-back-button"
            initial={{ width: 0 }}
            animate={{ width: '2rem' }} // equivalent to w-8
            exit={{ width: 0 }}
            className="inline-flex items-center justify-center"
          >
            <ChevronLeftIcon width="24" height="24" />
          </MotionLink>
        )}
      </AnimatePresence>
      <motion.div layout className="inline-flex grow items-center">
        {children}
      </motion.div>
    </header>
  );
}
