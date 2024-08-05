import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCoinContext } from '../context/CoinContext';
import styles from '../styles/Home.module.css';


const Home = () => {
  const { coins, addCoins } = useCoinContext();
  const [pops, setPops] = useState<{ id: number; x: number; y: number }[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching the username
    const fetchUsername = async () => {
      const response = await fetch('/api/telegram');
      const data = await response.json();
      setUsername(data.username);
    };

    fetchUsername();
  }, []);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setPops((prev) => [...prev, { id, x, y }]);
    addCoins(1);

    setTimeout(() => {
      setPops((prev) => prev.filter((pop) => pop.id !== id));
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Clicker Mania</title>
        <meta name="description" content="Clicker Mania homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Clicker Mania</h1>
        {username ? <p>Your username is: {username}</p> : <p>Loading...</p>}
        <div className={styles.coinCount}>Coins: {coins}</div>
        <motion.div
          className={styles.imageContainer}
          onClick={handleImageClick}
          whileTap={{ scale: 0.95, rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Image
            src="/clicker.png"
            alt="Clicker Mania Image"
            width={200}
            height={200}
            className={styles.roundedImage}
          />
          {pops.map((pop) => (
            <motion.div
              key={pop.id}
              className={styles.coin}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -150 }}
              transition={{ duration: 1 }}
              style={{ left: pop.x, top: pop.y }}
            >
              🪙
            </motion.div>
          ))}
        </motion.div>
      </main>

      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/market" className={styles.navLink}>Market Place</Link>
        <Link href="/wallet" className={styles.navLink}>Wallet Connect</Link>
      </nav>
    </div>
  );
};

export default Home;
