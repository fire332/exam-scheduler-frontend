import { PlusIcon } from '@radix-ui/react-icons';
import { useSuspense } from '@rest-hooks/react';
import { useNavigate } from '@tanstack/router';
import FloatingActionButton from 'components/FloatingActionButton';
import { AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';
import { ExamRequestResource } from '../../api/ExamRequest';
import ExamListItem from '../../components/ExamListItem';

export default function ListExamRequests() {
  const requests = useSuspense(ExamRequestResource.getList);
  const navigate = useNavigate({ from: '/exam-requests' });

  const onClick = useCallback(
    () => void navigate({ to: '/exam-requests/new' }),
    [navigate],
  );

  const listItems = requests.map((req) => (
    <ExamListItem key={req.requestId} examRequest={req} />
  ));

  return (
    <>
      <header className="flex h-20 w-full items-center text-xl font-bold">
        Exam slot requests
      </header>

      <ol className="list-none">
        <AnimatePresence>{...listItems}</AnimatePresence>
      </ol>

      <FloatingActionButton onClick={onClick} icon={PlusIcon}>
        Add Request
      </FloatingActionButton>
    </>
  );
}
