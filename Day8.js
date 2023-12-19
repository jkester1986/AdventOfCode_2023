fs = require('fs');
fs.readFile('Day8.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
    let directions = lines[0].split("");
    let directionsLength = directions.length;
    let instructionList = lines.splice(2);
    let instructions = {};
    let part2Starters = [];

    instructionList.forEach(instruction => {
        let pattern = /(\w+)\s=\s\((\w+),\s(\w+)\)/;
        const matches = instruction.match(pattern);
        instructions[matches[1]] = {
            L: matches[2],
            R: matches[3]
        }
        if (matches[1].charAt(2) === "A") part2Starters.push(matches[1]);
    });

    let directionInd = 0;
    let current = "AAA";
    let steps = 0;
    // while (current !== "ZZZ") {
    //     current = instructions[current][directions[directionInd]]
    //     directionInd = (directionInd + 1) % directionsLength;
    //     steps++;
    // }

    console.log("P1:", {steps})
    console.log({part2Starters})

    directionInd = 0;
    steps = 0;
    let currentLocations = part2Starters;
    let allZ = false;
    while (!allZ) {
        let direction = directions[directionInd];
        // console.log({direction, currentLocations})
        if (!allZ) {
            currentLocations.forEach((loc, i) => {
                currentLocations[i] = instructions[loc][direction]
            });
        }
        allZ = currentLocations.every((loc) => loc.charAt(2) === "Z");
        directionInd = (directionInd + 1) % directionsLength;
        steps++;
    }
    console.log({steps});

});