import { ErrorMessage } from '@hookform/error-message';
import type { Icon } from '@radix-ui/react-icons';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
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
    <motion.label
      layout
      ref={ref}
      htmlFor={labelFor}
      className="inline-flex flex-col items-stretch gap-2 overflow-hidden"
    >
      <div className="text-xs font-medium text-surface-500">
        {labelText}
        {required && <span className="text-error-500">*</span>}
      </div>

      <div
        className={
          'relative inline-flex rounded-md border border-surface-300 text-surface-900 outline-none' +
          ' ' +
          '[&_input:focus]:!ring-0 [&_input]:inline-block [&_input]:min-w-0 [&_input]:flex-grow [&_input]:!border-none [&_input]:[background:none]' +
          ' ' +
          '[&:not(:has(>input))]:p-3' +
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
          <div className="pointer-events-none inline-flex w-[52px] items-center justify-center">
            <RightIcon width="20" height="20" className="text-error-500" />
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
    </motion.label>
  );
});

export default InputWrapper;
