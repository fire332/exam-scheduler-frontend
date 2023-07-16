import { SlashIcon } from '@radix-ui/react-icons';
import { DateTime } from 'luxon';

function dtToNumbers(dt: DateTime): [string, string, string] {
  return dt.toLocaleString(DateTime.DATE_SHORT).split('/') as unknown as [
    string,
    string,
    string,
  ];
}

export default function Date({ luxonDate }: { luxonDate: DateTime }) {
  const dateFields = dtToNumbers(luxonDate);
  return (
    <div className="flex items-center text-sm">
      {dateFields[0].padStart(2, '0')}
      <div className="inline-block px-2">
        <SlashIcon />
      </div>
      {dateFields[1].padStart(2, '0')}
      <div className="inline-block px-2">
        <SlashIcon />
      </div>
      {dateFields[2].padStart(2, '0')}
    </div>
  );
}
