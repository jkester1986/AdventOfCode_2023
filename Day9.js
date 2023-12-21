fs = require('fs');
fs.readFile('Day9.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');

    let rightHistory = 0;
    let leftHistorySum = 0;
    lines.forEach(line => {
        let nums = line.split(/\s+/).map(Number);
        // find difference until all are 0's
        let rows = [nums];
        let rowInd = 0;
        let done = false;
        while (!done) {
            let currRow = rows[rowInd];
            rightHistory += currRow[currRow.length-1]
            if(isNaN(rightHistory)) {
                console.log({rowLength: rows.length, rowInd, currRow, prev: rows[rowInd-1]})
                process.exit();
            }
            if (currRow.every(num => num === 0)) {
                done = true;
                currRow.unshift(0);
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


        let rowEndIndex = rows.length - 1;
        let leftHistory = 0;
        for (let i = rowEndIndex; i >= 0; i--) {
            // console.log({ currRow: rows[i], prevRow: rows[i - 1] })
            let currLeftNum = rows[i][0];
            let prevRowLeftNum = rows[i-1]?.[0];
            console.log({ currLeftNum, prevRowLeftNum, diff: prevRowLeftNum - currLeftNum })
            if (typeof prevRowLeftNum === "number") {
                leftHistory = prevRowLeftNum - currLeftNum;
                rows[i - 1].unshift(leftHistory);
                console.log("new prev row:", rows[i - 1]);
            }
            console.log("\n");
        }
        leftHistorySum += leftHistory;

    });

    console.log("P1:", rightHistory)
    console.log("P2:", leftHistorySum);

});