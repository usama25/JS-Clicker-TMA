import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { TonClient, WalletContractV4 } from "@ton/ton";
import { useTonAddress, TonConnectButton } from '@tonconnect/ui-react';
import { useCoinContext } from '../context/CoinContext';
import styles from '../styles/Home.module.css';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

const Wallet = () => {
  const { coins } = useCoinContext();
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const address = useTonAddress();

  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (address) {
        try {
          const client = new TonClient({
            endpoint: 'https://toncenter.com/api/v2/jsonRPC',
          });

          const wallet = WalletContractV4.create({ workchain: 0, publicKey: Buffer.from(address, 'hex') });
          const contract = client.open(wallet);
          const walletBalance = await contract.getBalance();
          const balanceInTON = (walletBalance / BigInt(1e9)).toString(); // Convert nanoTONs to TON
          setBalance(balanceInTON);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchWalletBalance();
    setIsConnected(!!address);
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
        {isConnected && (
          <div>
            <h2>Wallet Address: {address}</h2>
            <h3>Balance: {balance ? balance : 'Loading...'}</h3>
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
