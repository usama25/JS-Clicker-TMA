// global.d.ts
export {};

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: any) => void;
      bot_id: string;
      lang: string;
      request_access: string;
    };
  }
}
