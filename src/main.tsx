import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';

import { CacheProvider, DevToolsManager } from '@rest-hooks/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CacheProvider
      managers={[...CacheProvider.defaultProps.managers, new DevToolsManager()]}
    >
      <App />
    </CacheProvider>
  </React.StrictMode>
);
