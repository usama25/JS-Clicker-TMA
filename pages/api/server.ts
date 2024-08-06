import type { NextApiRequest, NextApiResponse } from 'next';
import { TonClient, Address, fromNano } from '@ton/ton';

const client = new TonClient({ endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC' });

const getWalletBalance = async (address: string) => {
  try {
    const addressObj = Address.parse(address); // Convert string to Address type
    const balance = await client.getBalance(addressObj);
    return fromNano(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw new Error('Error fetching balance');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    try {
      const balance = await getWalletBalance(address);
      res.status(200).json({ balance });
    } catch (error) {
      res.status(500).json({ error: 'Error performing wallet operation' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
