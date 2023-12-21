fs = require('fs');
fs.readFile('Day21.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');
  let gardenPlots = {};

  let currLoc = { x: 0, y: 0 };
  lines.forEach((line, y) => {
    let plots = line.split("");
    plots.forEach((plot, x) => {
      gardenPlots[`${x},${y}`] = plot;
      if (plot === "S") currLoc = { x, y };
    });
  });

  let steps = 0;
  let oldLocations = new Set();
  oldLocations.add(`${currLoc.x},${currLoc.y}`);
  let newLocations = new Set();
  let validPlots = ["S", "."];
  while(steps < 64) {
    steps++; // take a step
    oldLocations.forEach(location => {
      let [x, y] = location.split(",").map(Number);
      // check up, down, left, right
      if (validPlots.includes(gardenPlots[`${x},${y - 1}`]) && !newLocations.has(`${x},${y - 1}`)) {
        newLocations.add(`${x},${y - 1}`);
      }
      if (validPlots.includes(gardenPlots[`${x},${y + 1}`]) && !newLocations.has(`${x},${y + 1}`)) {
        newLocations.add(`${x},${y + 1}`);
      }
      if (validPlots.includes(gardenPlots[`${x - 1},${y}`]) && !newLocations.has(`${x - 1},${y}`)) {
        newLocations.add(`${x - 1},${y}`);
      }
      if (validPlots.includes(gardenPlots[`${x + 1},${y}`]) && !newLocations.has(`${x + 1},${y}`)) {
        newLocations.add(`${x + 1},${y}`);
      }
    });

    oldLocations = new Set(JSON.parse(JSON.stringify([...newLocations])));
    newLocations = new Set();



    lines.forEach((line, y) => {
      let plots = line.split("");
      let lineText = "";
      plots.forEach((plot, x) => {
        if (oldLocations.has(`${x},${y}`)) {
          lineText += "O";
        }
        else {
          lineText += plot;
        }
      });
      // console.log(lineText);
    })
  }
  console.log("reachable:", oldLocations.size)

});