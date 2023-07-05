import { HamburgerMenuIcon } from '@radix-ui/react-icons';

interface Props {
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Drawer({
  children,
  onClick
}: React.PropsWithChildren<Props>) {
  return (
    <nav className="inline-flex h-full min-w-[4rem] max-w-[80px] flex-col justify-center">
      <button
        onClick={onClick}
        className="flex h-16 items-center justify-center"
      >
        <HamburgerMenuIcon />
      </button>
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        {children}
      </div>
    </nav>
  );
}
