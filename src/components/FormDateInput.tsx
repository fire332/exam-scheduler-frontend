import type { DateTime } from 'luxon';
import DateWithCalendar from './DateWithCalendar';

export default function FormDateInput({ luxonDate }: { luxonDate: DateTime }) {
  return (
    <div className="w-px212 h-px84 border">
      <span className="text-xs text-gray-500">Date</span>
      <span className="text-xs text-error-500">*</span>
      <div className="rounded border border-gray-300 px-4 py-3">
        <DateWithCalendar luxonDate={luxonDate} />
      </div>
    </div>
  );
}
