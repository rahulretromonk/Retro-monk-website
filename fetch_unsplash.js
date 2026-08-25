const https = require('https');
https.get('https://unsplash.com/photos/7O422yG_b80', {headers: {'User-Agent': 'Mozilla/5.0'}}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/property="og:image"\s+content="([^"]+)"/);
    if(match) console.log(match[1]);
    else console.log('Not found');
  });
});
