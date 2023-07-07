import { Outlet, RootRoute, Route, Router } from '@tanstack/router';
import Dashboard from './routes/Dashboard';
import ExamRequests from './routes/ExamRequests';
import Index from './routes/Index';

const rootRoute = new RootRoute({
  component: Outlet
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard
});

const examRequestsRoute = new Route({
  getParentRoute: () => dashboardRoute,
  path: '/exam-requests',
  component: ExamRequests
});

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute]);
dashboardRoute.addChildren([examRequestsRoute]);
const router = new Router({ routeTree });

export { router };

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
