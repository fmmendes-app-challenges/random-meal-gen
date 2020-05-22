import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './global/styles';

import AppProvider from './hooks';
import Routes from './routes';
import Footer from './components/Footer';

const src: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
        <Footer />
      </AppProvider>

      <GlobalStyles />
    </BrowserRouter>
  );
};

export default src;
