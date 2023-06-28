import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { CacheProvider, DevToolsManager } from '@rest-hooks/react';
import { RouterProvider } from '@tanstack/router';
import { router } from './Routing';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider
      managers={[...CacheProvider.defaultProps.managers, new DevToolsManager()]}
    >
      <RouterProvider router={router} />
    </CacheProvider>
  </React.StrictMode>
);
