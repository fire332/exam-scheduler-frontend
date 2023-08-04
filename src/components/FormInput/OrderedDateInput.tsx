import type { DateInfo } from 'components/Date';
import { Reorder } from 'framer-motion';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import InputWrapper from './InputWrapper';
import OrderedDateInputItem from './OrderedDateInputItem';

interface Props<N> {
  inputName: N;
  labelText: string;
  helperText?: string;
}

const toISOOpts = {
  suppressSeconds: true,
  suppressMilliseconds: true,
  extendedZone: true,
} as const;

export default function OrderedDateInput<
  InputName extends FieldPath<FormValues>,
  FormValues extends FieldValues,
>({ inputName, labelText, helperText }: Props<InputName>) {
  const { field } = useController<FormValues, InputName>({ name: inputName });
  // const [dates, setDates] = useState<(string | undefined)[]>(
  //   field.value ?? [undefined, undefined, undefined],
  // );

  const update = useCallback(
    (newDates: (string | undefined)[]) => {
      field.onChange(newDates);
      // setDates(newDates);
    },
    [field],
  );

  const handleChange = useCallback(
    (value: Date | null, index: number) => {
      const newDates = [...field.value];
      newDates.splice(
        index,
        1,
        value ? DateTime.fromJSDate(value).toISO(toISOOpts)! : undefined,
      );
      update(newDates);
    },
    // [dates, update],
    [field.value, update],
  );

  type DateInfoArray = (DateInfo | undefined)[];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const dateInfos = field.value.map((date: string) =>
    date ? DateTime.fromISO(date).toObject()! : undefined,
  ) as DateInfoArray;

  return (
    <InputWrapper
      inputName={inputName}
      labelText={labelText}
      helperText={helperText}
    >
      <Reorder.Group
        as="ol"
        values={dateInfos}
        onReorder={useCallback(
          (infos: DateInfoArray) =>
            update(
              infos.map(
                (info) => info && DateTime.fromObject(info).toISO(toISOOpts)!,
              ),
            ),
          [update],
        )}
        className="flex w-full flex-col gap-y-3"
      >
        {dateInfos.map((info, index) => (
          <OrderedDateInputItem
            key={JSON.stringify(info)}
            value={info}
            onBlur={field.onBlur}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(evt) =>
              handleChange(evt.currentTarget.valueAsDate, index)
            }
          />
        ))}
      </Reorder.Group>
    </InputWrapper>
  );
}
