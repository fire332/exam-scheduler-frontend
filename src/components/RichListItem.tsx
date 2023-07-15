import type { PropsWithChildren } from 'react';

// TODO: refactor to support all needed lists

interface Props {
  heading: string;
  subheading?: string;
}

function RichListItem({
  heading,
  subheading,
  children,
}: PropsWithChildren<Props>) {
  return (
    <li className="w-full list-none text-surface-900">
      {subheading ?? <div className="text-lg font-bold">{subheading}</div>}
      <div className="text-xl font-bold">{heading}</div>
      <div className="color-surface-700 text-sm">{children}</div>
    </li>
  );
}

export default RichListItem;