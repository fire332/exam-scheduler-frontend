import { useController, useSuspense } from '@rest-hooks/react';
import { Route, useNavigate } from '@tanstack/router';
import type { ExamRequestLike } from 'api/ExamRequest';
import { ExamRequestResource } from 'api/ExamRequest';
import RequestExamSlot from 'components/RequestExamSlot';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { dashboardRoute } from 'routing';
import ListExamRequests from './ListExamRequests';

export const examRequestsRoute = new Route({
  getParentRoute: () => dashboardRoute,
  path: 'exam-requests',
});

export const examRequestsIndexRoute = new Route({
  getParentRoute: () => examRequestsRoute,
  path: '/',
  component: ListExamRequests,
});

export const examRequestsAddRoute = new Route({
  getParentRoute: () => examRequestsRoute,
  path: 'new',
  component: function Component() {
    const ctrl = useController();
    const navigate = useNavigate({ from: '/' });

    const handleSubmit = useCallback<SubmitHandler<ExamRequestLike>>(
      (formData) => {
        const fetchPromise = ctrl.fetch(ExamRequestResource.create, formData);

        fetchPromise
          .then(() => {
            void navigate({ to: '/exam-requests', params: {} });
          })
          .catch((error) => console.error(`Error: ${error}`)); // TODO: best practices
      },
      [ctrl, navigate],
    );

    return <RequestExamSlot onSubmit={handleSubmit} />;
  },
});

export const examRequestsEditRoute = new Route({
  getParentRoute: () => examRequestsRoute,
  path: '$id',
  component: function Component({ useParams }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const examRequest = useSuspense(ExamRequestResource.get, {
      requestId: id,
    });
    const ctrl = useController();

    const handleSubmit = useCallback<SubmitHandler<ExamRequestLike>>(
      (formData) => {
        void ctrl
          .fetch(ExamRequestResource.update, { requestId: id }, formData)
          .then(() => navigate({ to: examRequestsIndexRoute.fullPath }));
      },
      [ctrl, id, navigate],
    );

    return (
      <RequestExamSlot examRequest={examRequest} onSubmit={handleSubmit} />
    );
  },
});
