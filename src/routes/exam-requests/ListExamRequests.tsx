import { CalendarIcon, TimerIcon } from '@radix-ui/react-icons';
import { useSuspense } from '@rest-hooks/react';
import { ExamRequestResource } from '../../api/ExamRequest';
import AdditionalInfo from '../../components/AdditionalInfo';
import ExamListItem from '../../components/RichListItem';

export default function ListExamRequests() {
  const requests = useSuspense(ExamRequestResource.getList);

  const listItems = requests.map(
    ({ requestId, courseCode, datePreferences, duration }) => {
      const humanDateList = datePreferences
        .map((dt) =>
          dt.toLocaleString({
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
        )
        .join(' | ');

      return (
        <ExamListItem key={requestId} heading={courseCode}>
          <AdditionalInfo Icon={TimerIcon}>{duration.toHuman()}</AdditionalInfo>
          <AdditionalInfo Icon={CalendarIcon}>{humanDateList}</AdditionalInfo>
        </ExamListItem>
      );
    },
  );

  return (
    <>
      <header className="flex h-20 w-full items-center text-xl font-bold">
        Exam slot requests
      </header>

      <ol className="list-none">{...listItems}</ol>
    </>
  );
}
