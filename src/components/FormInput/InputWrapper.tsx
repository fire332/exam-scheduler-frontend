import { ErrorMessage } from '@hookform/error-message';
import type { Icon } from '@radix-ui/react-icons';
import type { FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import { useFormState } from 'react-hook-form';

function hasErrorMessages<T extends FieldValues>(errors: FieldErrors<T>) {
  return Reflect.ownKeys(errors).length > 0;
}

interface Props<T> {
  inputName: T;
  required?: boolean;
  labelFor: string;
  labelText: string;
  helperText?: string;
  labelIcon?: Icon;
}

function InputWrapper<T extends FieldValues>({
  inputName,
  required,
  labelFor,
  labelText,
  children,
  helperText,
  labelIcon,
}: React.PropsWithChildren<Props<FieldPath<T>>>) {
  const { isValid, errors } = useFormState<T>({ name: inputName, exact: true });

  const LeftIcon = labelIcon;
  const infoText = hasErrorMessages(errors) ? (
    /* @ts-expect-error bad library type */
    <ErrorMessage name={inputName} errors={errors} />
  ) : (
    helperText
  );

  return (
    <div className="inline-flex flex-col gap-2">
      <label
        htmlFor={labelFor}
        className="block text-xs font-medium text-surface-500"
      >
        {labelText}
        {required && <span className="text-error-500">*</span>}
      </label>

      <div
        className={
          'relative h-9 rounded-md border border-surface-300 text-surface-900 outline-none [&>*]:h-full [&>input:focus]:!ring-0 [&>input]:inline-block [&>input]:w-full [&>input]:!border-none [&>input]:[background:none]' +
          ' ' +
          (isValid
            ? 'focus-within:border-primary-500'
            : 'focus-within:border-error-500') +
          ' ' +
          (LeftIcon ? '[&>input]:pl-12' : '')
        }
      >
        {LeftIcon && (
          <div className="pointer-events-none absolute left-0 inline-flex w-12 items-center justify-center">
            <LeftIcon
              width="20"
              height="20"
              color="color(display-p3 0.11 0.137 0.192)"
            />
          </div>
        )}

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

      <div
        className={
          'block w-full text-xs empty:before:content-["​"]' +
          (isValid ? '' : ' text-error-500')
        }
      >
        {infoText}
      </div>
    </div>
  );
}

export default InputWrapper;
