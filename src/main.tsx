import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { CacheProvider, DevToolsManager } from '@rest-hooks/react';
import { RouterProvider } from '@tanstack/router';
import { router } from './Routing';

// const userManager = new UserManager({
//   authority: 'https://fancy-runnable-unicorn-dfmpp0.zitadel.cloud/',
//   client_id: '219095101232709889@exam-scheduler',
//   redirect_uri: window.location.origin + '/dashboard/exam-requests',
//   scope: 'openid profile email',
//   monitorSession: true,
//   monitorAnonymousSession: true,
//   loadUserInfo: true,
//   mergeClaims: true
// });

// userManager.events.addUserLoaded(async () => {
//   AuthdEndpoint.accessToken = (await userManager.getUser())?.access_token;
//   console.log('token now: ', AuthdEndpoint.accessToken);
// });

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
