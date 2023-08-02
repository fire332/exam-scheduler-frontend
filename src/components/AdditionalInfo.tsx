import { DotFilledIcon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { ComponentProps, ComponentType, PropsWithChildren } from 'react';

interface Props {
  Icon?: ComponentType<
    ComponentProps<
      React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    >
  >;
}

function AdditionalInfo({
  Icon = DotFilledIcon,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="inline-flex items-center [&:not(:last-child)]:after:px-2 [&:not(:last-child)]:after:text-surface-500 [&:not(:last-child)]:after:content-['|']">
      <Icon width="14" height="14" className="mb-[1px] inline-block" />

      <span className="ml-2">{children}</span>
    </div>
  );
}

export default AdditionalInfo;
