// pages/wallet.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Wallet = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchWalletBalance = async (address: string) => {
    setIsFetching(true);
    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: address }),
      });
      const data = await response.json();
      if (data.balance) {
        setBalance(data.balance);
      } else {
        console.error(data.error);
        setBalance('Error fetching balance');
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      setBalance('Error fetching balance');
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  const handleFetchBalance = () => {
    if (walletAddress) {
      fetchWalletBalance(walletAddress);
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
        <div className={styles.walletForm}>
          <input
            type="text"
            value={walletAddress}
            onChange={handleAddressChange}
            placeholder="Enter Wallet Address"
            className={styles.input}
          />
          <button onClick={handleFetchBalance} className={styles.button} disabled={isFetching}>
            {isFetching ? 'Fetching...' : 'Get Balance'}
          </button>
        </div>
        {balance !== null && (
          <div className={styles.balance}>
            <h2>Wallet Balance: {balance} TON</h2>
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
