// pages/login.tsx

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { TelegramLoginButton } from 'react-telegram-login';
import { useCoinContext } from '../context/CoinContext';
import styles from '../styles/Login.module.css';
import Link from 'next/link';

const Login = () => {
  const { addCoins } = useCoinContext();
  const router = useRouter();

  const handleTelegramResponse = (response: any) => {
    if (response && response.id) {
      // Successful login, you can save the user info if needed
      console.log('Telegram response:', response);
      router.push('/');
    }
  };

  const handleTelegramError = (error: any) => {
    console.error('Telegram login error:', error);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?7';
      script.async = true;
      script.setAttribute('data-telegram-login', '@TMAClicker_bot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '10');
      script.setAttribute('data-auth-url', 'https://js-clicker-tma.vercel.app/api/auth/telegram');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-userpic', 'false');
      document.getElementById('telegram-login-button')?.appendChild(script);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1>Login with Telegram</h1>
      <div id="telegram-login-button"></div>

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
