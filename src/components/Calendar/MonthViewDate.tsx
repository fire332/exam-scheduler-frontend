import type { PropsWithChildren } from 'react';

interface Props {
  day: number;
  current?: boolean;
  disabled?: boolean;
}

export default function MonthViewDate({
  day,
  current = false,
  disabled = false,
  children,
}: PropsWithChildren<Props>) {
  if (disabled) current = false;

  return (
    <div
      className={
        'inline-block border-l border-t border-surface-200 p-1.5 text-xs [&:nth-of-type(7n+1)]:border-l-0' +
        ' ' +
        (disabled ? 'bg-surface-300 text-surface-600' : '')
      }
    >
      <div
        className={
          'w-fit rounded-full p-1' +
          ' ' +
          (current ? 'bg-primary-500 font-bold text-surface-900' : '')
        }
      >
        {day}
      </div>
      <div>{children}</div>
    </div>
  );
}
