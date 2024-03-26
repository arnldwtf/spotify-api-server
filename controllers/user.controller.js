const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const { readFileSync, writeFileSync } = require('fs');
const axios = require('axios');
const { get, post } = require('axios');
const { stringify } = require('querystring');

const tokenPath = '../tokens.json';

const userController = async (req, res) => {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    const { accessToken } = tokens;

    const userResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.json(userResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { userController };
