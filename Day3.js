fs = require('fs');
fs.readFile('Day3.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

    let lines = data.split('\n');
    let lineCount = lines.length;

    let pattern = /(\d+)/g

    let tot = 0;
    lines.forEach((line, i) => {
        let matches = line.match(pattern);
        // console.log({matches})
        matches?.forEach(match => {
            let numPattern = /(\d+)/;
            let numString = match.match(numPattern)[1]
            let num = Number(numString);
            // console.log({countPeriods, matchLength: match.length, numLength: numString.length, match})

            // look above/below/left/right
            let matchIndex = line.indexOf(match);
            // let numIndexInMatch = match.indexOf(num);
            let startingIndex = matchIndex-1;
            let matchLength = match.length;
            let endingIndex = startingIndex + matchLength + 1;
            let excludePattern = /[^a-zA-Z\d\.]/;
            let foundAdjacent = false;
            // console.log("looking for num:", num)
            if (line.charAt(startingIndex)?.match(excludePattern) || line.charAt(endingIndex)?.match(excludePattern)) {
                foundAdjacent = true;
            }

            if (i !== 0 && !foundAdjacent) {
                // console.log("looking in prev line")
                // check prev line
                loop:
                for (let ind = startingIndex; ind <= endingIndex; ind++) {
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
                // console.log("looking in next line")
                // check next line
                if (num === 467) {
                    console.log({i, startingIndex, endingIndex})
                }
                // console.log("next line:", lines[i+1])
                loop:
                for (let ind = startingIndex; ind <= endingIndex; ind++) {
                    // console.log({ind})
                    let searchChar = lines[i+1]?.charAt(ind);
                    if (searchChar?.match(excludePattern)) {
                        // found adjacent symbol
                        foundAdjacent = true;
                        // console.log("found symbol on next line")
                        break loop;
                    }
                }
            }
            if (foundAdjacent) {
                console.log("********************found!*******:", {num})
                tot += num;
                // process.exit();
            }
        })
        console.log("\n")
    })

    console.log({tot})
});
