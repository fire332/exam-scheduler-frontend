import type { PropsWithChildren } from 'react';

interface Props {
  heading: string;
}

function RequestListItem({ heading, children }: PropsWithChildren<Props>) {
  return (
    <div className="w-full text-surface-900">
      <div className="text-xl font-bold">{heading}</div>
      <div className="color-surface-700 text-sm">{children}</div>
    </div>
  );
}

export default RequestListItem;
