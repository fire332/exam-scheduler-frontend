import { useController, useSuspense } from '@rest-hooks/react';
import { Route, useNavigate } from '@tanstack/router';
import type { ScheduledExamLike } from 'api/ScheduledExam';
import { ScheduledExamResource } from 'api/ScheduledExam';
import AddExamSlot from 'components/Forms/AddExamSlot';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { dashboardRoute } from 'routing';
import ListScheduledExams from './ListScheduledExams';

export const scheduledExamsRoute = new Route({
  getParentRoute: () => dashboardRoute,
  path: 'scheduled-exams',
});

export const scheduledExamsIndexRoute = new Route({
  getParentRoute: () => scheduledExamsRoute,
  path: '/',
  component: ListScheduledExams,
});

export const scheduledExamsAddRoute = new Route({
  getParentRoute: () => scheduledExamsRoute,
  path: 'new',
  component: function Component() {
    const ctrl = useController();
    const navigate = useNavigate();

    const handleSubmit = useCallback<SubmitHandler<ScheduledExamLike>>(
      (formData) => {
        void ctrl
          .fetch(ScheduledExamResource.create, formData)
          .then(() => navigate({ to: scheduledExamsIndexRoute.fullPath }));
      },
      [ctrl, navigate],
    );

    return <AddExamSlot onSubmit={handleSubmit} />;
  },
});

export const scheduledExamsEditRoute = new Route({
  getParentRoute: () => scheduledExamsRoute,
  path: '$id',
  component: function Component({ useParams }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const scheduledExam = useSuspense(ScheduledExamResource.get, {
      examId: id,
    });
    const ctrl = useController();

    const handleSubmit = useCallback<SubmitHandler<ScheduledExamLike>>(
      (formData) => {
        void ctrl
          .fetch(ScheduledExamResource.update, { examId: id }, formData)
          .then(() => navigate({ to: scheduledExamsIndexRoute.fullPath }));
      },
      [ctrl, id, navigate],
    );

    return (
      <AddExamSlot scheduledExam={scheduledExam} onSubmit={handleSubmit} />
    );
  },
});
