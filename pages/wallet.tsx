import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useTonWallet, useTonAddress, TonConnectButton } from '@tonconnect/ui-react';
import { useCoinContext } from '../context/CoinContext';
import styles from '../styles/Home.module.css';

const Wallet = () => {
  const { coins } = useCoinContext();
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();

  useEffect(() => {
    if (wallet) {
      setIsConnected(true);
      // Fetch the balance once the wallet is connected
      const fetchBalance = async () => {
        try {
          const response = await axios.post('/api/ton', { address: userFriendlyAddress });
          setBalance(response.data.balance);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Error fetching balance:', error.message);
            setBalance('Error fetching balance');
          } else {
            console.error('Unknown error fetching balance');
            setBalance('Unknown error fetching balance');
          }
        }
      };

      fetchBalance();
    }
  }, [wallet, userFriendlyAddress]);

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
        {isConnected && wallet && (
          <div>
            <p>Connected Wallet: {(wallet as any).name ?? 'Unknown'}</p>
            <p>Address: {userFriendlyAddress}</p>
            <p>Balance: {balance}</p>
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
