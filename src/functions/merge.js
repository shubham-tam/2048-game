merge = (mat, ind, dir) => {
  let matrix = mat.slice();
  let arrayIndices = [];
  let temp = [];
  let score = this.state.score;
  const maxValue = mat.length - 1;

  if (dir === "up" || dir === "down") {
    // i = change in the tile position/index (i.e max = 16 and each tile is unique)
    // forEach((element, index)

    ind.forEach((currentEl, i) => {
      // filter((element, index)
      if (!arrayIndices.includes(i)) {
        temp = ind.filter((x, j) => {
          if (currentEl.cIndex === x.cIndex) {
            // j = no. of tiles in the row (position )
            // j = change in the tile position/index (i.e max = 16 and each tile is unique)
            arrayIndices.push(j);
            return currentEl.cIndex === x.cIndex;
          }
          return null;
        });
      }

      if (dir === "up") {
        let index = 0;
        let lastIndex;

        temp.forEach((currentEl, i) => {
          let next = temp[i + 1];
          if (i !== lastIndex) {
            if (next) {
              if (currentEl.value === next.value) {
                matrix[index][currentEl.cIndex] = 2 * currentEl.value;
                matrix[currentEl.rIndex][currentEl.cIndex] =
                  2 * currentEl.value;

                if (2 * currentEl.value === 2048) {
                  this.setState({
                    gameWon: true,
                  });
                }

                score = score + 2 * currentEl.value;
                matrix[next.rIndex][next.cIndex] = null;
                matrix[index + 1][currentEl.cIndex] = null;
                index += 1;
                lastIndex = i + 1;
              } else {
                matrix[index + 1][currentEl.cIndex] = null;
                matrix[currentEl.rIndex][currentEl.cIndex] = null;
                matrix[index][currentEl.cIndex] = currentEl.value;
                index += 1;
              }
            } else {
              matrix[currentEl.rIndex][currentEl.cIndex] = null;
              matrix[index][currentEl.cIndex] = currentEl.value;

              if (matrix[(index = 1)]) {
                matrix[index + 1][currentEl.cIndex] = null;
              }
              index += 1;
              lastIndex = null;
            }
          }
        });
      } else if (dir === "down") {
        // max value cuz max no of rows as we pushin the array down
        let index = maxValue;
        let lastIndex;

        temp.forEach((currentEl, i) => {
          let next = temp[i + 1];
          if (next) {
            if (i != lastIndex) {
              if (currentEl.value === next.value) {
                matrix[index][currentEl.cIndex] = 2 * currentEl.value;
                score = score = 2 * currentEl.value;
                if (2 * currentEl.value === 2048) {
                  this.setState({
                    gameWon: true,
                  });
                }
                matrix[next.rIndex][next.cIndex] = null;
                matrix[index - 1][currentEl.cIndex] = null;
                index -= 1;
                lastIndex = i + 1;
              } else {
                matrix[index][currentEl.cIndex] = currentEl.value;

                matrix[index - 1][currentEl.cIndex] = null;
                index -= 1;
              }
            } else {
              if (i !== lastIndex) {
                // console.log(currentEl.rIndex, currentEl.cIndex);
                matrix[currentEl.rIndex][currentEl.cIndex] = null;
                matrix[index][currentEl.cIndex] = currentEl.value;
                if (matrix[index - 1]) {
                  matrix[index - 1][currentEl.cIndex] = null;
                }

                index = index - 1;
              }
            }
          }
        });
      }
    });
  } else if (dir === "left" || dir === "right") {
    if (dir === "right") {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = matrix[i].length - 1; j >= 0; j--) {
          // matrix[i][j] = whatever matrix is shifted right
          if (j !== 0 && matrix[i][j]) {
            if (matrix[i][j] === matrix[i][j - 1]) {
              if (2 * matrix[i][j] === 2048) {
                this.setState({
                  gameWon: true,
                });
              }
              matrix[i][j] = 2 * matrix[i][j];
              score = score + 2 * matrix[i][j];
              matrix[i][j - 1] = null;
            }
          }
        }
      }
    } else if (dir === "left") {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length - 1; j++) {
          if (j !== matrix[i].length && matrix[i][j]) {
            if (matrix[i][j] === matrix[i][j + 1]) {
              if (2 * matrix[i][j] === 2048) {
                this.setState({
                  gameWon: true,
                });
              }
              matrix[i][j] = 2 * matrix[i][j];
              score = score + 2 * matrix[i][j];
              matrix[i][j + 1] = null;
            }
          }
        }
      }
    }
  }
  return score;
};

// merge = (mat, ind, dir) => {
//   let m = mat.slice();
//   let arrIndices = [];
//   let t = [];
//   let score = this.state.score;
//   const maxValue = mat.length - 1;

//   // up and down case
//   if (dir === "up" || dir === "down") {
//     ind.forEach((currEl, i) => {
//       // console.log(`currEl ${currEl}`);
//       // console.log(`i ${i}`);
//       if (!arrIndices.includes(i)) {
//         // console.log(i);
//         t = ind.filter((x, j) => {
//           // console.log(`currEl.cIndex ${currEl.cIndex}`);
//           // console.log(`x.cIndex ${x.cIndex}`);

//           // console.log(`x ${x}`);
//           // console.log(`j ${j}`);

//           // console.log("\n");
//           if (currEl.cIndex === x.cIndex) {
//             // console.log(`currEl.cIndex ${currEl.cIndex}`);
//             // console.log(`x.cIndex ${x.cIndex}`);

//             // console.log("\n");

//             arrIndices.push(j);

//             // console.log(`j ${j}`);

