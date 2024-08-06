// pages/api/telegram.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '7227507147:AAGKUV9pQfYx_4V4pqLuI52t-UVwezOkl7s';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const TON_CENTER_API_URL = 'https://toncenter.com/api/v2/getAddressBalance';

let latestUsername: string | null = null;

interface TonCenterResponse {
  ok: boolean;
  result?: string;
  error?: string;
}

const getWalletBalance = async (address: string): Promise<string> => {
  const response = await fetch(`${TON_CENTER_API_URL}?address=${address}`);
  const data: TonCenterResponse = await response.json();
  if (data.ok && data.result) {
    return data.result;
  }
  throw new Error(data.error || 'Failed to fetch wallet balance');
};

const sendMessage = async (chatId: string, text: string) => {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.from) {
      const chatId = message.chat.id;
      const username = message.from.username || `${message.from.first_name} ${message.from.last_name || ''}`.trim() || 'Unknown';

      latestUsername = username;

      // Check if the message is a wallet address
      const walletAddress = message.text.trim();

      try {
        const balance = await getWalletBalance(walletAddress);
        await sendMessage(chatId, `Wallet Balance: ${balance} TON`);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
        await sendMessage(chatId, `Failed to fetch wallet balance for address: ${walletAddress}`);
      }

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
