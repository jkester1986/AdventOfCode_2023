// this is the P1 input
// const races = [{
//     time: 47,
//     distance: 207
// }, {
//     time: 84,
//     distance: 1394
// }, {
//     time: 74,
//     distance: 1209
// }, {
//     time: 67,
//     distance: 1014
// }];

const races = [{
    time: 47847467,
    distance: 207139412091014
}]

let product = 1;

races.forEach(({time, distance}, i)=> {
    let numOfWins = 0;
    // only need to get to the halfway mark
    // if there's a remainder, middle number exists
    // if not, no middle number
    const isEven = time % 2;
    let end =  Math.floor(time/2);
    loop:
    for (let holdFor = 0; holdFor <= end; holdFor++) {
        let newDistance = (time - holdFor) * holdFor;
        if (newDistance > distance) numOfWins ++;

        // if we already have some wins, and the distance is now too low,
        // we know we've found them all
        else if (newDistance < distance && numOfWins)
            break loop;
    }
    console.log({numOfWins})
    if (isEven) numOfWins *= 2;
    else numOfWins = (numOfWins - 1) * 2 + 1
    console.log(`race ${i+1} has ${numOfWins} possible wins`);
    product *= numOfWins;
})

console.log({product});