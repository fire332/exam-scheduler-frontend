import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import type * as icons from '@radix-ui/react-icons';
import { CacheProvider, DevToolsManager } from '@rest-hooks/react';
import { RouterProvider } from '@tanstack/router';
import { AuthProvider } from 'react-oidc-context';
import { router } from './Routing';
import { authConfig } from './authConfig';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
      </CacheProvider>
    </AuthProvider>
  </React.StrictMode>,
);

type ValueOf<T> = T[keyof T];
declare module '@radix-ui/react-icons' {
  type Icon = ValueOf<typeof icons>;
}
