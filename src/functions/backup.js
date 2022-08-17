import React, { Component } from "react";
import { move } from "./move";
import { merge } from "./merge";

import {
  ParentContainer,
  Header,
  Board,
  NewGame,
  ScoreContainer,
  StepsContainer,
  Footer,
} from "../style/style";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      tiles: [
        // [null, null, null, null],
        // [null, null, null, null],
        // [null, null, null, null],
        // [null, null, null, null],
        // [null, null, null, null],
        // [2, null, 4, 8],
        // [16, 32, 64, 128],
        // [256, 512, 1024, 2048],
        // [2, 32, null, 4096],
      ],

      score: 0,
      restart: false,
      popup: true,
      gameWon: false,
      continue: false,
      gameOver: false,
      steps: 0,
    };
  }

  componentDidMount() {
    this.newGame(4);
    // console.log(this.popup);
  }

  newGame = (sizeArg) => {
    let size = sizeArg;
    // console.log(`Size of array: ${size}`);

    let m = [];
    let t = Array(size).fill(null);
    for (let i = 0; i < size; i++) {
      m.push(t.slice());
    }

    this.insertTile(m);
    this.insertTile(m);

    this.setState({
      tiles: m,
      score: 0,
      restart: false,
      popup: true,
      gameWon: false,
      continue: false,
      gameOver: false,
      steps: 0,
      calculation: 0,
    });
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
  //       if (!arrIndices.includes(i)) {
  //         t = ind.filter((x, j) => {
  //           if (currEl.cIndex === x.cIndex) {
  //             arrIndices.push(j);
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
  //           if (j !== 0 && m[i][j]) {
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
  //         }
  //       }
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

  random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  checkEmpty = (array) => {
    let arr = array.map((subArray) => {
      let res;
      res = subArray.some((value) => {
        return !value;
      });
      return res;
    });
    if (arr.includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  insertTile = (m, init = false) => {
    const maxValue = m.length - 1;
    // console.log(`Max Value: ${maxValue}`);

    let flag = init
      ? true
      : JSON.stringify(m) !== JSON.stringify(this.state.matrix);

    if (flag) {
      if (this.checkEmpty(m)) {
        let value = Math.random() < 0.9 ? 2 : 4;

        let rowIndex = this.random(0, maxValue);
        let colIndex = this.random(0, maxValue);
        while (m[rowIndex][colIndex]) {
          rowIndex = this.random(0, maxValue);
          colIndex = this.random(0, maxValue);
        }
        m[rowIndex][colIndex] = value;
      }
    }
  };

  countKey() {
    this.setState({
      steps: this.state.steps + 1,
    });
  }

  // calculation() {
  //   this.setState({
  //     calculation: this.state.score / this.state.steps,
  //   });
  // }

  handleArrowDown = async (e) => {
    const { key } = e;
    let score;
    if (
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "ArrowUp" ||
      key === "ArrowDown"
    ) {
      let index = [];
      // let score = this.state.score
      // let prevScore = this.state.score;

      const clone = (items) =>
        items.map((item) => (Array.isArray(item) ? clone(item) : item));

      let m = clone(this.state.tiles);

      m.forEach((row, i) => {
        row.forEach((element, j) => {
          if (element !== null) {
            index.push({ rIndex: i, cIndex: j, value: element });
          }
        });
      });

      let hasMatrixChanged;

      if (key === "ArrowLeft") {
        this.countKey();
        index.forEach((s) => {
          move(m, s, "left");
        });

        score = merge(m, index, "left");

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);

        if (hasMatrixChanged) {
          this.insertTile(m);
        }
      } else if (key === "ArrowUp") {
        this.countKey();

        index.forEach((s) => {
          move(m, s, "up");
        });

        score = merge(m, index, "up");
        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);

        if (hasMatrixChanged) {
          this.insertTile(m);
        }
      } else if (key === "ArrowRight") {
        this.countKey();

        let sortCol = index.slice().sort((a, b) => {
          if (a.cIndex > b.cIndex) {
            return -1;
          } else if (a.cIndex < b.cIndex) {
            return 1;
          }
          return 1;
        });

        sortCol.forEach((s) => {
          move(m, s, "right");
        });

        score = merge(m, sortCol, "right");

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);

        if (hasMatrixChanged) {
          this.insertTile(m);
        }
      } else if (key === "ArrowDown") {
        this.countKey();

        index
          .slice()
          .reverse()
          .forEach((s) => {
            move(m, s, "down");
          });

        score = merge(m, index.slice().reverse(), "down");

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);

        if (hasMatrixChanged) {
          this.insertTile(m);
        }
      }

      if (hasMatrixChanged) {
        this.setState({
          // prev: this.state.tiles,
          tiles: m,
          score,
          // prevScore,
        });
      }
    }
  };

  render() {
    // const { tiles } = this.state;
    return (
      <>
        {
          <div>
            {this.state.popup ? (
              <div className="popup">
                Use the arrow keys to combine tiles
                <b></b>
                and get to 2048!
                <div>
                  <div
                    className="popup-button"
                    onClick={() => this.setState({ popup: false })}
                  >
                    SURE
                  </div>
                </div>
              </div>
            ) : (
              <>
                <ParentContainer>
                  <Header>
                    <NewGame
                      onClick={() =>
                        this.setState({
                          restart: !this.state.restart,
                        })
                      }
                    >
                      New Game
                    </NewGame>

                    <ScoreContainer>
                      <div>
                        <strong style={{ color: "white" }}> SCORE : </strong>{" "}
                        <br />{" "}
                        <div style={{ color: "white" }}>
                          {" "}
                          {this.state.score}{" "}
                        </div>
                      </div>
                    </ScoreContainer>

                    <StepsContainer>
                      {" "}
                      <div>
                        <strong style={{ color: "white" }}> STEPS : </strong>{" "}
                        <br />{" "}
                        <div style={{ color: "white" }}>
                          {" "}
                          {this.state.steps}{" "}
                        </div>
                      </div>
                    </StepsContainer>
                  </Header>
                  <Board
                    ref={this.myRef}
                    onKeyDown={(e) => this.handleArrowDown(e)}
                    onBlur={() => this.setState({ focus: false })}
                    onFocus={() => this.setState({ focus: true })}
                    tabIndex="0"
                  >
                    {this.state.gameWon && (
                      <div className="game-won restart">
                        <div>
                          Congratulations <br />
                          You beat the game
                        </div>
                        <div
                          className="game-reset option green"
                          onClick={() => this.newGame(4)}
                        >
                          PLAY AGAIN
                        </div>
                      </div>
                    )}

                    {this.state.gameOver && (
                      <div className="game-won restart">
                        <div>Game Over!</div>
                        <div
                          className="game-reset option green"
                          onClick={() => this.newGame(4)}
                        >
                          PLAY AGAIN
                        </div>
                      </div>
                    )}

                    {this.state.restart && (
                      <div className="game-won restart">
                        Are you sure you want to <br />
                        start a new game?
                        <div
                          style={{
                            display: "flex",
                            fontSize: "40px",
                            width: "inherit",
                            justifyContent: "space-around",
                          }}
                        >
                          <div
                            className="game-reset option red"
                            onClick={() => this.setState({ restart: false })}
                          >
                            No
                          </div>
                          <div
                            className="game-reset option green"
                            onClick={() => this.newGame(4)}
                          >
                            Yes
                          </div>
                        </div>
                      </div>
                    )}

                    {this.state.tiles.map((row, i) =>
                      row.map((element, j) => (
                        <div
                          key={i + "-" + j}
                          className={
                            `board ` + (element !== null ? `exists ` : ``)
                          }
                        >
                          <div
                            className={
                              `tiles _` +
                              (this.state.tiles[i][j] !== null
                                ? this.state.tiles[i][j]
                                : ``)
                            }
                          >
                            {this.state.tiles[i][j]}
                          </div>
                        </div>
                      ))
                    )}
                  </Board>
                </ParentContainer>
                {/* <div>{console.log(this.state.score / this.state.steps)} </div> */}
                <Footer>
                  <strong>
                    {!this.state.focus && (
                      <p style={{ textAlign: "center" }}>
                        Please tap on any block to continue playing
                      </p>
                    )}
                  </strong>
                </Footer>
              </>
            )}
          </div>
        }
      </>
    );
  }
}
export default App;
