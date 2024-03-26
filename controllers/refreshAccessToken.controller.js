// const refreshAccessToken = async () => {
//   try {
//     const tokens = JSON.parse(readFileSync(tokenPath, 'utf8'));
//     const response = await post(
//       'https://accounts.spotify.com/api/token',
//       stringify({
//         grant_type: 'refresh_token',
//         refresh_token: tokens.refreshToken,
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
//     const newAccessToken = response.data.access_token;
//     const updatedTokens = {
//       ...tokens,
//       accessToken: newAccessToken,
//     };
//     writeFileSync(tokenPath, JSON.stringify(updatedTokens));
//     return newAccessToken;
//   } catch (error) {
//     console.error('Error refreshing access token:', error.message);
//     throw error;
//   }
// };
