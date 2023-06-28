import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';

import { CacheProvider, DevToolsManager } from '@rest-hooks/react';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider
      managers={[...CacheProvider.defaultProps.managers, new DevToolsManager()]}
    >
      <App />
    </CacheProvider>
  </React.StrictMode>
);
