import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes';
import { store } from './app/store';
import { AuthServiceContext } from './features/auth/AuthServiceContext';
import { createFirebaseAuthService } from './features/auth/firebase/createFirebaseAuthService';
import { listenToAuth } from './features/auth/listenToAuth';
import { DataServicesContext, type DataServices } from './app/DataServicesContext';
import { createFirestoreJournal } from './features/journal/firebase/createFirestoreJournal';
import { createGeminiAnalyst } from './features/journal/firebase/createGeminiAnalyst';
import { createFirestoreProgress } from './features/progress/firebase/createFirestoreProgress';
import { aiApp, auth, db } from './services/firebase';
import './index.css';
import './styles/theme.css';

// The only place that chooses which providers the app uses
const authService = auth ? createFirebaseAuthService(auth) : null;
const dataServices: DataServices | null = db
  ? {
      progress: createFirestoreProgress(db),
      journal: createFirestoreJournal(db),
      analyst: aiApp
        ? createGeminiAnalyst(aiApp, import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.8-flash')
        : null,
    }
  : null;
listenToAuth(authService, store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthServiceContext value={authService}>
      <DataServicesContext value={dataServices}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </DataServicesContext>
    </AuthServiceContext>
  </React.StrictMode>
);
