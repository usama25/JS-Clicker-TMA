// pages/_app.tsx
import type { AppProps } from 'next/app';
import { CoinProvider } from '../context/CoinContext';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import '../styles/globals.css';

const manifestUrl = 'https://usama25.github.io/Clicker-Telegram/tonconnect-manifest.json'; // Replace with your manifest URL

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <CoinProvider>
        <Component {...pageProps} />
      </CoinProvider>
    </TonConnectUIProvider>
  );
}

export default MyApp;
