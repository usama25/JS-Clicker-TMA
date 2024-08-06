import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useCoinContext } from '../context/CoinContext';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import styles from '../styles/Home.module.css';

const Wallet = () => {
  const { coins } = useCoinContext();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const [tonConnectUI, setTonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (tonConnectUI) {
      const handleStatusChange = (status: any) => {
        if (status.walletsList && status.walletsList[0]) {
          const address = status.walletsList[0].address;
          setWalletAddress(address);
          fetchBalance(address);
        }
      };

      tonConnectUI.onStatusChange(handleStatusChange);

      // Cleanup function to reset tonConnectUI
      return () => {
        setTonConnectUI(null as any);
      };
    }
  }, [tonConnectUI, setTonConnectUI]);

  const fetchBalance = async (address: string) => {
    try {
      const response = await axios.post('/api/balance', { address });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

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

        {walletAddress && (
          <div>
            <p>Wallet Address: {walletAddress}</p>
            <p>Balance: {balance !== null ? `${balance} TON` : 'Loading...'}</p>
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
