fs = require('fs');
fs.readFile('Day13.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let mountainClusters = data.split('\n\n');


  let totRows = 0;
  let totColumns = 0;
  mountainClusters.forEach((cluster, i) => {
    let group = cluster.split('\n').map(line => line.split(''));
    let { rows, columns } = findRowsAndColsFromMirror(group);
    totRows += rows;
    totColumns += columns;
  });

  console.log({totColumns, totRows})

  console.log("P1:", (totRows * 100) + totColumns);

});


function findRowsAndColsFromMirror(cluster) {
  let rows = 0;
  let columns = 0;
  // first look at rows
  let foundMirror;
  let row = 0;
  while (!foundMirror && row < cluster.length - 1) {
      let compareRows = true;
      let rowDiff = 0;
      while(compareRows) {
        let topRow = cluster[row - rowDiff]?.join("");
        let bottomRow = cluster[row + rowDiff + 1]?.join("");
        
        if(topRow && bottomRow) {
          if(topRow === bottomRow) {
            rowDiff++;
          }
          else {
            compareRows = false;
          }
        }
        else {
          // we dont' care about what's left
          foundMirror = true;
          compareRows = false;
        }
      }

      if(!foundMirror) {
        row++;
      }

  }

  if (foundMirror) {
    rows = row + 1;
    // return { rows, columns: 0 }
  }

  // next look at the columns
  foundMirror = false;
  let column = 0;
  while (!foundMirror && column < cluster.length - 1) {

    let compareColumns = true;
    let columnDiff = 0;
    while (compareColumns) {
      let leftColumn = cluster.map(row => row[column - columnDiff])?.join("");
      let rightColumn = cluster.map(row => row[column + columnDiff + 1])?.join("");
      
      if (leftColumn && rightColumn) {
        if (leftColumn === rightColumn) {
          columnDiff++;
        }
        else {
          compareColumns = false;
        }
      }
      else {
        // we dont' care about what's left
        foundMirror = true;
        compareColumns = false;
      }
    }

    if (!foundMirror) {
      column++;
    }

  }

  if (foundMirror) {
    columns = column + 1;
  }

  return { rows, columns}
  
}


// 30380 too low
// 30626 too high