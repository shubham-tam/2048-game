export function move(matrix, el, dir) {
  const maxValue = matrix.length - 1;

  // gives the state of row and column before key down

  let row = el.rIndex;
  // console.log(`previous row index is ${r}`);

  let column = el.cIndex;
  // console.log(`previous column index is ${c}`)

  // console.log("\n");

  if (dir === "up" && row !== 0) {
    while (row !== 0 && !matrix[row - 1][column]) {
      matrix[row - 1][column] = matrix[row][column];
      matrix[row][column] = null;

      row = row - 1;
    }
  }

  if (dir === "down" && row !== maxValue) {
    while (row !== maxValue && !matrix[row + 1][column]) {
      matrix[row + 1][column] = matrix[row][column];
      matrix[row][column] = null;

      row = row + 1;
    }
  }

  if (dir === "right" && column !== maxValue) {
    while (column !== maxValue && !matrix[row][column + 1]) {
      matrix[row][column + 1] = matrix[row][column];
      matrix[row][column] = null;

      column = column + 1;
    }
  }

  if (dir === "left" && column !== 0) {
    while (column !== 0 && !matrix[row][column - 1]) {
      matrix[row][column - 1] = matrix[row][column];
      matrix[row][column] = null;

      column = column - 1;
    }
  }
}
