fs = require('fs');
fs.readFile('Day23.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');
  let rows = lines.length;
  let columns = lines[0].length;
  let steps = new Map();
  steps.set(1, [{x: 1, y: 1}]);
  let endingPos = { x: rows.length - 1, y: rows.y - 2}

  let forest = {};

  lines.forEach((line, y) => {
    let loc = line.split("");
    loc.forEach((loc, x) => {
        forest[`${x},${y}`] = loc;
    });
  });

  let mostSteps = 0;
  let visited = new Set();
  let step = 1;
  while (steps.size) {
      if (steps.get(step)) {
          // if there's nothing at the current step, go back another step
          step--;
        }
    // get the first option from the current step, then remove it
    let currOption = {...steps.get(step)?.shift()};

    if()
    // TODO: check to see if we reached the end
    visited.add(String(currOption)); // TODO: think about how we handle this when the end has a short path that doesn't vary (think need to do with recursion...)
    // if there's nothing left, remove it
    if (!steps.get(step)?.length)
        steps.delete(step)
    
    // if there are any existing options at the next step,
    // want to make sure we add to it instead of overwriting
    let newOptions = [...(steps.get(step) || [])];
    // get all possible next positions, then set in steps
    // only option is down in this case
    if (currOption.slide) {
        // TODO: make sure to check and make sure 
        let x = currOption.x,
            y = currOption.y + 1;
        let symbol = forest[`${x},${y}`];
        if (symbol === "#") {
            // reached the end, don't do anything.
            // don't increase steps, because on next iteration, want to see
            // if there's more options at the current step
        }
        else {
            newOptions.push({
                x, y,
                slide: ["^", "v", "<", ">"].includes(symbol)
            });
            step++;
        }
    }
    else {

    }



  }

});