// TODO: improve look and feel when filling data from existing state

import { ErrorMessage } from '@hookform/error-message';
import type { Icon } from '@radix-ui/react-icons';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import type { ForwardedRef } from 'react';
import { forwardRef, type DOMAttributes } from 'react';
import type { FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import { useFormState } from 'react-hook-form';

function hasErrorMessages<T extends FieldValues>(errors: FieldErrors<T>) {
  return Reflect.ownKeys(errors).length > 0;
}

interface Props<T> {
  inputName: T;
  required?: boolean;
  labelText: string;
  labelFor?: string;
  helperText?: string;
  labelIcon?: Icon;
  labelIconOnClick?: DOMAttributes<HTMLButtonElement>['onClick'];
}

const InputWrapper = forwardRef(function InputWrapper<T extends FieldValues>(
  {
    inputName,
    required,
    labelText,
    labelFor,
    children,
    helperText,
    labelIcon,
    labelIconOnClick,
  }: React.PropsWithChildren<Props<FieldPath<T>>>,
  ref: ForwardedRef<HTMLLabelElement>,
) {
  const { isValid, errors } = useFormState<T>({ name: inputName, exact: true });

  const LeftIcon = labelIcon;
  const RightIcon = ExclamationTriangleIcon;

  const infoText = hasErrorMessages(errors) ? (
    /* @ts-expect-error bad library type */
    <ErrorMessage name={inputName} errors={errors} />
  ) : (
    helperText
  );

  return (
    <label
      ref={ref}
      htmlFor={labelFor}
      className="inline-flex flex-col items-stretch gap-2"
    >
      <div className="text-xs font-medium text-surface-500">
        {labelText}
        {required && <span className="text-error-500">*</span>}
      </div>

      <div
        className={
          'relative inline-flex h-9 rounded-md border border-surface-300 text-surface-900 outline-none [&>*]:h-full' +
          ' ' +
          '[&_input:focus]:!ring-0 [&_input]:inline-block [&_input]:min-w-0 [&_input]:flex-grow [&_input]:!border-none [&_input]:[background:none]' +
          ' ' +
          (isValid
            ? 'focus-within:border-primary-500'
            : 'focus-within:border-error-500 [&_input]:pr-0') +
          ' ' +
          (labelIcon ? '[&_input]:pl-0' : '')
        }
      >
        {LeftIcon && (
          <button
            className="group/label-icon inline-flex w-[52px] items-center justify-center"
            onClick={labelIconOnClick}
            disabled={!labelIconOnClick}
          >
            <div
              className={
                'flex h-8 w-8 items-center justify-center rounded-full transition-colors' +
                ' ' +
                (labelIconOnClick
                  ? 'group-hover/label-icon:bg-surface-100 group-hover/label-icon:text-surface-800'
                  : '')
              }
            >
              <LeftIcon width="20" height="20" />
            </div>
          </button>
        )}

        {children}

        {!isValid && (
          <div className={'inline-flex items-center p-4'}>
            <RightIcon
              width="20"
              height="20"
              color="color(display-p3 0.949 0.188 0.188"
            />
          </div>
        )}
      </div>

      <div
        className={
          'text-xs empty:before:content-["​"]' +
          (isValid ? '' : ' text-error-500')
        }
      >
        {infoText}
      </div>
    </label>
  );
});

export default InputWrapper;
