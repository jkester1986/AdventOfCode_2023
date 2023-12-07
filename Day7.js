fs = require('fs');
fs.readFile('Day7.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');

  
  let cardInfo = lines.map(hand => {
    let [cards, bid] = hand.split(" ");
    const strongestType = findStrongestTypePerCard(cards);
    // console.log({strongestType})
    // console.log({ cards, strongestType, bid });
    return { cards, strongestType, bid };
  });

  
  cardInfo.sort(sortCards);
  
  let totalWinnings = 0;
  // now, we have the rank, along with the bid
  cardInfo.forEach(({cards, strongestType, bid}, ind) => {
    console.log({cards, strongestType, bid})
    totalWinnings += bid * (ind + 1);
  })

  // console.log({cardInfo})
  console.log("P1:", totalWinnings);

});

// well, someone pointed out a dict would have been great. But this is already here so yeah
function findStrongestTypePerCard(cards) {
  const sortedCards = cards.split("").sort().join(""); 
  // console.log({sortedCards})
  // cases, in order of importance
  // 1. Five of a kind
  if (sortedCards.match(/(.)\1{4}/)) return 6;
  // 2. Four of a kind
  if (sortedCards.match(/(.)\1{3}/)) return 5;
  // 3. Full house
  if (sortedCards.match(/((.)\2{2}(.)\3|(.)\3(.)\5{2})/)) return 4;
  // 4. Three of a kind
  if (sortedCards.match(/(.)\1{2}/)) return 3;
  // 5. Two pairs
  if (sortedCards.match(/(.)\1{1}.*(.)\2{1}/)) return 2;
  // 6. One pair
  if (sortedCards.match(/(.)\1{1}/)) return 1;
  // 7. no pairs;
  return 0;
}

const cardLetterToVal = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

function sortCards(a, b) {
  // negative if a is less than b, positive if a is greater than b, and zero if they are equal
  if (a.strongestType < b.strongestType) {
    // console.log("a less than b", {a, b});
    return -1;
  }
  if (a.strongestType > b.strongestType) {
    // console.log(" a > b", { a, b });
    return 1
  };
  if (a.strongestType === b.strongestType) {
    // console.log(" a = b", { a, b });
    // if they are equal, sort by the highest card based on card order
    let i = 0;
    let cardsToCompare = [a.cards.charAt(0), b.cards.charAt(0)];
    // console.log("------- starting while with:", {cardsToCompare});
    while (cardsToCompare[0] && cardsToCompare[1]  && cardsToCompare[0] === cardsToCompare[1]) {
      i++;
      cardsToCompare = [a.cards.charAt(i), b.cards.charAt(i)];
      // console.log("comparing", {a, b, i}, cardsToCompare)
    }

    // now that we have different cards to compare, see which is higher
    let card1Val = Number(cardsToCompare[0]);
    let card2Val = Number(cardsToCompare[1]);
    // console.log("comparing", { a, b, i },  cardsToCompare, card1Val, card2Val)

    // convert letters to numbers
    if (isNaN(card1Val)) card1Val = cardLetterToVal[cardsToCompare[0]];
    if (isNaN(card2Val)) card2Val = cardLetterToVal[cardsToCompare[1]];

    if (card1Val < card2Val) return -1;
    if (card1Val > card2Val) return 1;
    return 0;
  }
}