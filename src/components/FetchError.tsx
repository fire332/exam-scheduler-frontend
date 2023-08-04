import type { NetworkError } from '@rest-hooks/react';
import type { PropsWithChildren } from 'react';
import type { ExlusiveOr } from 'utility';

interface HttpStatusProp {
  httpStatus?: number;
}

interface NetworkErrorProp {
  error?: NetworkError;
}

type Props = ExlusiveOr<PropsWithChildren, HttpStatusProp, NetworkErrorProp>;

export default function FetchError({ httpStatus, error, children }: Props) {
  if (error) httpStatus = error.status;
  return (
    <div className="prose flex flex-col items-center justify-center text-error-500">
      <div className="text-7xl font-black text-error-400">x_x</div>
      <p>
        {children ?? 'Failed to retrieve resource.'}
        <br />
        {httpStatus && `HTTP status ${httpStatus}.`}
      </p>
    </div>
  );
}
