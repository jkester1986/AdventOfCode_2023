fs = require('fs');
fs.readFile('Day9.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');

    let sum = 0;
    lines.forEach(line => {
        let nums = line.split(/\s+/).map(Number);
        // find difference until all are 0's
        let rows = [nums];
        let rowInd = 0;
        let done = false;
        while (!done) {
            let currRow = rows[rowInd];
            sum += currRow[currRow.length-1]
            if(isNaN(sum)) {
                console.log({rowLength: rows.length, rowInd, currRow, prev: rows[rowInd-1]})
                process.exit();
            }
            if (currRow.every(num => num === 0)) {
                done = true;
            }
            else {
                let nextRow = [];
                currRow.forEach((num, i) => {
                    if (i !== currRow.length - 1) {
                        const diff = currRow[i+1] - num;
                        nextRow.push(diff);
                    }
                })
                rowInd++;
                rows.push(nextRow);
            }
        }

    });

    console.log("P1:", sum)


});