import { arrangeLuxonWeekdays } from 'components/Calendar/utility';
import { Info } from 'luxon';

interface Props {
  locale: string;
}

export default function WeekdayBar({ locale }: Props) {
  return (
    <header className="col-span-7 grid grid-cols-[subgrid] grid-rows-1 place-items-stretch place-self-center text-center">
      {arrangeLuxonWeekdays(Info.weekdays('short', { locale }), locale).map(
        (name, index) => (
          <div
            key={index}
            className="inline-block whitespace-nowrap py-2 text-sm font-bold"
          >
            {name}
          </div>
        ),
      )}
    </header>
  );
}
