import type { Icon } from '@radix-ui/react-icons';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import InputWrapper from './InputWrapper';

interface Props<T> {
  labelText: string;
  inputName: T;
  labelIcon?: Icon;
  helperText?: string;
  stepValue?: number | string;
  validateOpts?: Pick<
    RegisterOptions,
    'required' | 'min' | 'max' | 'pattern' | 'setValueAs'
  >;
}

function NumericInput<T extends FieldValues>({
  labelText,
  labelIcon,
  stepValue = 1,
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
        type="number"
        step={stepValue}
        {...register(inputName, validateOpts)}
      />
    </InputWrapper>
  );
}

export default NumericInput;
