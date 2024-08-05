// pages/api/telegram.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

let latestUsername: string | null = null;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.from) {
      const chatId = message.chat.id;
      const username = message.from.username || `${message.from.first_name} ${message.from.last_name || ''}`.trim() || 'Unknown';

      console.log('message.from:', message.from);
      latestUsername = username;

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
      console.log('Message or message.from is missing');
      res.status(200).json({ status: 'ignored' });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ username: latestUsername });
  } else {
    res.status(405).json({ status: 'method not allowed' });
  }
};
