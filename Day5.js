const { range } = require('lodash');

fs = require('fs');
fs.readFile('Day5.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

    let groups = data.split('\n\n');
    let seeds;
    let mapping = {
        seed: {ranges: []},
        soil: {ranges: []},
        water: {ranges: []},
        fertilizer: {ranges: []},
        light: {ranges: []},
        temperature: {ranges: []},
        humidity: {ranges: []},
        location: {ranges: []},
    }
    groups.forEach((group, i) => {
        if (i === 0)
            seeds = groups[0].replace("seeds:", "").trim().split(" ");
        else {
            let lines = group.split('\n');
            let mappingGroup;
            lines.forEach((line, ind) => {
                if (ind === 0) {
                    pattern = /(\w+)-(\w+)-(\w+)/
                    let match = line.match(pattern);
                    // console.log({match, mapping})
                    mappingGroup = mapping[`${match[1]}`];
                    mappingGroup.mappingType = match[3];
                }
                else {
                    // console.log({line})
                   let [destination, source, range] = line.split(" ").map(Number);
                //    console.log({destination, source, range});
                   mappingGroup.ranges.push({
                    low: source,
                    high: source + range,
                    range,
                    destination
                   })
                //    console.log({mappingGroup})
                }
            })
        }
    })

    // console.log('\n')

    let lowestLoc;
    let lowestSeed;
    seeds.forEach(seed => {
        let source = mapping.seed;
        let currSourceVal = seed;
        // console.log({source, currSourceVal})
        while (source.mappingType) {
            let {destination, destinationVal} = findNextSource(currSourceVal, source);
            // console.log({destination, destinationVal})
            source = mapping[`${destination}`];
            currSourceVal = destinationVal;
        }
        if (!lowestLoc || currSourceVal < lowestLoc) {
            lowestLoc = currSourceVal;
            lowestSeed = seed;
        }
    })
    console.log({lowestSeed, lowestLoc})

    let p2LowestLoc;
    let p2LowestSeed;
    let seedPairTotal = seeds.length/2;
    for(let i = 0; i < seedPairTotal; i += 2) {
        let start = Number(seeds[i]);
        let range = Number(seeds[i+1]);
        let end = start + range;
        console.log({start, end, diff: end-start})
        for (let j = start; j < end; j++) {
            // copied from P1
            let seed = j;
            let source = mapping.seed;
            let currSourceVal = seed;
            // console.log({source, currSourceVal})
            while (source.mappingType) {
                let {destination, destinationVal} = findNextSource(currSourceVal, source);
                // console.log({destination, destinationVal})
                source = mapping[`${destination}`];
                currSourceVal = destinationVal;
            }
            if (!p2LowestLoc || currSourceVal < p2LowestLoc) {
                p2LowestLoc = currSourceVal;
                p2LowestSeed = seed;
            }
        }
    }

    console.log({lowestSeed, lowestLoc})
    console.log({p2LowestLoc, p2LowestSeed})

});

function findNextSource(currSourceVal, currSourceObj) {
    let destinationVal;
    currSourceObj.ranges.some(range => {
        // console.log(currSourceVal, range)
        if (currSourceVal >= range.low && currSourceVal <= range.high) {
            let diff = currSourceVal - range.low;
            destinationVal = range.destination + diff;
            return true;
        }
    });
    if (!destinationVal) destinationVal = currSourceVal;
    return { destinationVal, destination: currSourceObj.mappingType};
}