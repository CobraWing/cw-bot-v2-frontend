import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { LoaderProvider } from './loader';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <LoaderProvider>{children}</LoaderProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
