import { generateCalendarDays, type Month } from 'components/Calendar/utility';
import type { DateTime } from 'luxon';
import MonthViewDate from './MonthViewDate';
import WeekdayBar from './WeekdayBar';

interface Props {
  month: Month;
  year: number;
  locale: string;
}

export default function Calendar({ month, year, locale }: Props) {
  const [lastMonth, thisMonth, nextMonth] = generateCalendarDays(
    year,
    month,
    locale,
  );

  const mapDisabledDate = (date: DateTime) => (
    <MonthViewDate
      key={date.toISODate()}
      day={date.day}
      disabled={true}
      current={date.day === new Date().getDate()}
    />
  );

  const days = [
    ...lastMonth.map(mapDisabledDate),
    ...thisMonth.map((date) => (
      <MonthViewDate
        key={date.toISODate()}
        day={date.day}
        current={date.day === new Date().getDate()}
      />
    )),
    ...nextMonth.map(mapDisabledDate),
  ];

  return (
    <div className="grid h-full w-full auto-rows-fr grid-cols-7 grid-rows-[min-content] place-items-stretch">
      <WeekdayBar locale={locale} />
      {...days}
    </div>
  );
}
