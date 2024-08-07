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
    // Fetch the balance from the TON blockchain service
    const response = await axios.get(TON_API_URL, {
      params: {
        address: address
      }
    });
    console.log('API Response:', response.data);

    const balance = response.data.balance; // Adjust based on the service's response format

    res.status(200).json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ message: 'Error fetching balance', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
