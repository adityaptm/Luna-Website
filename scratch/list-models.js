const apiKey = 'AIzaSyBeEo01O1zAR8gA7areWrL4mcMp2adSf0E';

async function listModels() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

listModels();
