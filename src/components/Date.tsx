import { CalendarIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { Fragment, type HTMLAttributes } from 'react';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const formats = [
  DateTime.DATE_HUGE,
  DateTime.DATE_FULL,
  DateTime.DATE_MED_WITH_WEEKDAY,
  DateTime.DATE_MED,
  DateTime.DATE_SHORT,
] as const;

type DateFormat = ArrayElement<typeof formats>;

const dtPartMapper = (part: Intl.DateTimeFormatPart, index: number) => {
  switch (part.type) {
    case 'literal':
      return (
        <span key={index} className="mx-0.5 text-base font-bold">
          {part.value}
        </span>
      );
    default:
      return <Fragment key={index}>{part.value}</Fragment>;
  }
};

function dtToNodes(dt: DateTime, format: DateFormat) {
  return dt.toLocaleParts(format).map(dtPartMapper);
}

function placeholderNodes(locale: string, format: DateFormat) {
  const parts = DateTime.fromObject(
    { year: 7777, month: 12, day: 27 },
    { locale },
  ).toLocaleParts(format);
  const literalsUseHyphen = !!parts
    .filter((part) => part.type === 'literal')
    .find((part) => part.value === '-');

  return parts
    .map((part) => {
      if (part.type !== 'literal')
        part.value = part.value.replaceAll(
          /./gs,
          literalsUseHyphen ? '#' : '-',
        );

      return part;
    })
    .map(dtPartMapper);
}

export interface DateInfo {
  year: number;
  month: number;
  day: number;
}

interface Props {
  value?: DateInfo;
  locale?: string;
  showIcon?: boolean;
  className?: HTMLAttributes<HTMLSpanElement>['className'];
  format?: DateFormat;
}

export default function Date({
  value,
  locale = window.navigator.language,
  showIcon,
  className,
  format = DateTime.DATE_SHORT,
}: Props) {
  const nodes = value
    ? dtToNodes(DateTime.fromObject(value, { locale }), format)
    : placeholderNodes(locale, format);

  return (
    <span
      className={classNames(
        'inline-flex min-w-fit max-w-full items-center whitespace-nowrap',
        className,
      )}
    >
      {showIcon && (
        <CalendarIcon width={20} height={20} className="mr-2 inline-block" />
      )}
      <span className="inline-block">{nodes}</span>
    </span>
  );
}
