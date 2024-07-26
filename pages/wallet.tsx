// pages/wallet.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCoinContext } from '../context/CoinContext';
import { TonConnectButton } from '@tonconnect/ui-react';
import styles from '../styles/Home.module.css';

const Wallet = () => {
  const { coins } = useCoinContext();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Here you would add logic to handle TonConnect state
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet Connect</title>
        <meta name="description" content="Wallet Connect page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Wallet Connect</h1>
       
        <TonConnectButton />
      </main>

      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/market" className={styles.navLink}>Market Place</Link>
        <Link href="/wallet" className={styles.navLink}>Wallet Connect</Link>
      </nav>
    </div>
  );
};

export default Wallet;
