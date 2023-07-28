import { RootRoute, Route, Router } from '@tanstack/router';
import {
  examRequestsAddRoute,
  examRequestsEditRoute,
  examRequestsIndexRoute,
  examRequestsRoute,
} from 'routes/exam-requests/routing';
import Dashboard from './routes/Dashboard';
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute.addChildren([
    examRequestsRoute.addChildren([
      examRequestsIndexRoute,
      examRequestsAddRoute,
      examRequestsEditRoute,
    ]),
  ]),
]);

const router = new Router({ routeTree });

export { dashboardRoute, router };

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
