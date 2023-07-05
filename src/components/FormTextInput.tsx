import { DotFilledIcon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import { useRef, type ComponentProps, type ComponentType } from 'react';

// TODO: fix outline/border styling on select for <input> field
// TODO: contextual outlining &

interface Props {
  expanded?: boolean;
  active?: boolean;
  inputId: string;
  labelText: string;
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
}

function FormTextInput({
  labelText,
  LeftIcon = DotFilledIcon,
  RightIcon = DotFilledIcon
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <div className="mb-4">
      <label
        className="mb-2 block text-sm text-surface-500"
        htmlFor="{inputId}"
      >
        {labelText}
      </label>

      <div
        onClick={handleClick}
        className="flex h-9 w-full rounded border border-surface-100 px-3 py-2 text-surface-900"
      >
        <div className="inline-flex items-center justify-center">
          <LeftIcon
            width="20"
            height="20"
            color="color(display-p3 0.11 0.137 0.192)"
          />
        </div>

        <input
          ref={inputRef}
          className="h-full appearance-none border-none focus:!border-none focus:!shadow-none"
          type="text"
          id="{inputId}"
        ></input>

        <div className="inline-flex items-center justify-center">
          <RightIcon
            width="20"
            height="20"
            color="color(display-p3 0.29 0.369 0.51)"
          />
        </div>
      </div>
    </div>
  );
}

export default FormTextInput;
