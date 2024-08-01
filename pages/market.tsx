// pages/market.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useCoinContext } from '../context/CoinContext';
import styles from '../styles/Market.module.css';

const Market = () => {
  const { coins, addCoins } = useCoinContext();
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', basePrice: 10, upgrades: 0, image: '/item.png' },
    { id: 2, name: 'Item 2', basePrice: 20, upgrades: 0, image: '/item.png' },
    { id: 3, name: 'Item 3', basePrice: 30, upgrades: 0, image: '/item.png' },
    { id: 4, name: 'Item 4', basePrice: 40, upgrades: 0, image: '/item.png' },
    { id: 5, name: 'Item 5', basePrice: 50, upgrades: 0, image: '/item.png' },
    { id: 6, name: 'Item 6', basePrice: 60, upgrades: 0, image: '/item.png' },
    { id: 7, name: 'Item 7', basePrice: 70, upgrades: 0, image: '/item.png' },
    { id: 8, name: 'Item 8', basePrice: 80, upgrades: 0, image: '/item.png' },
    { id: 9, name: 'Item 9', basePrice: 90, upgrades: 0, image: '/item.png' },
    { id: 10, name: 'Item 10', basePrice: 100, upgrades: 0, image: '/item.png' },
  ]);

  const upgradeItem = (itemIndex: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const item = newItems[itemIndex];
      const price = item.basePrice * Math.pow(2, item.upgrades);

      if (coins >= price) {
        addCoins(-price); // Deduct the coins
        item.upgrades += 1; // Increase the number of upgrades
      }

      return newItems;
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Market Place</title>
        <meta name="description" content="Market Place page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Market Place</h1>
        <div className={styles.coinCount}>Coins: {coins}</div>
        <div className={styles.marketBox}>
          {items.map((item, index) => {
            const currentPrice = item.basePrice * Math.pow(2, item.upgrades);

            return (
              <div key={item.id} className={styles.itemBlock}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemPrice}>
                  {currentPrice} <span className={styles.coinIcon}>🪙</span>
                </div>
                <button
                  className={styles.upgradeButton}
                  onClick={() => upgradeItem(index)}
                  disabled={coins < currentPrice}
                >
                  {coins < currentPrice ? 'Upgrade' : 'Upgrade'}
                </button>
              </div>
            );
          })}
        </div>
      </main>

      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/market" className={styles.navLink}>Market Place</Link>
        <Link href="/wallet" className={styles.navLink}>Wallet Connect</Link>
        <Link href="/login" className={styles.navLink}>Login</Link>
      </nav>
    </div>
  );
};

export default Market;
