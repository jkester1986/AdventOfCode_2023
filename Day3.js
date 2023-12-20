fs = require('fs');

function readFileAndSolve() {
    fs.readFile('Day3.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        const { tot, allPartNumbers } = day3P1Solver(data)

        console.log("P1", tot);
        // console.log("P2", day3P2Solver(data, allPartNumbers));
    });
}

readFileAndSolve();

function day3P1Solver(data) {
    let lines = data.split('\n');
    let lineCount = lines.length;

    let pattern = /(\d+)/g

    let tot = 0;
    let allPartNumbers = new Set();
    lines.forEach((line, i) => {
        let matches = line.match(pattern);
        let adjustedLine = line;
        matches?.forEach(match => {
            let numPattern = /(\d+)/;
            let numString = match.match(numPattern)[1]
            let num = Number(numString);

            // look above/below/left/right
            let matchIndex = adjustedLine.indexOf(match);
            // let numIndexInMatch = match.indexOf(num);
            let startingIndex = matchIndex - 1;
            let matchLength = match.length;
            let endingIndex = startingIndex + matchLength + 1;
            let excludePattern = /[^a-zA-Z\d\.]/;
            let foundAdjacent = false;
            if (line.charAt(startingIndex)?.match(excludePattern) || line.charAt(endingIndex)?.match(excludePattern)) {
                foundAdjacent = true;
            }

            if (i !== 0 && !foundAdjacent) {
                // check prev line
                loop:
                for (let ind = startingIndex; ind <= endingIndex; ind++) {
                    if (lines?.[i - 1]?.charAt(ind)?.match(excludePattern)) {
                        // found adjacent symbol
                        foundAdjacent = true;
                        break loop;
                    }
                }
            }
            if (i !== lineCount - 1 && !foundAdjacent) {
                // check next line
                if (num === 467) {
                }
                loop:
                for (let ind = startingIndex; ind <= endingIndex; ind++) {
                    let searchChar = lines[i + 1]?.charAt(ind);
                    if (searchChar?.match(excludePattern)) {
                        // found adjacent symbol
                        foundAdjacent = true;
                        break loop;
                    }
                }
            }
            if (foundAdjacent) {
                tot += num;
                console.log({ num, lineIdex: i, startingIndex, endingIndex })
                allPartNumbers.add({ num, lineIdex: i, startingIndex, endingIndex });
            }

            // replace the current number with periods
            adjustedLine = adjustedLine.replace(match, ".".repeat(match.length));
        })
    })

    return {tot, allPartNumbers};
}

function day3P2Solver(data, allPartNumbers) {
    let lines = data.split('\n');

    let total;
    let gearLocations = new Set();

    //iterate over all the parts, check to see if they are touching any gears,
    // if so, make sure the corresponding gear is touching exactly one other part
    // if so, multiply the two parts together, add to total, and add gear index to gear set

    return tot;
}

module.exports = { day3P1Solver };
