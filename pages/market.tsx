// pages/market.tsx
"use client";

import Link from 'next/link';
import { useCoinContext } from '../context/CoinContext';
import styles from '../styles/Market.module.css';

const Market = () => {
  const { coins, addCoins, subtractCoins } = useCoinContext();

  const items = [
    { id: 1, name: 'Item 1', price: 10, image: '/clicker.png' },
    { id: 2, name: 'Item 2', price: 20, image: '/clicker.png' },
    { id: 3, name: 'Item 3', price: 30, image: '/clicker.png' },
    { id: 4, name: 'Item 4', price: 40, image: '/clicker.png' },
    { id: 5, name: 'Item 5', price: 50, image: '/clicker.png' },
    { id: 6, name: 'Item 6', price: 60, image: '/clicker.png' },
    { id: 7, name: 'Item 7', price: 70, image: '/clicker.png' },
    { id: 8, name: 'Item 8', price: 80, image: '/clicker.png' },
    { id: 9, name: 'Item 9', price: 90, image: '/clicker.png' },
    { id: 10, name: 'Item 10', price: 100, image: '/clicker.png' },
  ];

  const handleUpgrade = (price: number) => {
    if (coins >= price) {
      subtractCoins(price);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Market Place</h1>
      <div className={styles.coinCount}>Coins: {coins}</div>
      <div className={styles.marketBox}>
        <div className={styles.marketItems}>
          {items.map(item => (
            <div key={item.id} className={styles.itemBlock}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemName}>{item.name}</div>
              <div className={styles.itemPrice}>
                {item.price} <span role="img" aria-label="coin">🪙</span>
              </div>
              <button
                className={styles.upgradeButton}
                onClick={() => handleUpgrade(item.price)}
                disabled={coins < item.price}
              >
                Upgrade
              </button>
            </div>
          ))}
        </div>
      </div>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/market" className={styles.navLink}>Market Place</Link>
        <Link href="/wallet" className={styles.navLink}>Wallet Connect</Link>
      </nav>
    </div>
  );
};

export default Market;
