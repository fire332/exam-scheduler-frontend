import { RootRoute, Route, Router } from '@tanstack/router';
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute.addChildren([
    examRequestsRoute.addChildren([examRequestsIndexRoute]),
  ]),
]);

const router = new Router({ routeTree });

export { router };

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
