// pages/api/telegram.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '7227507147:AAGKUV9pQfYx_4V4pqLuI52t-UVwezOkl7s';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

let latestUsername: string | null = null;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.text) {
      const chatId = message.chat.id;
      const username = message.from.username || 'Unknown';
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
      res.status(200).json({ status: 'ignored' });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ username: latestUsername });
  } else {
    res.status(405).json({ status: 'method not allowed' });
  }
};
