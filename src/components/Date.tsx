import { SlashIcon } from '@radix-ui/react-icons';
import { DateTime } from 'luxon';

export default function Date({ luxonDate }: { luxonDate: DateTime }) {
  const dateString = luxonDate.toLocaleString(DateTime.DATE_SHORT);
  const dateFields = dateString.split('/');
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
