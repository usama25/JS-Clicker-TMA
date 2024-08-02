// components/TelegramLogin.tsx
import React, { useEffect } from 'react';

const TelegramLogin: React.FC<{ onAuth: (user: any) => void }> = ({ onAuth }) => {
  useEffect(() => {
    window.TelegramLoginWidget = {
      dataOnauth: onAuth,
      bot_id: '7227507147', // Replace with your bot ID
      lang: 'en',
      request_access: 'write',
    };

    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?8";
    script.async = true;
    script.setAttribute('data-telegram-login', '@TMAClicker_bot'); // Replace with your bot name
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login')?.appendChild(script);
  }, [onAuth]);

  return <div id="telegram-login"></div>;
};

export default TelegramLogin;
