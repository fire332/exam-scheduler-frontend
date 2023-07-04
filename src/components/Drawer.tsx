import { HamburgerMenuIcon } from '@radix-ui/react-icons';

interface Props {
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Drawer({
  children,
  onClick,
}: React.PropsWithChildren<Props>) {
  return <nav className='h-full flex flex-col max-w-[80px] min-w-[4rem] justify-center'>
    <button onClick={onClick} className="h-16 flex justify-center items-center">
        <HamburgerMenuIcon/>
    </button>
    <div className='w-full flex flex-grow flex-col justify-center items-center'>
        {children}
    </div>
    </nav>;
}
