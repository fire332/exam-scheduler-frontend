import { RootRoute, Route, Router } from '@tanstack/router';
import App from './App';
import Index from './pages';

const rootRoute = new RootRoute({
  component: App
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index
});

const routeTree = rootRoute.addChildren([indexRoute]);
const router = new Router({ routeTree });

export { router };

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
