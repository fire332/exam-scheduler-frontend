import * as icons from '@radix-ui/react-icons';
import type { HTMLProps, ReactElement } from 'react';

type ValueOf<T> = T[keyof T];

interface DrawerItem {
  icon?: ValueOf<typeof icons>;
}

interface Props {
  icon?: React.ReactNode;
  expanded: boolean;
  onBurgerClick?: HTMLProps<HTMLButtonElement>['onClick'];
  children: ReactElement<DrawerItem>[];
}

export default function Drawer({ children, expanded, onBurgerClick }: Props) {
  return (
    <nav
      className={
        'inline-flex h-full min-w-[4rem] max-w-[80px] flex-col justify-center' +
        ' ' +
        (expanded ? '' : 'gap-y-3')
      }
    >
      <button
        onClick={onBurgerClick}
        className="flex h-16 items-center justify-center"
      >
        <icons.HamburgerMenuIcon />
      </button>
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        {children}
      </div>
    </nav>
  );
}
