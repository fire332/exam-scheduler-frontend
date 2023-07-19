// TODO: refactor / UI discussion?
// TODO: add 'hours' to input field if this is desired functionality
import { TimerIcon } from '@radix-ui/react-icons';
import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import Component from './NumericInput';

interface Props<T> {
  labelText: string;
  helperText?: string;
  stepValue?: number | string;
  inputName: T;
  validateOpts?: Pick<
    RegisterOptions,
    'required' | 'min' | 'max' | 'setValueAs'
  >;
}

function DateInput<T extends FieldValues>(props: Props<FieldPath<T>>) {
  return <Component labelIcon={TimerIcon} {...props} />;
}

export default DateInput;
