import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes';
import { store } from './app/store';
import { AuthServiceContext } from './features/auth/AuthServiceContext';
import { createFirebaseAuthService } from './features/auth/firebase/createFirebaseAuthService';
import { listenToAuth } from './features/auth/listenToAuth';
import { auth } from './services/firebase';
import './index.css';

// The only place that chooses which authentication provider the app uses
const authService = auth ? createFirebaseAuthService(auth) : null;
listenToAuth(authService, store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthServiceContext value={authService}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthServiceContext>
  </React.StrictMode>
);
