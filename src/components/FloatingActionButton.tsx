import type { Icon } from '@radix-ui/react-icons';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import type { HTMLProps } from 'react';
import type { InclusiveOrWithChildren } from 'utility';

interface BaseProps {
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];
}

interface IconProp {
  icon: Icon;
}

type Props = InclusiveOrWithChildren<BaseProps, IconProp>;

const variants = {
  shown: {
    marginRight: '1rem', // equivalent to mr-4
    width: 'max-content',
    opacity: 1,
  },
  hidden: {
    marginRight: 0,
    width: 0,
    opacity: 0,
  },
} satisfies Variants;

export default function FloatingActionButton({
  onClick,
  icon,
  children,
}: Props) {
  const Icon = icon;
  return (
    <motion.button
      onClick={onClick}
      className={
        'm-4 flex h-[56px] items-center rounded-2xl bg-primary-200 text-sm font-bold text-primary-700 shadow-md transition-shadow hover:shadow-lg' +
        ' ' +
        (children ? 'min-w-[80px]' : '')
      }
    >
      {Icon && (
        <div className="inline-flex h-[56px] w-[56px] items-center justify-center">
          <Icon height="24" width="24" />
        </div>
      )}
      <AnimatePresence initial={!!Icon}>
        {children && (
          <motion.div
            layout
            layoutScroll
            initial="hidden"
            animate="shown"
            exit="hidden"
            variants={variants}
            className="inline-block overflow-hidden whitespace-nowrap first:ml-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
