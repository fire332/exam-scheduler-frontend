import { CalendarIcon, TimerIcon } from '@radix-ui/react-icons';
import { AsyncBoundary, useSuspense } from '@rest-hooks/react';
import { ExamRequestResource } from '../api/ExamRequest';
import AdditionalInfo from '../components/AdditionalInfo';
import ExamListItem from '../components/ExamListItem';
import FetchError from '../components/FetchError';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ExamRequests() {
  const requests = useSuspense(ExamRequestResource.getList);

  const listItems = requests.map(
    ({ requestId, courseCode, datePreferences, duration }) => {
      const humanDateList = datePreferences
        .map((dt) =>
          dt.toLocaleString({
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })
        )
        .join(' | ');

      return (
        <ExamListItem key={requestId} heading={courseCode}>
          <AdditionalInfo Icon={TimerIcon}>{duration.toHuman()}</AdditionalInfo>
          <AdditionalInfo Icon={CalendarIcon}>{humanDateList}</AdditionalInfo>
        </ExamListItem>
      );
    }
  );

  return (
    <>
      <header className="flex h-20 w-full items-center text-xl font-bold">
        Exam slot requests
      </header>
      <AsyncBoundary
        fallback={
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        }
        errorComponent={FetchError}
      >
        <ol className="list-none">{...listItems}</ol>
      </AsyncBoundary>
    </>
  );
}
