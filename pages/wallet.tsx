import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTonAddress, TonConnectButton } from '@tonconnect/ui-react';
import axios from 'axios';
import styles from '../styles/Home.module.css'; // Ensure this path is correct

const Wallet = () => {
  const address = useTonAddress();
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      // Send the wallet address to your server
      axios.post('/api/send-address', { address })
        .then(response => {
          console.log('Address sent successfully');
          console.log('Balance:', response.data.balance);
          setBalance(response.data.balance);
        })
        .catch(error => {
          console.error('Error sending address:', error);
          setError('Failed to fetch balance');
        });
    }
  }, [address]);

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
        {address && <p>Connected Wallet Address: {address}</p>}
        {balance !== null ? <p>Wallet Balance: {balance}</p> : <p>Fetching balance...</p>}
        {error && <p className={styles.error}>{error}</p>}
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
