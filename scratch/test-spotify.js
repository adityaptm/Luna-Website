const client_id = 'd82c4cde931443ea83c063541e6d7e7f';
const client_secret = '5d7062841ea542718e69af58c33b808c';
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

async function testSpotify() {
  try {
    console.log('Fetching token...');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });
    const tokenData = await tokenRes.json();
    console.log('Token Data:', tokenData);

    if (tokenData.access_token) {
      console.log('Searching for "kahitna"...');
      const searchRes = await fetch('https://api.spotify.com/v1/search?q=kahitna&type=track&limit=1', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const text = await searchRes.text();
      console.log('Search Raw Response:', text);
    }
  } catch (err) {
    console.error('Test Error:', err);
  }
}

testSpotify();
