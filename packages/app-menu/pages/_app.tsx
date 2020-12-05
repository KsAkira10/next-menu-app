import { Container, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import withData from '../src/lib/apollo';
import { globalTheme } from '../src/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.StrictMode>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Nextjs + strapi" />
      </Head>
      <MuiThemeProvider theme={globalTheme}>
        <Container maxWidth="xl" disableGutters>
          <CssBaseline />
          <Component {...pageProps} />
        </Container>
      </MuiThemeProvider>
    </React.StrictMode>
  );
};

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  console.log(metric);
};

export default withData(MyApp);
