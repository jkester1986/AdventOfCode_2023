const { lookup } = require('dns');

fs = require('fs');
fs.readFile('Day3.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

    let lines = data.split('\n');
    let lineCount = lines.length;

    let pattern = /(.(\d+).)/g

    let tot = 0;
    lines.forEach((line, i) => {
        let matches = line.match(pattern);
        matches?.forEach(match => {
            let findPeriod = /\./g;
            let countPeriods = match.match(findPeriod)?.length || 0;
            let numPattern = /(\d+)/;
            let numString = match.match(numPattern)[1]
            let num = Number(numString);
            // console.log({countPeriods, matchLength: match.length, numLength: numString.length, match})
            if(countPeriods < match.length - numString.length) { // we know there's an adjacent symbol, don't need to look further
                tot += num;
                // console.log("found symbol in same line")
                // console.log("********************found!*******:", {num})
            }
            else {
                // keep looking above/below
                let matchIndex = line.indexOf(match);
                // let numIndexInMatch = match.indexOf(num);
                let startingIndex = matchIndex;
                let matchLength = match.length;
                let endingIndex = startingIndex + matchLength;
                let excludePattern = /[^a-zA-Z\d\.]/;
                let foundAdjacent = false;
                // console.log("looking for num:", num)
                if (i !== 0) {
                    // check prev line
                    loop:
                    for (let ind = startingIndex; ind < endingIndex; ind++) {
                        // console.log({i, ind})
                        if (lines?.[i-1]?.charAt(ind)?.match(excludePattern)) {
                            // found adjacent symbol
                            foundAdjacent = true;
                            // console.log("found symbol on prev line")
                            break loop;
                        }
                    }
                }
                if (i !== lineCount - 1  && !foundAdjacent) {
                    // check next line
                    if (num === 467) {
                        // console.log({i, startingIndex, endingIndex})
                    }
                    loop:
                    for (let ind = startingIndex; ind < endingIndex; ind++) {
                        // console.log({ind})
                        if (lines?.[i+1]?.charAt(ind)?.match(excludePattern)) {
                            // found adjacent symbol
                            foundAdjacent = true;
                            // console.log("found symbol on next line")
                            break loop;
                        }
                    }
                }
                if (foundAdjacent) {
                    // console.log("********************found!*******:", {num})
                    tot += num;
                    // process.exit();
                }
            }
        })
    })

    console.log({tot})
});
