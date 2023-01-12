import { appWithTranslation } from 'next-i18next';
import '../../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import React from 'react';
import App from 'next/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const loginPage = [`/login`].includes(appProps.router.pathname);
  const registerPage = [`/register`].includes(appProps.router.pathname);

  const LayoutComponent = loginPage || registerPage ? React.Fragment : Layout;

  return (
    <LayoutComponent>
      <Component {...pageProps} />
      <ToastContainer />
    </LayoutComponent>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext))
});

export default appWithTranslation(MyApp);
