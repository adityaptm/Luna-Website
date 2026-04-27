const apiKey = 'AIzaSyBow8O1MJV330lhEF0dMgm_pBQY3N-nFrQ';

async function listModels() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

listModels();
