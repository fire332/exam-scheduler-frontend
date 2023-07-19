import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import type { HTMLProps } from 'react';

interface Props {
  expanded: boolean;
  icon?: React.ReactNode;
  onBurgerClick?: HTMLProps<HTMLButtonElement>['onClick'];
}

export default function Drawer({
  expanded,
  children,
  onBurgerClick,
}: React.PropsWithChildren<Props>) {
  return (
    <motion.nav
      layout
      className={
        'flex h-full flex-col justify-center bg-surface-100 px-4' +
        ' ' +
        (expanded ? 'w-[360px]' : 'w-[96px]')
      }
    >
      <motion.div
        layout
        className={expanded ? 'flex items-center' : 'flex justify-center'}
      >
        <motion.button layout onClick={onBurgerClick} className={'h-16'}>
          {expanded ? <Cross1Icon /> : <HamburgerMenuIcon />}
        </motion.button>
        {expanded && (
          <motion.div layout className="inline-block px-4 text-surface-800">
            FIC Exam Scheduler
          </motion.div>
        )}
      </motion.div>
      <motion.div
        layout
        className="flex w-full flex-grow flex-col items-stretch justify-center gap-y-3"
      >
        {children}
      </motion.div>
    </motion.nav>
  );
}
