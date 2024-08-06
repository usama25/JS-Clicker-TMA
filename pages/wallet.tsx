// pages/wallet.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCoinContext } from '../context/CoinContext';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import styles from '../styles/Home.module.css';

const Wallet = () => {
  const { coins } = useCoinContext();
  const [balance, setBalance] = useState<number | null>(null);
  const { account, connected, connect } = useTonConnectUI();

  useEffect(() => {
    if (connected && account) {
      const walletAddress = account.address;

      fetch(`/api/wallet-balance?address=${walletAddress}`)
        .then(response => response.json())
        .then(data => {
          if (data.balance) {
            setBalance(data.balance);
          } else {
            console.error(data.error);
          }
        })
        .catch(error => console.error('Error fetching wallet balance:', error));
    }
  }, [connected, account]);

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
        {connected && account && (
          <div>
            <h2>Wallet Address: {account.address}</h2>
            <h2>Balance: {balance !== null ? `${balance} TON` : 'Loading...'}</h2>
          </div>
        )}
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