//             return currEl.cIndex === x.cIndex;
//           }
//           return null;
//         });

//         if (dir === "up") {
//           let index = 0;
//           let lastIndex;
//           t.forEach((currEl, i) => {
//             let next = t[i + 1];
//             if (i !== lastIndex) {
//               if (next) {
//                 if (currEl.value === next.value) {
//                   m[index][currEl.cIndex] = 2 * currEl.value;
//                   m[currEl.rIndex][currEl.cIndex] = 2 * currEl.value; // might seem repetitive, but is needed
//                   if (2 * currEl.value === 2048) {
//                     this.setState({
//                       gameWon: true,
//                     });
//                   }

//                   score = score + 2 * currEl.value;
//                   m[next.rIndex][next.cIndex] = null;
//                   m[index + 1][currEl.cIndex] = null; // might seem repetitive, but is needed
//                   index = index + 1;
//                   lastIndex = i + 1;
//                 } else {
//                   m[index + 1][currEl.cIndex] = null;
//                   m[currEl.rIndex][currEl.cIndex] = null;
//                   m[index][currEl.cIndex] = currEl.value;
//                   index = index + 1;
//                 }
//               } else {
//                 m[currEl.rIndex][currEl.cIndex] = null;
//                 m[index][currEl.cIndex] = currEl.value;

//                 if (m[index + 1]) {
//                   m[index + 1][currEl.cIndex] = null;
//                 }

//                 index = index + 1;
//                 lastIndex = null;
//               }
//             }
//           });
//         } else if (dir === "down") {
//           let index = maxValue; //max-rows
//           let lastIndex;

//           t.forEach((currEl, i) => {
//             let next = t[i + 1];
//             if (next) {
//               if (i !== lastIndex) {
//                 if (currEl.value === next.value) {
//                   m[index][currEl.cIndex] = 2 * currEl.value;
//                   score = score + 2 * currEl.value;
//                   if (2 * currEl.value === 2048) {
//                     this.setState({
//                       gameWon: true,
//                     });
//                   }
//                   m[next.rIndex][next.cIndex] = null;
//                   m[index - 1][currEl.cIndex] = null;
//                   index = index - 1;
//                   lastIndex = i + 1;
//                 } else {
//                   m[index][currEl.cIndex] = currEl.value;

//                   m[index - 1][currEl.cIndex] = null;
//                   index = index - 1;
//                 }
//               }
//             } else {
//               if (i !== lastIndex) {
//                 // console.log(currEl.rIndex, currEl.cIndex);
//                 m[currEl.rIndex][currEl.cIndex] = null;
//                 m[index][currEl.cIndex] = currEl.value;
//                 if (m[index - 1]) {
//                   m[index - 1][currEl.cIndex] = null;
//                 }

//                 index = index - 1;
//               }
//             }
//           });
//         }
//       }
//     });
//   }

//   // left and right case
//   else if (dir === "right" || dir === "left") {
//     if (dir === "right") {
//       for (let i = 0; i < m.length; i++) {
//         for (let j = m[i].length - 1; j >= 0; j--) {
//           // console.log(rowIndex);
//           // console.log(m[j].length);
//           // console.log(j);
//           // console.log(m[i][j]);

//           if (j !== 0 && m[i][j]) {
//             // console.log(m[i][j]);
//             if (m[i][j] === m[i][j - 1]) {
//               if (2 * m[i][j] === 2048) {
//                 this.setState({
//                   gameWon: true,
//                 });
//               }
//               m[i][j] = 2 * m[i][j];
//               score = score + 2 * m[i][j];
//               m[i][j - 1] = null;
//             }
//           }

//           // if (( m[i][j] !== m[i][j - 1])) && j === 3) {

//           // }
//           // if (m.length && m[i][j] !== m[i][j - 1]) {
//           //   this.setState({
//           //     gameOver: true,
//           //   });
//           //   // console.log("full");
//           // }
//           // if ((m = m.length && m[i][j] !== m[i][j - 1])) {
//           //   this.setState({
//           //     gameOver: true,
//           //   });
//           // }

//           // if (m[i][j] !== null && m[i][j] === m[i][j - 1]) {
//           //   this.setState({ gameOver: true });
//           // }
//           // console.log(m[i][j]);

//           //
//           // console.log(m[i][j]);

//           // if (m[i][j] != null && m[i][j] !== m[i][j - 1]) {
//           //   console.log("gameOver");
//           //   this.setState({ gameOver: true });
//           // }

//           // console.log(m[i][j]);
//           // if (m[i][j] != null) {
//           //   console.log("gameOver");
//           //   this.setState({ gameOver: true });
//           // }
//         }
//       }
//       // for (let i = maxValue - 1; i < maxValue; i++) {
//       //   for (let j = maxValue[i].length; j >= 0; j--) {
//       //     if (m[i][j] !== m[i][j - 1]) {
//       //       this.setState({
//       //         gameOver: true,
//       //       });
//       //     }
//       //   }
//       // }
//     } else if (dir === "left") {
//       for (let i = 0; i < m.length; i++) {
//         for (let j = 0; j <= m[i].length - 1; j++) {
//           if (j !== m[i].length && m[i][j]) {
//             if (m[i][j] === m[i][j + 1]) {
//               if (2 * m[i][j] === 2048) {
//                 this.setState({
//                   gameWon: true,
//                 });
//               }
//               m[i][j] = 2 * m[i][j];
//               score = score + 2 * m[i][j];
//               m[i][j + 1] = null;
//             }
//           }
//         }
//       }
//     }
//   }

//   return score;
// };
