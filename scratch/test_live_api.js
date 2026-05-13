// Use built-in fetch

async function testApi() {
  const url = 'http://localhost:3000/api/lana-live';
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Error fetching API:', err.message);
  }
}

testApi();
