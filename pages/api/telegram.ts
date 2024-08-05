// pages/api/telegram.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.text) {
      const chatId = message.chat.id;
      const username = message.from.username || 'Unknown';

      // Reply with the username
      await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Your username is: ${username}`,
        }),
      });

      res.status(200).json({ status: 'ok' });
    } else {
      res.status(200).json({ status: 'ignored' });
    }
  } else {
    res.status(405).json({ status: 'method not allowed' });
  }
};
