import {
  CalendarIcon,
  MinusCircledIcon,
  Pencil1Icon,
  TimerIcon,
} from '@radix-ui/react-icons';
import { useController } from '@rest-hooks/react';
import { Link } from '@tanstack/router';
import { ExamRequestResource, type ExamRequest } from 'api/ExamRequest';
import { useCallback } from 'react';
import {
  examRequestsEditRoute,
  examRequestsIndexRoute,
} from 'routes/exam-requests/routing';
import AdditionalInfo from './AdditionalInfo';
import RichListItem from './RichListItem';

interface Props {
  examRequest: ExamRequest;
}

export default function ExamListItem({
  examRequest: { requestId, courseCode, datePreferences, duration },
}: Props) {
  const ctrl = useController();

  const humanDateList = datePreferences
    .map((dt) =>
      dt.toLocaleString({
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    )
    .join(' | ');

  const handleDelete = useCallback(() => {
    void ctrl.fetch(ExamRequestResource.delete, {
      requestId,
    });
  }, [ctrl, requestId]);

  const actionButtons = (
    <>
      <Link
        className="flex items-center"
        from={examRequestsIndexRoute.fullPath}
        to={examRequestsEditRoute.fullPath}
        params={{ id: requestId }}
      >
        <Pencil1Icon width="20" height="20" />
      </Link>
      <Link onClick={handleDelete} className="flex items-center">
        <MinusCircledIcon width="20" height="20" />
      </Link>
    </>
  );

  return (
    <RichListItem heading={courseCode} actionElements={actionButtons}>
      <AdditionalInfo Icon={TimerIcon}>{duration.toHuman()}</AdditionalInfo>
      <AdditionalInfo Icon={CalendarIcon}>{humanDateList}</AdditionalInfo>
    </RichListItem>
  );
}
