// TODO: limit year to 4 digits

import type { Icon } from '@radix-ui/react-icons';
import { DateTime } from 'luxon';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import InputWrapper from './InputWrapper';

function inputValueAsIso(value: string) {
  return DateTime.fromJSDate(new Date(value + 'T00:00')).toISO({
    suppressSeconds: true,
    suppressMilliseconds: true,
    extendedZone: true,
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

function DateInput<T extends FieldValues>({
  labelText,
  inputName,
  labelIcon,
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
        type="date"
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

export default DateInput;
