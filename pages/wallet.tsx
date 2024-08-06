import { useState, useEffect } from 'react';
import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import styles from '../styles/Home.module.css';

// Function to fetch balance from the server
const fetchBalance = async (address: string) => {
  try {
    const response = await fetch('/api/wallet-operation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      throw new Error('Error fetching balance');
    }

    const data = await response.json();
    return data.balance;
  } catch (error) {
    throw new Error('Error fetching balance');
  }
};

const Wallet = () => {
  const wallet = useTonWallet();
  const address = useTonAddress();
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      handleCheckBalance();
    }
  }, [address]);

  const handleCheckBalance = async () => {
    if (!address) {
      setError('No address available');
      return;
    }

    try {
      const balance = await fetchBalance(address);
      setBalance(balance);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Wallet Connect & Balance</h1>

      <div className={styles.walletConnect}>
        <TonConnectButton />
      </div>

      {wallet && (
        <div>
          {/* Displaying wallet details if available */}
          <p>Wallet Info:</p>
          <pre>{JSON.stringify(wallet, null, 2)}</pre>
        </div>
      )}

      {address && (
        <div>
          <p>User-friendly Address: {address}</p>
          <button onClick={handleCheckBalance}>Check Balance</button>
        </div>
      )}

      {balance && <p>Balance: {balance} TON</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Wallet;
