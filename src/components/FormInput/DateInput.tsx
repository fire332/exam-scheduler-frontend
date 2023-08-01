import type { Icon } from '@radix-ui/react-icons';
import { DateTime } from 'luxon';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

import type { ComponentProps } from 'react';
import { useCallback, useId, useRef } from 'react';
import InputWrapper from './InputWrapper';

function inputValueAsIso(value: string) {
  return DateTime.fromJSDate(new Date(value + 'T00:00:00')).toISO({
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
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const inputAttrs = register(
    inputName,
    Object.assign<RegisterOptions, typeof validateOpts>(
      { setValueAs: inputValueAsIso },
      validateOpts,
    ),
  );

  const isRequired: boolean =
    !!validateOpts &&
    (validateOpts.required === true ||
      (typeof validateOpts.required === 'object' &&
        validateOpts.required.value));

  const handleIconClick = useCallback<
    Exclude<ComponentProps<typeof InputWrapper>['labelIconOnClick'], undefined>
  >((evt) => {
    evt.preventDefault();
    evt.currentTarget.focus();
    inputRef.current?.showPicker();
  }, []);

  return (
    <InputWrapper
      inputName={inputName}
      labelIcon={labelIcon}
      labelIconOnClick={handleIconClick}
      labelText={labelText}
      labelFor={id}
      helperText={helperText}
      required={isRequired}
    >
      <div className="relative flow-root flex-grow">
        <input
          id={id}
          type="date"
          className="h-full w-full [&::-webkit-calendar-picker-indicator]:hidden"
          {...inputAttrs}
          ref={mergeRefs([inputRef, inputAttrs.ref])}
        />
      </div>
    </InputWrapper>
  );
}

export default DateInput;
