const express = require('express');
const axios = require('axios');
const { get, post } = require('axios');
const fs = require('fs');
const { readFileSync, writeFileSync } = require('fs');
const { stringify } = require('querystring');
const dotenv = require('dotenv');
dotenv.config();

const loginRouter = require('./routes/login.route');
const userRouter = require('./routes/user.route');
const playlistsRouter = require('./routes/playlists.route');
const toptracksRouter = require('./routes/toptracks.route');
const topartistsRouter = require('./routes/topartists.route');

const app = express();
const port = 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tokenPath = 'tokens.json';

const redirectUri = 'http://localhost:8888/callback';

app.get('/', (req, res) => {
  // res.send('mini-spotify server!');
  const message = `mini-spotify server is running`;
  res.json(message);
});

app.use('/', loginRouter);
app.use('/user', userRouter);
app.use('/playlists', playlistsRouter);
app.use('/toptracks', toptracksRouter);
app.use('/topartists', topartistsRouter);

// app.get('/login', (req, res) => {
//   const scope = 'user-read-private user-read-email';
//   res.redirect(
//     `https://accounts.spotify.com/authorize?${stringify({
//       response_type: 'code',
//       client_id: process.env.SPOTIFY_CLIENT_ID,
//       scope: scope,
//       redirect_uri: redirectUri,
//     })}`
//   );
// });

// app.get('/callback', async (req, res) => {
//   const code = req.query.code;
//   try {
//     const response = await axios.post(
//       'https://accounts.spotify.com/api/token',
//       stringify({
//         code: code,
//         redirect_uri: redirectUri,
//         grant_type: 'authorization_code',
//       }),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           Authorization: `Basic ${Buffer.from(
//             `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
//           ).toString('base64')}`,
//         },
//       }
//     );
//     const tokens = {
//       accessToken: response.data.access_token,
//       refreshToken: response.data.refresh_token,
//       expiresIn: response.data.expires_in,
//     };
//     fs.writeFileSync(tokenPath, JSON.stringify(tokens));
//     res.redirect('/user');
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/user', async (req, res) => {
//   try {
//     const tokens = JSON.parse(readFileSync(tokenPath, 'utf-8'));
//     const { accessToken } = tokens;

//     const userResponse = await axios.get('https://api.spotify.com/v1/me', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     res.json(userResponse.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/playlists', async (req, res) => {
//   try {
//     const tokens = JSON.parse(readFileSync(tokenPath, 'utf-8'));
//     const { accessToken } = tokens;

//     const playlistsResponse = await axios.get(
//       'https://api.spotify.com/v1/me/playlists',
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     res.json(playlistsResponse.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/toptracks', async (req, res) => {
//   try {
//     const tokens = JSON.parse(readFileSync(tokenPath, 'utf-8'));
//     const { accessToken } = tokens;

//     const topTracksResponse = await axios.get(
//       'https://api.spotify.com/v1/me/top/tracks',
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     res.json(topTracksResponse.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/topartists', async (req, res) => {
//   try {
//     const tokens = JSON.parse(readFileSync(tokenPath, 'utf-8'));
//     const { accessToken } = tokens;

//     const topArtistsResponse = await axios.get(
//       'https://api.spotify.com/v1/me/top/artists',
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     res.json(topArtistsResponse.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.get('/search/:query', async (req, res) => {
  const query = req.query.q;
  try {
    const tokens = JSON.parse(readFileSync(tokenPath, 'utf-8'));
    const { accessToken } = tokens;
    const searchResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=artist,track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(searchResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
