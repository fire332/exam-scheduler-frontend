import type { Decorator } from '@storybook/react';

import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/router';

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
});

type PartialStoryFn<StoryArgs> = Parameters<Decorator<StoryArgs>>[0];

export default function RouterStoryDecorator<StoryArgs>(
  story: PartialStoryFn<StoryArgs>,
) {
  const rootRoute = new RootRoute();
  const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: story,
  });
  const routeTree = rootRoute.addChildren([indexRoute]);
  const router = new Router({
    routeTree,
    history: memoryHistory,
  });

  return <RouterProvider router={router} />;
}
