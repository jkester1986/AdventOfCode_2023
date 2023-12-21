fs = require('fs');

function readFileAndSolve() {
  fs.readFile('Day7.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    let lines = data.split('\n');

    
    let cardInfo = lines.map(hand => {
      let [cards, bid] = hand.split(" ");
      const strongestType = findStrongestTypePerCard(cards);
      return { cards, strongestType, bid: Number(bid) };
    });

    cardInfo.sort(sortCards);
    
    let totalWinnings = 0;
    // now, we have the rank, along with the bid
    cardInfo.forEach(({ bid }, ind) => {
      totalWinnings += bid * (ind + 1);
    })

    console.log("Answer:", totalWinnings);

  });
}

readFileAndSolve();

function sortHand(a, b) {
  // convert letters to numbers
  let aVal = Number(a);
  let bVal = Number(b);
  if (isNaN(aVal)) aVal = cardLetterToVal[a];
  if (isNaN(bVal)) bVal = cardLetterToVal[b];

  // negative if a is less than b, positive if a is greater than b, and zero if they are equal
  if (aVal < bVal) return -1;
  if (aVal > bVal) return 1;
  return 0;
}


// well, someone pointed out a dict would have been great. But this is already here so yeah
function findStrongestTypePerCard(hand) {
  const sortedHand = hand.split("").sort(sortHand).join("").replace(/J/g, ""); 

  const fiveOfAKindPattern = /(.)\1{4}/;
  const fourOfAKindPattern = /(.)\1{3}/;
  const fullHousePattern = /((.)\2{2}(.)\3|(.)\4(.)\5{2})/;
  const threeOfAKindPattern = /(.)\1{2}/;
  const twoPairsPattern = /(.)\1{1}.*(.)\2{1}/;
  const onePairPattern = /(.)\1{1}/;

  let handVal = 0;
  // cases, in order of importance
  // 1. Five of a kind
  if (sortedHand.match(fiveOfAKindPattern)) handVal = 6;
  // 2. Four of a kind
  else if (sortedHand.match(fourOfAKindPattern)) handVal =  5;
  // 3. Full house
  else if (sortedHand.match(fullHousePattern)) handVal =  4;
  // 4. Three of a kind
  else if (sortedHand.match(threeOfAKindPattern)) handVal =  3;
  // 5. Two pairs
  else if (sortedHand.match(twoPairsPattern)) handVal =  2;
  // 6. One pair
  else if (sortedHand.match(onePairPattern)) handVal =  1;
  // 7. no pairs, do nothing

  // if there are some J's, then we need to update the hand val
  if (hand.includes("J")) {
    let numJs = hand.match(/J/g).length;
    // we know the highest card is at the end, because that's how we sorted
    switch(handVal) {
      // no pairs
      case 0: {
        if (numJs === 1) return 1;
        // there's no pairs, so we convert the Js into the highest card in the hand
        // but also see if making all the J's Aces would give a higher value
        let highest = sortedHand.charAt(sortedHand.length - 1);
        let adjustedHandAces = hand.replace(/J/g, "A");
        let adjustedHandHighest = hand.replace(/J/g, highest);
        let adjustedHandAcesVal = findStrongestTypePerCard(adjustedHandAces);
        let adjustedHandHighestVal = findStrongestTypePerCard(adjustedHandHighest);
        return adjustedHandAcesVal > adjustedHandHighestVal ? adjustedHandAcesVal : adjustedHandHighestVal;
      }

      // one pair
      case 1:
        // highest number of J possible is 3
        if (numJs === 3) {
          // just make 5 of a kind
          return 6;
        }
        if (numJs === 2) {
          // make 4 of a kind
          return 5;
        }
        if (numJs === 1) {
          // make 3 of a kind
          return 3;
        }
      
      // two pairs
      case 2:
        // can only have 1 J, so make full house
        return 4;

      // three of a kind
      case 3: {
        // can either do:
        // 1. 2 Js => 5 of a kind
        if (numJs === 2) {
          return 6;
        }
        // 2. 1 J => 4 of a kind
        if (numJs === 1) {
          return 5;
        }
      }
      
      // not possible to have a full house and also have a J

      // four of a kind
      case 5:
        // can only have 1 J, so make 5 of a kind
        return 6;

      // also can't have 5 of a kind and a J
    }
  }

  return handVal;
}

const cardLetterToVal = {
  T: 10,
  // J: 11, // P1
  J: 1, // P2
  Q: 12,
  K: 13,
  A: 14
}

function sortCards(a, b) {
  // negative if a is less than b, positive if a is greater than b, and zero if they are equal
  if (a.strongestType < b.strongestType) {
    return -1;
  }
  if (a.strongestType > b.strongestType) {
    return 1
  };
  if (a.strongestType === b.strongestType) {
    // if they are equal, sort by the highest card based on card order
    let i = 0;
    let cardsToCompare = [a.cards.charAt(0), b.cards.charAt(0)];
    while (cardsToCompare[0] && cardsToCompare[1]  && cardsToCompare[0] === cardsToCompare[1]) {
      i++;
      cardsToCompare = [a.cards.charAt(i), b.cards.charAt(i)];
    }

    // now that we have different cards to compare, see which is higher
    let card1Val = Number(cardsToCompare[0]);
    let card2Val = Number(cardsToCompare[1]);

    // convert letters to numbers
    if (isNaN(card1Val)) card1Val = cardLetterToVal[cardsToCompare[0]];
    if (isNaN(card2Val)) card2Val = cardLetterToVal[cardsToCompare[1]];

    if (card1Val < card2Val) return -1;
    if (card1Val > card2Val) return 1;
    return 0;
  }
}

module.exports = {
  findStrongestTypePerCard,
  sortCards
};