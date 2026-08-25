const fs = require('fs');
let data = fs.readFileSync('src/lib/db.json', 'utf8');
data = data.replace(/"eventDetails"/g, '"details"');
fs.writeFileSync('src/lib/db.json', data);
console.log('Done');
