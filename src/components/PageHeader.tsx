import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Link, type MakeLinkOptions } from '@tanstack/router';
import type { PropsWithChildren } from 'react';

type Props = MakeLinkOptions;

export default function PageHeader({
  children,
  ...linkOpts
}: PropsWithChildren<Props>) {
  return (
    <header className="mb-6 flex h-20 w-full items-stretch text-xl font-bold">
      {linkOpts.to && (
        <Link
          {...linkOpts}
          className="inline-flex w-8 items-center justify-center"
        >
          <ChevronLeftIcon width="24" height="24" />
        </Link>
      )}
      <div className="inline-flex items-center">{children}</div>
    </header>
  );
}
