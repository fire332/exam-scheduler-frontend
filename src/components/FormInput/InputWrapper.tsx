import type * as icons from '@radix-ui/react-icons';
import { DotFilledIcon } from '@radix-ui/react-icons';

type ValueOf<T> = T[keyof T];

interface Props {
  labelText: string;
  helperText?: string;
  labelIcon?: ValueOf<typeof icons>;
}

function InputWrapper({
  labelText,
  children,
  helperText,
  labelIcon = DotFilledIcon,
}: React.PropsWithChildren<Props>) {
  const LeftIcon = labelIcon;
  return (
    <div className="mb-4">
      <label
        // htmlFor={inputName}
        className="block text-xs font-medium leading-6 text-surface-500"
      >
        {labelText}
        <span className="text-error-500">*</span>
      </label>

      <div className="[&>input: relative mt-2 h-9 rounded-md border border-surface-300 text-surface-900 outline-none focus-within:border-primary-500 [&>*]:h-full [&>*]:w-full [&>input:focus]:!ring-0 [&>input:invalid]:border-error-500 [&>input]:!border-none [&>input]:[background:none]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <LeftIcon
            width="20"
            height="20"
            color="color(display-p3 0.11 0.137 0.192)"
          />
        </div>

        {children}
        {/* <input
          type="text"
          name={inputName}
          id={inputName}
          className="block w-full rounded-md border-0 py-1.5 pl-12 pr-12 text-surface-900 ring-1 ring-inset ring-surface-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
        /> */}

        {/* <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <RightIcon
            width="20"
            height="20"
            color={
              displayRightIconErrorColor
                ? 'color(display-p3 0.949 0.188 0.188'
                : 'color(display-p3 0.29 0.369 0.51)'
            }
          />
        </div> */}
      </div>

      <div className="mt-2 block w-full text-xs text-error-500">
        {helperText}
      </div>
    </div>
  );
}

export default InputWrapper;
