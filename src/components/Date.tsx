import { CalendarIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { Fragment, type HTMLAttributes } from 'react';

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

function dtToNodes(dt: DateTime) {
  return dt.toLocaleParts(DateTime.DATE_SHORT).map(dtPartMapper);
}

function placeholderNodes(locale: string) {
  const parts = DateTime.fromObject(
    { year: 7777, month: 12, day: 27 },
    { locale },
  ).toLocaleParts(DateTime.DATE_SHORT);
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
}

export default function Date({
  value,
  locale = window.navigator.language,
  showIcon,
  className,
}: Props) {
  const nodes = value
    ? dtToNodes(DateTime.fromObject(value, { locale }))
    : placeholderNodes(locale);

  return (
    <span className={classNames('min-w-fit text-center text-sm', className)}>
      {showIcon && (
        <CalendarIcon width={20} height={20} className="mr-2 inline-block" />
      )}
      <span className="align-middle">{nodes}</span>
    </span>
  );
}
