async function testApi() {
  const url = "https://v2.jkt48connect.com/api/jkt48/news?priority_token=sJbpVqLinYlp&apikey=sJbpVqLinYlp";
  console.log("Fetching:", url);
  try {
    const res = await fetch(url, {
      headers: {
        "x-priority-token": "sJbpVqLinYlp",
        "x-api-key": "sJbpVqLinYlp",
        "Accept": "application/json"
      }
    });
    console.log("Status:", res.status);
    const json = await res.json();
    console.log("Response Keys:", Object.keys(json));
    console.log("Response Preview:", JSON.stringify(json).substring(0, 1000));
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testApi();
