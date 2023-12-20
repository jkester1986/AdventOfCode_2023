fs = require('fs');

function readFileAndSolve() {
    fs.readFile('Day3.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        console.log("P1", day3Solver(data));
    });
}

readFileAndSolve();

function day3Solver(data) {
    let lines = data.split('\n');
    let lineCount = lines.length;

    let pattern = /(\d+)/g

    let tot = 0;
    lines.forEach((line, i) => {
        // let matches = regex2.execForAllGroups(line);
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
                // process.exit();
            }
            adjustedLine = adjustedLine.replace(match, ".".repeat(match.length));

            // replace the current number with periods
        })
    })

    return tot;
}

module.exports = { day3Solver };
