import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import type { HTMLProps } from 'react';

interface Props {
  expanded: boolean;
  icon?: React.ReactNode;
  onBurgerClick?: HTMLProps<HTMLButtonElement>['onClick'];
}

export default function Drawer({
  expanded,
  children,
  onBurgerClick
}: React.PropsWithChildren<Props>) {
  return (
    <nav
      className={
        'flex h-full flex-col justify-center bg-surface-100 px-4' +
        ' ' +
        (expanded ? 'w-[360px]' : 'w-[96px] gap-y-3')
      }
    >
      <div className={expanded ? 'flex items-center' : 'flex justify-center'}>
        <button onClick={onBurgerClick} className={'h-16'}>
          {expanded ? <Cross1Icon /> : <HamburgerMenuIcon />}
        </button>
        {expanded && (
          <div className="inline-block px-4 text-surface-800">
            FIC Exam Scheduler
          </div>
        )}
      </div>
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        {children}
      </div>
    </nav>
  );
}
