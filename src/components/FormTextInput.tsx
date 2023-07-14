import { DotFilledIcon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { ComponentProps, ComponentType } from 'react';

// TODO: better management of contextual color for rightmost icon?
// TODO: implement trailing '...'
// TODO: use invalid: to style input border state

interface Props {
  inputName: string;
  labelText: string;
  errorText?: string;
  LeftIcon?: ComponentType<
    ComponentProps<
      React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    >
  >;
  RightIcon?: ComponentType<
    ComponentProps<
      React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    >
  >;
  showErrorMessage?: boolean;
  showErrorOutline?: boolean;
  isRequired?: boolean;
  displayRightIconErrorColor?: boolean;
}

function FormTextInput({
  inputName,
  labelText,
  errorText,
  showErrorMessage,
  isRequired,
  displayRightIconErrorColor,
  LeftIcon = DotFilledIcon,
  RightIcon = DotFilledIcon,
}: Props) {
  return (
    <div className="mb-4">
      <label
        htmlFor={inputName}
        className="block text-xs font-medium leading-6 text-surface-500"
      >
        {labelText}
        <span
          className={
            'text-error-500' + ' ' + (isRequired ? 'visible' : 'invisible')
          }
        >
          *
        </span>
      </label>
      <div className="relative mt-2 h-9 rounded-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <LeftIcon
            width="20"
            height="20"
            color="color(display-p3 0.11 0.137 0.192)"
          />
        </div>
        <input
          type="text"
          name={inputName}
          id={inputName}
          className="block w-full rounded-md border-0 py-1.5 pl-12 pr-12 text-surface-900 ring-1 ring-inset ring-surface-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
        />
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <RightIcon
            width="20"
            height="20"
            color={
              displayRightIconErrorColor
                ? 'color(display-p3 0.949 0.188 0.188'
                : 'color(display-p3 0.29 0.369 0.51)'
            }
          />
        </div>
      </div>

      <div
        className={
          'mt-2 block w-full text-xs text-error-500' +
          ' ' +
          (showErrorMessage ? 'visible' : 'invisible')
        }
      >
        {errorText}
      </div>
    </div>
  );
}

export default FormTextInput;
