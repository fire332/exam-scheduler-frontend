import { CalendarIcon } from '@radix-ui/react-icons';
import type { DateTime } from 'luxon';
import Date from './Date';

export default function OrderedDate({ luxonDate }: { luxonDate: DateTime }) {
  return (
    <div className="flex border-2">
      <div className="inline-flex">
        <div className="pr-2">
          <CalendarIcon className="h-5 w-5" />
        </div>
        <div className="mx-2">
          <Date luxonDate={luxonDate} />
        </div>
      </div>
    </div>
  );
}
