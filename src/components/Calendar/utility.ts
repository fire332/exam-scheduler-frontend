import type { Info } from 'luxon';
import { DateTime, Interval } from 'luxon';
import type { DayOfWeek } from 'weekstart';
import { getWeekStartByLocale } from 'weekstart';

export enum Month {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

// https://stackoverflow.com/a/27810609
export function daysInMonth(y: number, m: Month) {
  return m === Month.FEBRUARY
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1);
}

// https://stackoverflow.com/a/51918448
function firstDayOfWeek(dateObject: Date, firstDayOfWeekIndex: number) {
  const dayOfWeek = dateObject.getDay(),
    firstDayOfWeek = new Date(dateObject),
    diff =
      dayOfWeek >= firstDayOfWeekIndex
        ? dayOfWeek - firstDayOfWeekIndex
        : 6 - dayOfWeek;

  firstDayOfWeek.setDate(dateObject.getDate() - diff);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  return firstDayOfWeek;
}

// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Patterns_Week_Elements
export function minimalDays(year: number, month: Month, locale: string) {
  const firstDayWeekday = DateTime.local(year, month, 1);
  return (
    7 -
    Interval.fromDateTimes(
      DateTime.fromJSDate(
        firstDayOfWeek(
          firstDayWeekday.toJSDate(),
          getWeekStartByLocale(locale),
        ),
      ),
      firstDayWeekday,
    )
      .toDuration()
      .as('days')
  );
}

/**
 * `getWeekStartByLocale` starts with Sunday = 0 while `Info.weekdays` starts with Monday = 0
 * @param weekStart
 */
export function normalizeWeekStartForLuxon(weekStart: number): DayOfWeek {
  weekStart = weekStart - 1;
  if (weekStart < 0) weekStart = 6;
  return weekStart as DayOfWeek;
}

/**
 *
 * @param weekdays result of call to `Info.weekdays`
 */
export function arrangeLuxonWeekdays(
  weekdays: ReturnType<typeof Info.weekdays>,
  locale: string,
): string[] {
  const weekStart = normalizeWeekStartForLuxon(getWeekStartByLocale(locale));
  const result = [
    ...weekdays.slice(weekStart),
    ...weekdays.slice(0, weekStart),
  ];

  return result;
}

export function generateCalendarDays(
  year: number,
  month: Month,
  locale: string,
): [DateTime[], DateTime[], DateTime[]] {
  const lastMonthDays = daysInMonth(year, month - 1);
  const currentMonthDays = daysInMonth(year, month);
  const calendarOffset = 7 - minimalDays(year, month, locale);

  const lastMonth = [];
  const thisMonth = [];
  const nextMonth = [];

  for (let i = -calendarOffset; i < 0; ++i)
    lastMonth.push(
      DateTime.fromObject(
        { year, month: month - 1, day: lastMonthDays + i + 1 },
        { locale },
      ),
    );

  for (let day = 1; day <= currentMonthDays; ++day)
    thisMonth.push(DateTime.fromObject({ year, month, day }, { locale }));

  for (
    let day = 1;
    (lastMonth.length + thisMonth.length + nextMonth.length) % 7 !== 0;
    ++day
  )
    nextMonth.push(
      DateTime.fromObject({ year, month: month + 1, day }, { locale }),
    );

  return [lastMonth, thisMonth, nextMonth];
}
