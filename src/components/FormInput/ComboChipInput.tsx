import { Cross2Icon, type Icon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import type { KeyboardEventHandler } from 'react';
import { useCallback, useState } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useController, type RegisterOptions } from 'react-hook-form';
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

export default function ComboChipInput<
  T extends FieldValues,
  N extends FieldPath<T>,
>({ labelText, labelIcon, inputName, validateOpts, helperText }: Props<N>) {
  const { field } = useController<T, N>({
    name: inputName,
    rules: validateOpts,
  });

  const isRequired: boolean =
    !!validateOpts &&
    (validateOpts.required === true ||
      (typeof validateOpts.required === 'object' &&
        validateOpts.required.value));

  const [chipsData, setChipsData] = useState<{ roomName: string }[]>(
    field.value,
  );

  const handleSubmit = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const copy = [...chipsData, { roomName: event.currentTarget.value }];
        field.onChange(copy);
        setChipsData(copy);
        event.currentTarget.value = '';
      }
    },
    [chipsData, field],
  );

  const removeChip = useCallback(
    (indexToRemove: number) => {
      const data = [...chipsData.filter((_, index) => index !== indexToRemove)];
      field.onChange(data);
      setChipsData(data);
    },
    [chipsData, field],
  );

  const chipsElements = chipsData.map((chip, index) => (
    <motion.button
      key={index}
      type="button"
      onClick={() => removeChip(index)}
      className="flex flex-row gap-2 rounded bg-surface-200 p-2 text-xs font-bold"
    >
      <span>{chip.roomName}</span>
      <div className="flex items-center rounded-full hover:bg-surface-400">
        <Cross2Icon width="15" height="15" />
      </div>
    </motion.button>
  ));

  if (chipsElements.length === 0) {
    chipsElements[0] = (
      <button disabled className="gap-2 p-2 text-xs font-bold opacity-0">
        &#8203;
      </button>
    );
  }

  return (
    <InputWrapper
      inputName={inputName}
      labelIcon={labelIcon}
      labelText={labelText}
      helperText={helperText}
      required={isRequired}
    >
      <motion.div layout className="inline-flex w-full flex-col">
        <AnimatePresence>
          <motion.input
            key={'input'}
            layout
            className="p-0"
            type="text"
            onKeyUp={handleSubmit}
          />

          {chipsElements.length !== 0 && (
            <>
              <motion.hr
                layout
                key={'divider'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="m-3"
              />
              <motion.div
                layout
                key={'chips'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-row flex-wrap gap-2"
              >
                <AnimatePresence>{chipsElements}</AnimatePresence>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </InputWrapper>
  );
}
