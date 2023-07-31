import { PlusIcon } from '@radix-ui/react-icons';
import { useDLE } from '@rest-hooks/react';
import { useNavigate } from '@tanstack/router';
import { ScheduledExamResource } from 'api/ScheduledExam';
import FetchError from 'components/FetchError';
import FloatingActionButton from 'components/FloatingActionButton';
import LoadingSpinner from 'components/LoadingSpinner';
import { AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';
import ScheduledExamListItem from '../../components/ScheduledExamListItem';

const centeringClasses =
  'w-full h-[calc(100%-_theme(spacing.20))] flex justify-center items-center';

export default function ListScheduledExams() {
  const {
    data: exams,
    loading,
    error,
  } = useDLE(ScheduledExamResource.getList, {
    getAll: true,
    // date: '2023-09-07',
    // instructorId: '219195704583651585',
    // instructorId: '221523781573673217',
  });

  const navigate = useNavigate({ from: '/scheduled-exams' });

  const onClick = useCallback(
    () => void navigate({ to: '/scheduled-exams/new' }),
    [navigate],
  );

  const body = (() => {
    if (error)
      return (
        <div className={centeringClasses}>
          <FetchError
            httpStatus={
              typeof error.status === 'number' ? error.status : undefined
            }
          >
            Failed to load scheduled exams.
          </FetchError>
        </div>
      );
    if (loading)
      return (
        <div className={centeringClasses}>
          <LoadingSpinner />
        </div>
      );

    const listItems = exams.map((exam) => (
      <ScheduledExamListItem key={exam.examId} scheduledExam={exam} />
    ));

    return (
      <>
        <ol className="list-none">
          <AnimatePresence>{...listItems}</AnimatePresence>
        </ol>
        <FloatingActionButton onClick={onClick} icon={PlusIcon}>
          Add Exam
        </FloatingActionButton>
      </>
    );
  })();

  return (
    <>
      <header className="flex h-20 w-full items-center text-xl font-bold">
        Scheduled Exams
      </header>
      {body}
    </>
  );
}
