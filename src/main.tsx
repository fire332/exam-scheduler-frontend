/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import type * as icons from '@radix-ui/react-icons';
import { CacheProvider, DevToolsManager } from '@rest-hooks/react';
import { RouterProvider } from '@tanstack/router';
import { AuthProvider } from 'react-oidc-context';
import type { ValueOf } from 'utility';
import { authConfig } from './authConfig';
import { router } from './routing';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...authConfig}>
      <CacheProvider
        managers={[
          ...CacheProvider.defaultProps.managers,
          new DevToolsManager(),
        ]}
      >
        <RouterProvider router={router} />
        <TanStackRouterDevtools
          initialIsOpen={false}
          router={router}
          position="bottom-right"
        />
      </CacheProvider>
    </AuthProvider>
  </React.StrictMode>,
);

declare module '@radix-ui/react-icons' {
  type Icon = ValueOf<typeof icons>;
}
