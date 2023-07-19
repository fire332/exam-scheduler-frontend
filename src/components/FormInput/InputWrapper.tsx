import { ErrorMessage } from '@hookform/error-message';
import type { Icon } from '@radix-ui/react-icons';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import type { FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import { useFormState } from 'react-hook-form';

function hasErrorMessages<T extends FieldValues>(errors: FieldErrors<T>) {
  return Reflect.ownKeys(errors).length > 0;
}

interface Props<T> {
  inputName: T;
  required?: boolean;
  labelText: string;
  helperText?: string;
  labelIcon?: Icon;
}

function InputWrapper<T extends FieldValues>({
  inputName,
  required,
  labelText,
  children,
  helperText,
  labelIcon,
}: React.PropsWithChildren<Props<FieldPath<T>>>) {
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
    <label className="inline-flex flex-col gap-2">
      <div className="text-xs font-medium text-surface-500">
        {labelText}
        {required && <span className="text-error-500">*</span>}
      </div>

      <div
        className={
          'relative h-9 rounded-md border border-surface-300 text-surface-900 outline-none [&>*]:h-full' +
          ' ' +
          '[&>input:focus]:!ring-0 [&>input]:inline-block [&>input]:w-full [&>input]:!border-none [&>input]:[background:none]' +
          ' ' +
          (isValid
            ? 'focus-within:border-primary-500'
            : 'focus-within:border-error-500') +
          ' ' +
          (labelIcon ? '[&>input]:px-0' : '')
        }
      >
        {LeftIcon && (
          <div className="pointer-events-none inline-flex w-[52px] flex-grow items-center justify-center">
            <LeftIcon
              width="20"
              height="20"
              color="color(display-p3 0.11 0.137 0.192)"
            />
          </div>
        )}

        {children}

        <div
          className={
            'pointer-events-none inline-flex flex-grow items-center p-4' +
            ' ' +
            (isValid ? 'invisible' : 'visible')
          }
        >
          <RightIcon
            width="20"
            height="20"
            color="color(display-p3 0.949 0.188 0.188"
          />
        </div>
      </div>

      <div
        className={
          'block w-full text-xs empty:before:content-["​"]' +
          (isValid ? '' : ' text-error-500')
        }
      >
        {infoText}
      </div>
    </label>
  );
}

export default InputWrapper;
