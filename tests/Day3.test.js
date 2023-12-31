const { day3P1Solver } = require("../Day3");


describe("day3P1Solver", () => {

  let ex1 =
    "...."

  let ex2 =
    "1..\n" +
    "...\n"

  let ex3 =
    "1*.\n" +
    "...\n"
  
  let ex4 =
    "1..\n" +
    "*..\n"

  let ex5 =
    "1..\n" +
    ".*.\n"
  
  let ex6 =
    "1..\n" +
    "..*\n"

  let ex7 =
    "...\n" +
    ".1.\n"

  let ex8 =
    "...\n" +
    "*1.\n"

  let ex9 =
    "*..\n" +
    ".1.\n"

  let ex10 =
    ".*.\n" +
    ".1.\n"

  let ex11 =
    "..*\n" +
    ".1.\n"

  let ex12 =
    "..*\n" +
    ".1.\n"

  let ex13 =
    "...\n" +
    ".1*\n"

  let ex14 =
    "...\n" +
    "..1\n"

  let ex15 =
    ".*.\n" +
    "..1\n"

  let ex16 =
    "....\n" + 
    ".1..\n" +
    "...."

  let ex17 =
  "...........919*.....................................*.......234.........492..%...........300...........301........./866..........*..........\n" +
  "...............470.....440.874...116....240........299......................27......409.......................................639.136......."

  let ex18 =
  ".919*....\n" +
  ".....470."

  let ex19 =
    "12.......*..\n" +
    "+.........34\n" +
    ".......- 12..\n" +
    "..78........\n"+
    "..*....60...\n"+
    "78.........9\n"+
    ".5.....23..$\n"+
    "8...90 * 12...\n"+
    "............\n"+
    "2.2......12.\n"+
    ".*.........*\n"+
    "1.1..503 + .56\n"

  let ex20 =
    ".2.\n" +
    ".*.\n" +
    "585"

  let ex21 =
    ".......5......\n" +
    "..7*..*.......\n" +
    "...*13*.......\n" +
    ".......15....."

  let ex22 =
    ".......5......\n" +
    "..7*..*.......\n" +
    "...*13*.......\n" +
    ".......15.....\n" +
    "..............\n" +
    "..............\n" +
    "21............\n" +
    "...*9........."

  let ex23 =
    "100\n" +
    "200"

  let ex24 =
    "........\n" +
    ".24..4..\n" +
    "......*."

  it("should return a total of 0 for ex1", () => {
    expect(day3P1Solver(ex1).tot).toEqual(0);
  })

  it("should return a total of 0 for ex2", () => {
    expect(day3P1Solver(ex2).tot).toEqual(0);
  })

  it("should return a total of 1 for ex3", () => {
    expect(day3P1Solver(ex3).tot).toEqual(1);
  })

  it("should return a total of 1 for ex4", () => {
    expect(day3P1Solver(ex4).tot).toEqual(1);
  })

  it("should return a total of 1 for ex5", () => {
    expect(day3P1Solver(ex5).tot).toEqual(1);
  })

  it("should return a total of 0 for ex6", () => {
    expect(day3P1Solver(ex6).tot).toEqual(0);
  })

  it("should return a total of 0 for ex7", () => {
    expect(day3P1Solver(ex7).tot).toEqual(0);
  })

  it("should return a total of 1 for ex8", () => {
    expect(day3P1Solver(ex8).tot).toEqual(1);
  })

  it("should return a total of 1 for ex9", () => {
    expect(day3P1Solver(ex9).tot).toEqual(1);
  })

  it("should return a total of 1 for ex10", () => {
    expect(day3P1Solver(ex10).tot).toEqual(1);
  })

  it("should return a total of 1 for ex11", () => {
    expect(day3P1Solver(ex11).tot).toEqual(1);
  })

  it("should return a total of 1 for ex12", () => {
    expect(day3P1Solver(ex12).tot).toEqual(1);
  })

  it("should return a total of 1 for ex13", () => {
    expect(day3P1Solver(ex13).tot).toEqual(1);
  })

  it("should return a total of 0 for ex14", () => {
    expect(day3P1Solver(ex14).tot).toEqual(0);
  })

  it("should return a total of 1 for ex15", () => {
    expect(day3P1Solver(ex15).tot).toEqual(1);
  })

  it("should return a total of 0 for ex16", () => {
    expect(day3P1Solver(ex16).tot).toEqual(0);
  })

  it("should return a total of 3356 for ex17", () => {
    expect(day3P1Solver(ex17).tot).toEqual(3356);
  })

  it("should return a total of 1389 for ex18", () => {
    expect(day3P1Solver(ex18).tot).toEqual(1389);
  })

  it("should return a total of 925 for ex19", () => {
    expect(day3P1Solver(ex19).tot).toEqual(925);
  })

  it("should return a total of 587 for ex20", () => {
    expect(day3P1Solver(ex20).tot).toEqual(587);
  })

  it("should return a total of 40 for ex21", () => {
    expect(day3P1Solver(ex21).tot).toEqual(40);
  })

  it("should return a total of 49 for ex22", () => {
    expect(day3P1Solver(ex22).tot).toEqual(49);
  })

  it("should return a total of 0 for ex23", () => {
    expect(day3P1Solver(ex23).tot).toEqual(0);
  })

  it("should return a total of 4 for ex24", () => {
    expect(day3P1Solver(ex24).tot).toEqual(4);
  })

});