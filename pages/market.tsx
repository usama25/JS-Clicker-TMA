// pages/market.tsx
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Corrected path

const Market = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Market Place</title>
        <meta name="description" content="Market Place page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Market Place</h1>
        {/* Add your market content here */}
      </main>

      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/market" className={styles.navLink}>Market Place</Link>
        <Link href="/wallet" className={styles.navLink}>Wallet Connect</Link>
      </nav>
    </div>
  );
};

export default Market;
