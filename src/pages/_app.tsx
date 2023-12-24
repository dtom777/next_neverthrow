import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';

import { Notification } from '@/components/Notification';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Verdana, sans-serif',
        }}
      >
        <Notification />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default MyApp;
