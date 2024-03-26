const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const { readFileSync, writeFileSync } = require('fs');
const axios = require('axios');
const { get, post } = require('axios');
const { stringify } = require('querystring');

const tokenPath = '../tokens.json';

const redirectUri = 'http://localhost:8888/callback';

const loginController = async (req, res) => {
  const scope = 'user-read-private user-read-email';
  res.redirect(
    `https://accounts.spotify.com/authorize?${stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: redirectUri,
    })}`
  );
};

const callbackController = async (req, res) => {
  const code = req.query.code;
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      stringify({
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      }
    );
    const tokens = {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
    };
    fs.writeFileSync(tokenPath, JSON.stringify(tokens));
    res.redirect('/user');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginController, callbackController };
