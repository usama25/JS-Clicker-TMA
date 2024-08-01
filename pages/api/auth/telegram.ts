import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const verifyTelegramAuth = (data: any) => {
  const authData = { ...data };
  const { hash, ...rest } = authData;
  const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();

  const checkString = Object.keys(rest)
    .sort()
    .map(key => `${key}=${rest[key]}`)
    .join('\n');

  const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

  return hmac === hash;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const isValid = verifyTelegramAuth(req.body);

    if (isValid) {
      // Handle the authenticated user data here, e.g., create a session, JWT, etc.
      res.status(200).json({ status: 'ok' });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid data' });
    }
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}
