fs = require('fs');
fs.readFile('Day11.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	let total = 0;
	let expanded = [];

	// expand vertically
	lines.forEach(line => {
		if(!line.includes("#")) {
			// expand universe
			expanded.push(line);
		}
		expanded.push(line);
	});


	// expand horizontally
	let xPos = 0;
	while(xPos < expanded[0].length) {
		// check the character at the xPos for very single line
		loop:
		for (let i = 0; i < expanded.length; i++) {
			let line = expanded[i];
			if(line.charAt(xPos) === "#") {
				// exit loop early
				break loop;
			}
			// if we reach the end and there's no #, we need to expand
			if (i === expanded.length - 1) {
				// expand universe
				expanded.forEach((line, i) => {
					expanded[i] = line.slice(0, xPos) + "." + line.slice(xPos);
				});
				// move the xPos an extra space to the right since we've created an extra column
				xPos++;
			}
		}

		xPos++;
	}

	let galaxies = [];
	expanded.forEach((line, y) => {
		line.split("").forEach((char, x) => {
			if (char === "#") {
				galaxies.push({ x, y });
			}
		});
	});

	// find the total distance between each pair of galaxies
	let distance = 0;
	while(galaxies.length > 1) {
		let galaxy = galaxies.shift();
		galaxies.forEach(galaxy2 => {
			// x distance + y distance
			distance += Math.abs(galaxy.x - galaxy2.x) + Math.abs(galaxy.y - galaxy2.y);
		});
	}


	console.log("total distance:", distance)
	
});