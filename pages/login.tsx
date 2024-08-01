import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Login.module.css';


const Login = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Handle the Telegram authentication callback
    window.TelegramLoginWidgetCallback = async (user) => {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        console.error('Verification failed');
      }
    };

    // Add the Telegram login widget script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?19';
    script.setAttribute('data-telegram-login', '@TMAClicker_bot'); // Replace with your bot's username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', `${window.location.origin}/api/verify`);
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login-container').appendChild(script);
  }, []);

  return (
    <div  className={styles.container}>
      <h1>Login</h1>
      {username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <div id="telegram-login-container"></div>
      )}

      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/market" className={styles.navLink}>Market Place</Link>
        <Link href="/wallet" className={styles.navLink}>Wallet Connect</Link>
        <Link href="/login" className={styles.navLink}>Login</Link>
      </nav>
    </div>
  );
};

export default Login;
