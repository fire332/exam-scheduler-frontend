import { ClockIcon } from '@radix-ui/react-icons';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import InputWrapper from './InputWrapper';

interface Props<T> {
  labelText: string;
  helperText?: string;
  inputName: T;
  validateOpts?: Pick<RegisterOptions, 'required' | 'pattern'>;
}

function FormTimeInput<T extends FieldValues>({
  labelText,
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
      labelIcon={ClockIcon}
      labelText={labelText}
      helperText={helperText}
      required={isRequired}
    >
      <input type="time" {...register(inputName, validateOpts)} />
    </InputWrapper>
  );
}

export default FormTimeInput;
