import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { CacheProvider, DevToolsManager } from '@rest-hooks/react';
import { RouterProvider } from '@tanstack/router';
import { AuthProvider } from 'oidc-react';
import { router } from './Routing';

const oidcConfig = {
  onSignIn: () => {
    // Redirect?
  },
  authority: 'https://fancy-runnable-unicorn-dfmpp0.zitadel.cloud/',
  clientId: '219095101232709889@exam-scheduler',
  redirectUri: window.location.origin,
  responseType: 'code',
  scope: 'openid profile email',
  autoSignIn: false
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <CacheProvider
        managers={[
          ...CacheProvider.defaultProps.managers,
          new DevToolsManager()
        ]}
      >
        <RouterProvider router={router} />
      </CacheProvider>
    </AuthProvider>
  </React.StrictMode>
);
