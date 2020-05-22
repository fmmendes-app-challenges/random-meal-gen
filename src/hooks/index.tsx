import React from 'react';

import { AuthProvider } from './auth';
import { SavedMealsProvider } from './saved';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <SavedMealsProvider>{children}</SavedMealsProvider>
    </AuthProvider>
  );
};

export default AppProvider;
