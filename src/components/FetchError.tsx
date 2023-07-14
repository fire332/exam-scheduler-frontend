import type { NetworkError } from '@rest-hooks/react';
import type { PropsWithChildren } from 'react';

interface ErrorComponentProps {
  error: NetworkError;
}

export default function FetchError({
  error,
  children,
}: PropsWithChildren<ErrorComponentProps>) {
  return (
    <div className="prose flex h-full max-w-full flex-col items-center justify-center text-error-500">
      <div className="text-7xl font-black text-error-400">x_x</div>
      <p>
        {children ?? 'Failed to retrieve resource.'}
        <br />
        {`HTTP status ${error.status}.`}
      </p>
    </div>
  );
}
