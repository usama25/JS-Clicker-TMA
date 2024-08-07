const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const TON_API_URL = 'https://testnet.toncenter.com/api/v2/getAddressBalance';

app.post('/api/send-address', async (req, res) => {
  const { address } = req.body;

  console.log(`Received address: ${address}`);

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  try {
    const url = `${TON_API_URL}?address=${address}`;
    console.log(`Fetching balance from URL: ${url}`);

    // Fetch the balance from the TON blockchain service
    const response = await axios.get(url);
    console.log('API Response:', response.data);

    if (response.data.ok) {
      const balance = response.data.result.balance;
      res.status(200).json({ balance });
    } else {
      throw new Error(`API Error: ${response.data.error}`);
    }
  } catch (error) {
    console.error('Error fetching balance:', error.message);
    res.status(500).json({ message: 'Error fetching balance', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
