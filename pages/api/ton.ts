import { NextApiRequest, NextApiResponse } from 'next';
import { TonClient, WalletContractV4, fromNano } from '@ton/ton';
import { getHttpEndpoint } from '@orbs-network/ton-access';

const TON_CLIENT_ENDPOINT = 'https://testnet.toncenter.com/api/v2/jsonRPC'; // Update with your endpoint if needed

const client = new TonClient({
  endpoint: TON_CLIENT_ENDPOINT,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { address } = req.query;

    if (!address || typeof address !== 'string') {
      res.status(400).json({ error: 'Address is required' });
      return;
    }

    try {
      // Create wallet instance
      const wallet = WalletContractV4.create({ publicKey: address, workchain: 0 });

      // Fetch balance
      const balance = await client.getBalance(wallet.address);
      const balanceInTon = fromNano(balance);

      // Send response
      res.status(200).json({ balance: balanceInTon });
    } catch (error) {
      console.error('Error fetching balance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
