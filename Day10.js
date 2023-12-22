fs = require('fs');
fs.readFile('Day10.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	let coords = {};
	let startingPoint;

	lines.forEach((line, y) => {
		let pipes = line.split("");
		pipes.forEach((pipe, x) => {
			coords[`${x},${y}`] = pipe;
			if (pipe === "S") {
				startingPoint = { x, y };
			}
		});
	});

	// this starting location would be custom to input
	let stepLocations = [{ x: startingPoint.x, y: startingPoint.y+1, direction: "down" }, { x: startingPoint.x, y: startingPoint.y - 1, direction: "up" }];
	let stepsTaken = 1;
	while(stepLocations.length === 2) {
		let newStepLocations = [];
		stepLocations.forEach(({x, y, direction}) => {
			let pipe = coords[`${x},${y}`];
			switch(pipe) {
				case "|":
					if (direction === "down") {
						newStepLocations.push({ x, y: y+1, direction: "down" });
					}
					else {
						newStepLocations.push({ x, y: y - 1, direction: "up" });
					}
					break;
				case "-":
					if(direction === "right") {
						newStepLocations.push({ x: x + 1, y, direction: "right" });
					}
					else {
						newStepLocations.push({ x: x - 1, y, direction: "left" });
					}
					break;
				case "L":
					if (direction === "down") {
						newStepLocations.push({ x: x + 1, y, direction: "right" });
					}
					else {
						newStepLocations.push({ x, y: y - 1, direction: "up" });
					}
					break;
				case "J":
					if (direction === "down") {
						newStepLocations.push({ x: x - 1, y, direction: "left" });
					}
					else {
						newStepLocations.push({ x, y: y - 1, direction: "up" });
					}
					break;
				case "7":
					if (direction === "right") {
						newStepLocations.push({ x, y: y + 1, direction: "down" });
					}
					else {
						newStepLocations.push({ x: x - 1, y, direction: "left" });
					}
					break;
				case "F":
					if(direction === "left") {
						newStepLocations.push({ x, y: y + 1, direction: "down" });
					}
					else {
						newStepLocations.push({ x: x + 1, y, direction: "right" });
					}
					break;
			}
		});

		if(newStepLocations[0].x === newStepLocations[1].x && newStepLocations[0].y === newStepLocations[1].y) {
			stepLocations = newStepLocations[0];
		}
		else {
			stepLocations = [...newStepLocations];
		}
		stepsTaken++;
	}

	console.log("P1:", stepsTaken)

  
});