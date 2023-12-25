import fs from 'fs'
import clipboardy from 'clipboardy';

fs.readFile('Day25.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');
  let connections = {};

  let copyText = "";
  lines.forEach(line => {
      let components = line.split(" ");
      let startingComponent = components[0];
      components.shift();
      startingComponent = startingComponent.split(":")[0];
      
      components.forEach(component => {
          copyText += `${startingComponent} -> ${component}\n`;
      });
      
  });

  // copied to clipboard, threw in viz-js.com, figtured out 
  // to remove qlc, khn, xqh;
  // manually removed them from the input
  clipboardy.writeSync(copyText);
  

  // find a wire that has 2, and remove it. Then find another in the same group (either before or after), and remove it too.
  // update all links as you go. 

  let sorted = Object.entries(connections).sort((a, b) => a[1] - b[1]);
  console.log({sorted})
});