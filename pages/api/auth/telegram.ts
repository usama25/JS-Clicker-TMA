// pages/api/auth/telegram.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined in the environment variables.');
}

const validateTelegramAuth = (data: any) => {
  const authData = { ...data };
  const { hash, ...rest } = authData;
  const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();

  const checkString = Object.keys(rest)
    .sort()
    .map((key) => `${key}=${rest[key]}`)
    .join('\n');

  const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
  return hmac === hash;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const isValid = validateTelegramAuth(req.body);

  if (!isValid) {
    return res.status(403).json({ error: 'Forbidden' }); // Invalid Telegram authentication
  }

  // You can handle user login and token generation here
  // For example, create a session or a JWT token and send it back to the client

  res.status(200).json({ message: 'Authentication successful' });
};

export default handler;
