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

    instructionList.forEach(instruction => {
        let pattern = /(\w+)\s=\s\((\w+),\s(\w+)\)/;
        const matches = instruction.match(pattern);
        instructions[matches[1]] = {
            L: matches[2],
            R: matches[3]
        }
    });

    let directionInd = 0;
    let current = "AAA";
    let steps = 0;
    while (current !== "ZZZ") {
        current = instructions[current][directions[directionInd]]
        directionInd = (directionInd + 1) % directionsLength;
        steps++;
    }

    console.log({steps})

});