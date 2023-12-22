fs = require('fs');
fs.readFile('Day11.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	let expanded = [];

	const expansionAmount = 1_000_000 - 1;

	let expandYAt = [];
	// expand vertically
	lines.forEach((line, i) => {
		if(!line.includes("#")) {
			// expand universe
			// expanded.push(line);
			expandYAt.push(i);
		}
		expanded.push(line);
	});


	let expandXAt = [];

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
				expandXAt.push(xPos);
			}
		}

		xPos++;
	}

	let galaxies = [];
	let galaxyNumber = 0;
	expanded.forEach((line, y) => {
		line.split("").forEach((char, x) => {
			if (char === "#") {
				galaxyNumber++;
				galaxies.push({ x, y, galaxyNumber });
			}
		});
	});

	// find the total distance between each pair of galaxies
	let distance = 0;
	while(galaxies.length > 1) {
		let galaxy = galaxies.shift();
		galaxies.forEach(galaxy2 => {
			// x distance + y distance
			let localDistance = 0;
			localDistance += Math.abs(galaxy.x - galaxy2.x) + Math.abs(galaxy.y - galaxy2.y);

			// now do the expanded bits:
			// 1. find how many expanded rows are between the two galaxies
			expandYAt.forEach(y => {
				let higherY = galaxy.y > galaxy2.y ? galaxy.y : galaxy2.y;
				let lowerY = galaxy.y > galaxy2.y ? galaxy2.y : galaxy.y;
				if (y > lowerY && y < higherY) {
					localDistance += expansionAmount;
				}
			});

			// 2. find out how many expanded columns
			expandXAt.forEach(x => {
				let higherX = galaxy.x > galaxy2.x ? galaxy.x : galaxy2.x;
				let lowerX = galaxy.x > galaxy2.x ? galaxy2.x : galaxy.x;
				if (x > lowerX && x < higherX) {
					localDistance += expansionAmount;
				}
			});

			distance += localDistance;
		});
	}


	console.log("total distance:", distance)
	
});


/*
....1........
.........2...
3............
.............
.............
........4....
.5...........
.##.........6
..##.........
...##........
....##...7...
8....9.......
*/