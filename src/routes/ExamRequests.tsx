import { CalendarIcon, ClockIcon, TimerIcon } from '@radix-ui/react-icons';
import { useSuspense } from '@rest-hooks/react';
import { DateTime } from 'luxon';
import { ExamRequestResource } from '../api/ExamRequest';
import AdditionalInfo from '../components/AdditionalInfo';
import ExamListItem from '../components/ExamListItem';

export default function ExamRequests() {
  const requests = useSuspense(ExamRequestResource.getList);

  const listItems = requests.map(({ courseCode, examDatePreferences }) => {
    const firstDate = examDatePreferences[0];
    const startDate = DateTime.fromMillis(firstDate.startTime);
    const endDate = DateTime.fromMillis(firstDate.endTime);
    const diff = endDate.diff(startDate, ['hours', 'minutes']);

    return (
      <ExamListItem heading={courseCode}>
        <AdditionalInfo Icon={CalendarIcon}>
          {startDate.toLocaleString({ month: 'long' })}
        </AdditionalInfo>

        <AdditionalInfo Icon={ClockIcon}>
          {startDate.toFormat('h')}am
        </AdditionalInfo>

        <AdditionalInfo Icon={TimerIcon}>{diff.toHuman()}</AdditionalInfo>
      </ExamListItem>
    );
  });

  return (
    <>
      <header className="flex h-20 w-full items-center text-xl font-bold">
        Exam slot requests
      </header>

      <ol className="list-none">{...listItems}</ol>
    </>
  );
}
