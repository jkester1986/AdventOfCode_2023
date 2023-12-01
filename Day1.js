fs = require('fs');
fs.readFile('Day1.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
    let total = 0;

    lines.forEach(line => {
        pattern = /(\d)/g;
        let match = line.match(pattern);
        let num = match[0] + match[match.length-1];
        total += Number(num);
    });

    console.log("P1:", total);

    let total2 = 0;
    let numbersSpelled = [
        "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
    ]

    let numbersMapped = {
        "one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight":"8", "nine": "9"
    }

    lines.forEach((line, ind) => {
        pattern = /(\d)/;
        let lineReversed = line.split('').reverse().join('');
        let intMatchForward = line.match(pattern);
        let intMatchBackward = lineReversed.match(pattern);
        let firstIntIndex = intMatchForward.index;
        let lastIntIndex = intMatchBackward.index;

        let firstStringIndex = {
            index: -1,
            word: ""
        };
        let lastStringIndex = {
            index: -1,
            word: ""
        };
        for(i = 0; i < 9; i++ ) {
            const word = numbersSpelled[i];
            const wordReversed = word.split('').reverse().join('');
            const currentWordForwardIndex = line.indexOf(word);
            const currentWordBackwardIndex = lineReversed.indexOf(wordReversed);
            if (line.indexOf(word) > -1) {
                if (firstStringIndex.index === -1 || firstStringIndex.index > currentWordForwardIndex) {
                    firstStringIndex = {
                        index: currentWordForwardIndex,
                        word
                    }
                }
            }
            if(lineReversed.indexOf(wordReversed) > -1) {
                if (lastStringIndex.index === -1 || lastStringIndex.index > currentWordBackwardIndex) {
                    lastStringIndex = {
                        index: currentWordBackwardIndex,
                        word: word
                    }
                }
            }
        }

        let firstNum = ""
        let secondNum = ""
        if (firstStringIndex.index !== -1 && firstIntIndex > firstStringIndex.index) {
            // use the string
            firstNum = numbersMapped[firstStringIndex.word];
        }
        else firstNum = intMatchForward[1];

        if(lastStringIndex.index !== -1 && lastIntIndex > lastStringIndex.index) {
            // use the string
            secondNum = numbersMapped[lastStringIndex.word];
        }
        else secondNum = intMatchBackward[1];


        let fullNum = firstNum + secondNum;

        total2 += Number(fullNum);
    });
    console.log("P2", total2)
});
