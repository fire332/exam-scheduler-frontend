import { useController, useSuspense } from '@rest-hooks/react';
import { Route } from '@tanstack/router';
import type { ExamRequestLike } from 'api/ExamRequest';
import { ExamRequestResource } from 'api/ExamRequest';
import RequestExamSlot from 'components/RequestExamSlot';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { dashboardRoute } from 'routing';
import ListExamRequests from './ListExamRequests';

const examRequestsRoute = new Route({
  getParentRoute: () => dashboardRoute,
  path: 'exam-requests',
});

const examRequestsIndexRoute = new Route({
  getParentRoute: () => examRequestsRoute,
  path: '/',
  component: ListExamRequests,
});

const examRequestsEditRoute = new Route({
  getParentRoute: () => examRequestsRoute,
  path: '$id',
  component: function Component({ useParams }) {
    const { id } = useParams();
    const examRequest = useSuspense(ExamRequestResource.get, {
      id,
    });
    const ctrl = useController();

    const handleSubmit = useCallback<SubmitHandler<ExamRequestLike>>(
      (formData) => {
        void ctrl.fetch(ExamRequestResource.update, { id }, formData);
      },
      [ctrl, id],
    );

    return (
      <RequestExamSlot initialValues={examRequest} onSubmit={handleSubmit} />
    );
  },
});

examRequestsRoute.addChildren([examRequestsIndexRoute, examRequestsEditRoute]);

export default examRequestsRoute;
