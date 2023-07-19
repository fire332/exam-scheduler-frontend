// TODO: refactor / UI discussion?
// TODO: add 'hours' to input field if this is desired functionality
// TODO: require positive ->  validateOpts={{ min: 0 }}
import { TimerIcon } from '@radix-ui/react-icons';
import { Duration } from 'luxon';
import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import NumericInput from './NumericInput';

function valueAsIsoDuration(value: string): string | null {
  const minutes = parseInt(value);
  if (isNaN(minutes)) return null;
  return Duration.fromObject({ minutes }).toISO()!;
}

interface Props<T> {
  labelText: string;
  helperText?: string;
  stepValue?: number | string;
  inputName: T;
  validateOpts?: Pick<RegisterOptions, 'required' | 'min' | 'max'>;
}

function DurationInput<T extends FieldValues>(props: Props<FieldPath<T>>) {
  const validateOpts = Object.assign<
    RegisterOptions<T>,
    typeof props.validateOpts
  >({ setValueAs: valueAsIsoDuration }, props.validateOpts);

  return (
    <NumericInput
      labelIcon={TimerIcon}
      {...props}
      validateOpts={validateOpts}
    />
  );
}

export default DurationInput;
