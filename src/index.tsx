import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { GenresProvider } from './components/service/genre';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GenresProvider>
      <App />
    </GenresProvider>
  </React.StrictMode>
);