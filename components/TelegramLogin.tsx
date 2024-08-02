// components/TelegramLogin.tsx
import React, { useEffect } from 'react';

const TelegramLogin: React.FC<{ onAuth: (user: any) => void }> = ({ onAuth }) => {
  useEffect(() => {
    // Define the function globally to be called by the widget
    (window as any).onTelegramAuth = (user: any) => {
      onAuth(user);
    };

    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute('data-telegram-login', 'TMAClicker_bot'); // Replace with your bot name
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login')?.appendChild(script);
  }, [onAuth]);

  return <div id="telegram-login"></div>;
};

export default TelegramLogin;
