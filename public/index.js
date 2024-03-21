async function getUser() {
  const url = 'https://api.spotify.com/v1/me';
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(url, config);
}
