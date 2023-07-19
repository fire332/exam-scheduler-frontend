import { DragHandleDots2Icon, Pencil1Icon } from '@radix-ui/react-icons';
import type { DateTime } from 'luxon';
import DateWithCalendar from './DateWithCalendar';

export default function OrderedDate({ luxonDate }: { luxonDate: DateTime }) {
  return (
    <div className="h-12 w-80 justify-between px-3">
      <div className="inline-flex rounded bg-gray-50 shadow">
        <div className="inline-flex">
          <DragHandleDots2Icon />
        </div>
        <div className="mx-1 w-full">
          <DateWithCalendar luxonDate={luxonDate} />
        </div>
        <div className="inline-flex">
          <Pencil1Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
