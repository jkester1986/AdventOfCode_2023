fs = require('fs');
fs.readFile('Day22.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let bricks = data.split('\n');

});