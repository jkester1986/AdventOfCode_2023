fs = require('fs');
fs.readFile('Day18.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

    let map = {
        "0,0": {}
    };
    let coord = {x: 0, y: 0};
    let mapCorners = {
        xHigh: 0,
        xLow: 0,
        yHigh: 0,
        yLow: 0
    }
	let mapEdges = data.split('\n').map(line => {
        let pattern = /(\w+)\s(\d+)\s\((\#\w+)\)/;
        let [_, direction, distance, color] = line.match(pattern);
        distance = Number(distance);
        const { x, y } = coord;

        switch(direction) {
            case "U":
            case "D": {
                let operand = direction === "U" ? "+" : "-";
                // move forward or backward on y-axis
                for(let i = 1; i <= distance; i++) {
                    let evalString = eval(`${y}${operand}${i}`);
                    let newY = eval(evalString);
                    map[`${x},${newY}`] = {
                        color: i === distance ? undefined : color
                    }
                    coord = {x, y: newY}
                    if (newY > mapCorners.yHigh) {
                        mapCorners.yHigh = newY
                    }
                    else if (newY < mapCorners.yLow) {
                        mapCorners.yLow = newY
                    }
                }
                break;
            }
            case "L":
            case "R": {
                let operand = direction === "R" ? "+" : "-";
                // move forward or backward on x-axis
                for(let i = 1; i <= distance; i++) {
                    let evalString = eval(`${x}${operand}${i}`);
                    let newX = eval(evalString);
                    map[`${newX},${y}`] = {
                        color: i === distance ? undefined : color
                    }
                    coord = {x: newX, y}
                    if (newX > mapCorners.xHigh) {
                        mapCorners.xHigh = newX
                    }
                    else if (newX < mapCorners.xLow) {
                        mapCorners.xLow = newX
                    }
                }
                break;
            }
        }

        return {direction, distance, color};
    });


    // !!!!!!!!!NOTE!!!!!!!!!!!!! adjusted example input to give space at end of first row
    // print out the map
    let lavaVolume = 0;
    for(let y = mapCorners.yHigh; y >= mapCorners.yLow; y--) {
        let row = "";
        let startingEdge;
        let dugBetween;
        for(let x = mapCorners.xLow; x <= mapCorners.xHigh; x++) {
            // TODO: also check for what's above to see if it should be filled in

            // found an edge
            if (map[`${x},${y}`]) {
                if(!startingEdge) {
                    if (y === 340) {
                        console.log("starting to dig at:", {x, y})
                    }
                    startingEdge = true;
                    // console.log("start digging")
                }
                // this logic is wrong because we need to know both above and below what's going on.
                // somehow.
                else if(dugBetween && (!map[`${x+1},${y}`] || !map[`${x},${y+1}`])) {
                    startingEdge = false;
                    dugBetween = false
                }

                // always dig if there's a #
                row += "#";
                lavaVolume++;

            }
            // determine if we are inside or outside the edge
            else {
                // we're between edges
                if(startingEdge && map[`${x},${y+1}`]) {
                    dugBetween = true;
                    row += "#";
                    lavaVolume++;
                    map[`${x},${y}`] = {}
                }
                else row += "."
            }

        }
        console.log(row)
    }

    console.log({lavaVolume})

});