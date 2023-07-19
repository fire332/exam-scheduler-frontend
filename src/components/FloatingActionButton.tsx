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
  labelPresent: {
    width: undefined,
    margin: undefined,
    display: undefined,
  },
  labelAbsent: {
    width: '0px',
    margin: '0px',
    transitionEnd: {
      display: 'none',
    },
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
        <div className="inline-flex h-[56px] w-[56px] items-center justify-center ">
          <Icon height="24" width="24" />
        </div>
      )}
      <motion.div
        layoutScroll
        animate={children ? 'labelPresent' : 'labelAbsent'}
        variants={variants}
        className="mr-4 inline-block overflow-hidden first:ml-4"
      >
        <AnimatePresence>
          {children && (
            <motion.span
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="whitespace-nowrap"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
