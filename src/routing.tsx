import { Outlet, RootRoute, Route, Router } from '@tanstack/router';
import React from 'react';
import {
  examRequestsAddRoute,
  examRequestsEditRoute,
  examRequestsIndexRoute,
  examRequestsRoute,
} from 'routes/exam-requests/routing';
import {
  scheduledExamsAddRoute,
  scheduledExamsEditRoute,
  scheduledExamsIndexRoute,
  scheduledExamsRoute,
} from 'routes/scheduled-exams/routing';
import Dashboard from './routes/Dashboard';
import Index from './routes/Index';

// eslint-disable-next-line react-refresh/only-export-components
const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
    </>
  ),
});

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
    scheduledExamsRoute.addChildren([
      scheduledExamsIndexRoute,
      scheduledExamsAddRoute,
      scheduledExamsEditRoute,
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
