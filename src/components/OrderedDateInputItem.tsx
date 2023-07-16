import {
  CalendarIcon,
  DragHandleDots2Icon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import type { DateTime } from 'luxon';
import Date from './Date';

export default function OrderedDate({ luxonDate }: { luxonDate: DateTime }) {
  return (
    <div className="w-px318 h-px50 mx-3 justify-between rounded bg-gray-50 shadow">
      <div className="inline-flex">
        <DragHandleDots2Icon />
      </div>
      <div className="inline-flex">
        <CalendarIcon />
        <Date luxonDate={luxonDate} />
      </div>
      <div className="inline-flex">
        <Pencil1Icon />
      </div>
    </div>
  );
}
