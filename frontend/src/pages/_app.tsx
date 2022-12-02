import { appWithTranslation, i18n } from 'next-i18next';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import React, { useEffect } from 'react';
import App from 'next/app';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const loginPage = [`/login`].includes(appProps.router.pathname);
  const registerPage = [`/register`].includes(appProps.router.pathname);

  const LayoutComponent = loginPage || registerPage ? React.Fragment : Layout;

  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}

MyApp.getInitialProps = async (appContext: any) => ({
  ...(await App.getInitialProps(appContext))
});

export default appWithTranslation(MyApp);
