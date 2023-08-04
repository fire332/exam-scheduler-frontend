import { PlusIcon } from '@radix-ui/react-icons';
import { useDLE } from '@rest-hooks/react';
import { useNavigate } from '@tanstack/router';
import FetchError from 'components/FetchError';
import FloatingActionButton from 'components/FloatingActionButton';
import LoadingSpinner from 'components/LoadingSpinner';
import PageHeader from 'components/PageHeader';
import { AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';
import { ExamRequestResource } from '../../api/ExamRequest';
import ExamListItem from '../../components/ExamListItem';

const centeringClasses =
  'w-full h-[calc(100%-_theme(spacing.20))] flex justify-center items-center';

export default function ListExamRequests() {
  const {
    data: requests,
    loading,
    error,
  } = useDLE(ExamRequestResource.getList);
  const navigate = useNavigate({ from: '/exam-requests' });

  const onClick = useCallback(
    () => void navigate({ to: '/exam-requests/new' }),
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
            Failed to load exam requests.
          </FetchError>
        </div>
      );
    if (loading)
      return (
        <div className={centeringClasses}>
          <LoadingSpinner />
        </div>
      );

    const listItems = requests.map((req) => (
      <ExamListItem key={req.requestId} examRequest={req} />
    ));

    return (
      <>
        <ol className="list-none">
          <AnimatePresence>{...listItems}</AnimatePresence>
        </ol>
        <FloatingActionButton onClick={onClick} icon={PlusIcon}>
          Add Request
        </FloatingActionButton>
      </>
    );
  })();

  return (
    <>
      <PageHeader>Exam Requests</PageHeader>
      {body}
    </>
  );
}
