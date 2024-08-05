import { NextApiRequest, NextApiResponse } from 'next';

let username = ''; // Store username globally

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ username });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Update the username from the webhook
export function setUsername(newUsername: string) {
  username = newUsername;
}
