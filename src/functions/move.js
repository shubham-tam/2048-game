export function move(m, el, dir) {
  const maxValue = m.length - 1;

  // gives the state of row and column before key down

  let row = el.rIndex;
  // console.log(`previous row index is ${r}`);

  let column = el.cIndex;
  // console.log(`previous column index is ${c}`)

  // console.log("\n");

  if (dir === "up" && row !== 0) {
    while (row !== 0 && !m[row - 1][column]) {
      m[row - 1][column] = m[row][column];
      m[row][column] = null;

      row = row - 1;
    }
  }

  if (dir === "down" && row !== maxValue) {
    while (row !== maxValue && !m[row + 1][column]) {
      m[row + 1][column] = m[row][column];
      m[row][column] = null;

      row = row + 1;
    }
  }

  if (dir === "right" && column !== maxValue) {
    while (column !== maxValue && !m[row][column + 1]) {
      m[row][column + 1] = m[row][column];
      m[row][column] = null;

      column = column + 1;
    }
  }

  if (dir === "left" && column !== 0) {
    while (column !== 0 && !m[row][column - 1]) {
      m[row][column - 1] = m[row][column];
      m[row][column] = null;

      column = column - 1;
    }
  }
}
