const { findStrongestTypePerCard, sortCards } = require("../Day7");


let fiveKind1 = "11111";
let fiveKind2 = "22222";
let fourKind1 = "11121";
let fourKind2 = "22221";
let fourKind3 = "12222";
let fourKind4 = "32222";
let fullHouse1 = "11122";
let fullHouse2 = "22211";
let fullHouse3 = "JKJJK";
let fullHouse4 = "KJKJJ";
let fullHouse5 = "Q00Q0";
let threeKind1 = "11123";
let threeKind2 = "22213";
let threeKind3 = "12333";

describe("findStrongestTypePerCard", () => {
 it("should return 6 for 5 of a kind", () => {
    expect(findStrongestTypePerCard(fiveKind1)).toEqual(6);
    expect(findStrongestTypePerCard(fiveKind2)).toEqual(6);
  });

  it("should return 5 for 4 of a kind", () => {
    expect(findStrongestTypePerCard(fourKind1)).toEqual(5);
    expect(findStrongestTypePerCard(fourKind2)).toEqual(5);
    expect(findStrongestTypePerCard(fourKind3)).toEqual(5);
  });

  it("should return 4 for full house", () => {
    expect(findStrongestTypePerCard(fullHouse1)).toEqual(4);
    expect(findStrongestTypePerCard(fullHouse2)).toEqual(4);
    expect(findStrongestTypePerCard(fullHouse3)).toEqual(4);
    expect(findStrongestTypePerCard(fullHouse4)).toEqual(4);
    expect(findStrongestTypePerCard(fullHouse5)).toEqual(4);
  });

  it("should return 3 for 3 of a kind", () => {
    expect(findStrongestTypePerCard(threeKind1)).toEqual(3);
    expect(findStrongestTypePerCard(threeKind2)).toEqual(3);
    expect(findStrongestTypePerCard(threeKind3)).toEqual(3);
  });
});

describe("sortCards", () => {
  it("should put fiveKind2 before fiveKind1", () => {
    const cardInfo = [
      { cards: fiveKind2, strongestType: 6, bid: 1 },
      { cards: fiveKind1, strongestType: 6, bid: 1 },
    ];
    expect([...cardInfo].sort(sortCards)).toEqual([cardInfo[1], cardInfo[0]]);
  });

  it("should put fourKind3 before fourKind4", () => {
    const cardInfo = [
      { cards: fourKind4, strongestType: 5, bid: 1 },
      { cards: fourKind3, strongestType: 5, bid: 1 },
    ];
    expect([...cardInfo].sort(sortCards)).toEqual([cardInfo[1], cardInfo[0]]);
  })

  it("should put fourKind1 before fiveKind1", () => {
    const cardInfo = [
      { cards: fiveKind1, strongestType: 6, bid: 1 },
      { cards: fourKind1, strongestType: 5, bid: 1 },
    ];
    expect([...cardInfo].sort(sortCards)).toEqual([cardInfo[1], cardInfo[0]]);
  });

  it("should put fullHouse1 before fullHouse2", () => {
    const cardInfo = [
      { cards: fullHouse2, strongestType: 4, bid: 1 },
      { cards: fullHouse1, strongestType: 4, bid: 1 },
    ];
    expect([...cardInfo].sort(sortCards)).toEqual([cardInfo[1], cardInfo[0]]);
  });

  it("should put fullHouse5 before fullHouse4", () => {
    const cardInfo = [
      { cards: fullHouse4, strongestType: 4, bid: 1 },
      { cards: fullHouse5, strongestType: 4, bid: 1 },
    ];
    expect([...cardInfo].sort(sortCards)).toEqual([cardInfo[1], cardInfo[0]]);
  });
});