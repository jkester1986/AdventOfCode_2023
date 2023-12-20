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

    // TODO: for P2, just track the corners (and maybe the corners before/after?)

	data.split('\n').map(line => {
        let pattern = /(\w+)\s(\d+)\s\(\#(\w+)\)/;
        // let [_, direction, distance, color] = line.match(pattern); // P1
        let color = line.match(pattern)[3];
        let directionToDecode = color.charAt(5);
        let direction = directionToDecode === "0" ? "R" : directionToDecode === "1" ? "D" : directionToDecode === "2" ? "L" : "U";
        distance = parseInt(color.substring(0, 5), 16);
        console.log({ direction, distance })
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

    maxVolume = Math.abs(mapCorners.xHigh - mapCorners.xLow) * Math.abs(mapCorners.yHigh - mapCorners.yLow);
    console.log({ maxVolume })


    let lavaVolume = 0;
    function printMap() {
        for (let y = mapCorners.yHigh; y >= mapCorners.yLow; y--) {
            let row = "";
            for (let x = mapCorners.xLow; x <= mapCorners.xHigh; x++) {
                if (map[`${x},${y}`]) {
                    row += "#";
                    lavaVolume++;

                }
                else row += "."
            }
            console.log(row)
        }
    }

    let stack = [`1,-1`];
    while (stack.length) {
        let next = stack.shift();
        // add first element to the map, if not already present
        if (!map[next]) map[next] = {};

        // check to see if up/down/left/right coords exist in map
        let [x, y] = next.split(",").map(Number);
        let up = `${x},${y+1}`;
        let down = `${x},${y-1}`;
        let left = `${x-1},${y}`;
        let right = `${x+1},${y}`;
        if (!map[up] && !stack.includes(up)) {
            stack.push(up);
        }
        if (!map[down] && !stack.includes(down)) {
            stack.push(down);
        }
        if (!map[left] && !stack.includes(left)) {
            stack.push(left);
        }
        if (!map[right] && !stack.includes(right)) {
            stack.push(right);
        }
    }

    printMap();

    console.log("P1:", lavaVolume)

});