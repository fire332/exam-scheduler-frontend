import { cva } from 'class-variance-authority';
import type { MouseEventHandler } from 'react';
import { ButtonIntent } from './constants';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  intent?: ButtonIntent;
}

const button = cva(
  [
    'h-16',
    'w-full',
    'min-w-[10rem]',
    'px-8',
    'rounded-full',
    'text-xl',
    'font-bold',
    'transition-all',
  ],
  {
    variants: {
      intent: {
        solid: [
          'border-2',
          'text-white',
          'bg-primary-400',
          'border-primary-400',
          'hover:bg-transparent',
          'hover:text-primary-400',
        ],
        outline: [
          'border-2',
          'text-primary-400',
          'border-primary-400',
          'hover:bg-primary-400',
          'hover:text-white',
        ],
        tonal: [
          'text-primary-700',
          'bg-primary-200',
          'hover:text-primary-600',
          'hover:bg-primary-300',
        ],
      },
    },
  },
);

export default function Button({
  children,
  onClick,
  intent = ButtonIntent.Solid,
}: React.PropsWithChildren<Props>) {
  return (
    <button onClick={onClick} className={button({ intent })}>
      {children}
    </button>
  );
}
