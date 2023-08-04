// TODO: implement trailing '...'
// TODO: bug in 'required' implementation?  or WAI?
import type { Icon } from '@radix-ui/react-icons';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import InputWrapper from './InputWrapper';

interface Props<T> {
  labelText: string;
  labelIcon?: Icon;
  helperText?: string;
  inputName: T;
  validateOpts?: Pick<
    RegisterOptions,
    'required' | 'maxLength' | 'minLength' | 'pattern'
  >;
}

function FormTextInput<T extends FieldValues>({
  labelText,
  labelIcon,
  inputName,
  validateOpts,
  helperText,
}: Props<FieldPath<T>>) {
  const { register } = useFormContext();

  const isRequired: boolean =
    !!validateOpts &&
    (validateOpts.required === true ||
      (typeof validateOpts.required === 'object' &&
        validateOpts.required.value));

  return (
    <InputWrapper
      inputName={inputName}
      labelIcon={labelIcon}
      labelText={labelText}
      helperText={helperText}
      required={isRequired}
    >
      <input
        // className="h-5"
        type="text"
        {...register(inputName, validateOpts)}
      />
    </InputWrapper>
  );
}

export default FormTextInput;
