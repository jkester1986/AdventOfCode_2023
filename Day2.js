fs = require('fs');
fs.readFile('Day2.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
    const gameCubes = {
        red: 12,
        green: 13,
        blue: 14
    };

    let idTotals = 0;
    let powers = 0;

    lines.forEach((line, i) => {
        let fixedLine = line.replace(/Game\s\d+:/, "");
        let pattern = /(\d)+\s(\w)+/g;
        let groups = fixedLine.match(pattern);

        let tooHigh = groups.some(group => {
            let [num, color] = group.split(" ");
            return gameCubes[color] < Number(num);
        });
        if (!tooHigh) idTotals += i+1;

        let minGameCubes = {}

        // yes, I realize I could optimize this so I'm not iterating twice
        groups.forEach(group => {
            let [num, color] = group.split(" ");
            if (!minGameCubes[color] || minGameCubes[color] < num) minGameCubes[color] = Number(num);
        });

        let power = Object.keys(minGameCubes).reduce((acc, color) => {
            acc *= minGameCubes[color];
            return acc;
        }, 1)
        powers += power;

    })

    console.log("P1:", idTotals);
    console.log("P2:", powers);

});