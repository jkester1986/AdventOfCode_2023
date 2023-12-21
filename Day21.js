fs = require('fs');
fs.readFile('Day21.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');
  let lastYInd = lines.length - 1;
  let lastXInd = lines[0].length - 1;
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
  oldLocations.add(`0,0,${currLoc.x},${currLoc.y}`);
  let newLocations = new Set();
  let validPlots = ["S", "."];
  while (steps < 5000) {
    steps++; // take a step
    console.log("step:", steps);
    oldLocations.forEach(location => {
      let [gardenX, gardenY, x, y] = location.split(",").map(Number);
      // console.log({ gardenX, gardenY, x, y })
      // check up, down, left, right
      if (validPlots.includes(gardenPlots[`${x},${y - 1}`])) {
        newLocations.add(`${gardenX},${gardenY},${x},${y - 1}`);
      }
      else if (y === 0 && validPlots.includes(gardenPlots[`${x},${lastYInd}`])){
        newLocations.add(`${gardenX},${gardenY - 1},${x},${lastYInd}`);
      }
      if (validPlots.includes(gardenPlots[`${x},${y + 1}`])) {
        newLocations.add(`${gardenX},${gardenY},${x},${y + 1}`);
      }
      else if (y === lastYInd && validPlots.includes(gardenPlots[`${x},0`])) {
        newLocations.add(`${gardenX},${gardenY + 1},${x},0`);
      }
      if (validPlots.includes(gardenPlots[`${x - 1},${y}`])) {
        newLocations.add(`${gardenX},${gardenY},${x - 1},${y}`);
      }
      else if(x === 0 && validPlots.includes(gardenPlots[`${lastXInd},${y}`])) {
        newLocations.add(`${gardenX - 1},${gardenY},${lastXInd},${y}`);
      }
      if (validPlots.includes(gardenPlots[`${x + 1},${y}`])) {
        newLocations.add(`${gardenX},${gardenY},${x + 1},${y}`);
      }
      else if(x === lastXInd && validPlots.includes(gardenPlots[`0,${y}`])) {
        newLocations.add(`${gardenX + 1},${gardenY},0,${y}`);
      }
    });

    oldLocations = new Set(JSON.parse(JSON.stringify([...newLocations])));
    newLocations = new Set();



    // lines.forEach((line, y) => {
    //   let plots = line.split("");
    //   let lineText = "";
    //   plots.forEach((plot, x) => {
    //     if (oldLocations.has(`0,0,${x},${y}`)) {
    //       lineText += "O";
    //     }
    //     else {
    //       lineText += plot;
    //     }
    //   });
    //   console.log(lineText);
    // })

    // console.log("\n\n")
  }
  console.log("reachable:", oldLocations.size)

});