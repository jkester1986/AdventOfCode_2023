fs = require('fs');
fs.readFile('Day4.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');

    let totPoints = 0;
    let cardVals = {};
    lines.forEach((line, i) => {
        let card = line.replace(/Card\s(\d+):/, "");
        let cardNum = i+1;
        const [winningNums, scratchedNums] = card.split("|");
        let winning = winningNums.trim().split(/\s+/);
        let scratched = scratchedNums.trim().split(/\s+/);


        let tot = 0;
        let matches = 0;
        scratched.forEach(num => {
            if(winning.includes(num)) {
                matches++;
                if (tot) tot*= 2;
                else tot = 1;
            }
        });

        // make sure card is counted for itself
        cardVals[`${cardNum}`] = {
            instances: (cardVals[`${cardNum}`]?.instances || 0) + 1
        };

        if(matches) {
            let start = cardNum + 1;
            let end = cardNum + matches;
            for (let i = start; i <= end; i++) {
                cardVals[`${i}`] = {
                    instances: (cardVals[`${i}`]?.instances || 0) + cardVals[`${cardNum}`].instances
                }
            }
        }
        totPoints += tot;
    });

    let totalCards = 0;
    Object.keys(cardVals).forEach(key => {
        totalCards += cardVals[key].instances;
    })
    console.log("P1:", totPoints);
    console.log("P2:", totalCards)

});
