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

declare module '@radix-ui/react-icons' {
  type Icon = ValueOf<typeof icons>;
}
