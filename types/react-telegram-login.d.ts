declare module 'react-telegram-login' {
    export interface TelegramLoginButtonProps {
      botName: string;
      dataOnauth: (user: any) => void;
      onAuthError?: (error: any) => void;
      requestAccess?: string;
    }
  
    export const TelegramLoginButton: React.FC<TelegramLoginButtonProps>;
  }
  