fs = require('fs');
fs.readFile('Day21.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');
  let lastYInd = lines.length - 1;
  let lastXInd = lines[0].length - 1;
  console.log({ lastYInd, lastXInd })
  let gardenPlots = {};

  let half = Math.floor(lastYInd / 2);
  let cycle = lastYInd + 1;

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
  let total = 0;
  while (steps < cycle*3) {
    steps++; // take a step
    oldLocations.forEach(location => {
      let [gardenX, gardenY, x, y] = location.split(",").map(Number);
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



    // print, targeting a specific garden
    // also set total for that specific garden
    // reset total each time
    total = 0;
    lines.forEach((line, y) => {
      let plots = line.split("");
      let lineText = "";
      plots.forEach((plot, x) => {
        if (oldLocations.has(`-1,2,${x},${y}`)) {
          lineText += "O";
          total++;
        }
        else {
          lineText += plot;
        }
      });
      // console.log(lineText);
    })

    // console.log("\n\n")
  }
  console.log({total, steps})
  console.log("reachable:", oldLocations.size)

  // step 131 crosses over to other garden sections

  // hit edge: steps 65, reachable 3730

  // full: 14969, steps 131
  // -- center: 7363
  // -- top: 1881
  // -- bottom: 1915
  // -- left: 1929
  // -- right: 1881
  // -- TL/TR/BL/BR: 0

  /* edge gardens are x less steps to ^^, where x is the number of complete cycles (mod cycle?)*/

  // full * 2: 59483, steps 262 - flipped for +1
  /** -- right: 7363
   * -- left: 7363
   * -- bottom: 7363
   * -- top: 7363
   * -- center: 7410 / 7363 (+ 1)
   * -- TL: 3756
   * -- TR: 3718
   * -- BR: 3750
   * -- BL: 3791
   * 
   * left/right/top/bottom is 1 before full
   */
  // full * 3: 133543, steps 393
  // toggle off: 14969, steps 131, full square only 7363

  // 203856 - how many full cycles
  // 14746 * 203856
});