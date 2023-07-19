// TODO: replace with proper calendar view - plan to refactor this component away entirely?

import type { Icon } from '@radix-ui/react-icons';
import { DateTime } from 'luxon';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import InputWrapper from './InputWrapper';

function inputValueAsIso(value: string) {
  return DateTime.fromJSDate(new Date(value)).toISO({
    suppressSeconds: true,
    suppressMilliseconds: true,
  })!;
}

interface Props<T> {
  labelText: string;
  labelIcon?: Icon;
  helperText?: string;
  inputType?: string;
  inputName: T;
  validateOpts?: Pick<RegisterOptions, 'required' | 'validate'>;
}

function DateTimeInput<T extends FieldValues>({
  labelText,
  labelIcon,
  inputName,
  validateOpts,
  helperText,
}: Props<FieldPath<T>>) {
  const { register } = useFormContext<T>();

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
        type="datetime-local"
        {...register(
          inputName,
          Object.assign<RegisterOptions, typeof validateOpts>(
            { setValueAs: inputValueAsIso },
            validateOpts,
          ),
        )}
      />
    </InputWrapper>
  );
}

export default DateTimeInput;
