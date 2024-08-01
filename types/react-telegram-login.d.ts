declare module 'react-telegram-login' {
    import React from 'react';
  
    interface TelegramLoginButtonProps {
      botName: string;
      dataOnauth: (user: any) => void;
      onAuthError?: (error: any) => void;
      requestAccess?: string;
      className?: string;
      buttonSize?: string;
    }
  
    export class TelegramLoginButton extends React.Component<TelegramLoginButtonProps> {}
  }
  