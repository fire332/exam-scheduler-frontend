import { RootRoute, Route, Router } from '@tanstack/router';
import RequestExamSlot from 'components/RequestExamSlot';
import Dashboard from './routes/Dashboard';
import ExamRequests from './routes/ExamRequests';
import Index from './routes/Index';

const rootRoute = new RootRoute();

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'dashboard',
  component: Dashboard,
});

const examRequestsRoute = new Route({
  getParentRoute: () => dashboardRoute,
  path: 'exam-requests',
});

const examRequestsIndexRoute = new Route({
  getParentRoute: () => examRequestsRoute,
  path: '/',
  component: ExamRequests,
});

const examRequestsEditRoute = new Route({
  getParentRoute: () => examRequestsIndexRoute,
  path: '$examRequestId',
  // eslint-disable-next-line @typescript-eslint/require-await
  async loader({ params }) {
    return params.examRequestId;
  },
  component: (props) => {
    return <RequestExamSlot initialValues={} />;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute.addChildren([
    examRequestsRoute.addChildren([
      examRequestsIndexRoute,
      examRequestsEditRoute,
    ]),
  ]),
]);

const router = new Router({ routeTree });

export { router };

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
