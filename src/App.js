import React, { Component } from "react";
import { move } from "./functions/move";
import { checkEmpty } from "./functions/checkEmpty";

import {
  ParentContainer,
  Header,
  Board,
  NewGame,
  Undo,
  ScoreContainer,
  StepsContainer,
  Footer,
} from "./style/style";
import "./style/App.css";

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
      prev: [],
      score: 0,
      prevScore: 0,
      restart: false,
      popup: true,
      gameWon: false,
      gameOver: false,
      steps: 0,
    };
  }

  componentDidMount() {
    this.newGame(4);
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
      prev: m,
      score: 0,
      prevScore: 0,
      restart: false,
      popup: true,
      gameWon: false,
      gameOver: false,
      steps: 0,
    });
  };

  random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

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

          if (dir === "up") {
            let index = 0;
            let lastIndex;

            temp.forEach((currentEl, i) => {
              let next = temp[i + 1];
              if (i !== lastIndex) {
                if (next) {
                  if (currentEl.value === next.value) {
                    matrix[index][currentEl.cIndex] = 2 * currentEl.value;
                    // console.log(
                    //   `matrix[index][currentEl.cIndex] = ${
                    //     matrix[index][currentEl.cIndex]
                    //   }`
                    // );
                    // matrix[currentEl.rIndex][currentEl.cIndex] =
                    //   2 * currentEl.value;
                    // console.log(
                    //   `matrix[currentEl.rIndex][currentEl.cIndex] = ${
                    //     matrix[currentEl.rIndex][currentEl.cIndex]
                    //   }`
                    // );

                    if (2 * currentEl.value === 2048) {
                      this.setState({
                        gameWon: true,
                      });
                    }

                    score = score + 2 * currentEl.value;
                    matrix[index + 1][currentEl.cIndex] = null;
                    // matrix[next.rIndex][next.cIndex] = null;
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

                  if (matrix[index + 1]) {
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
                if (i !== lastIndex) {
                  if (currentEl.value === next.value) {
                    matrix[index][currentEl.cIndex] = 2 * currentEl.value;
                    score = score + 2 * currentEl.value;
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
                }
              } else {
                if (i !== lastIndex) {
                  // console.log(currentEl.rIndex, currentEl.cIndex);
                  matrix[currentEl.rIndex][currentEl.cIndex] = null;
                  matrix[index][currentEl.cIndex] = currentEl.value;
                  if (matrix[index - 1]) {
                    matrix[index - 1][currentEl.cIndex] = null;
                  }

                  index -= 1;
                }
              }
            });
          }
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
            } else if (j !== 0) {
              if (!matrix[i][j] && matrix[i][j - 1]) {
                matrix[i][j] = matrix[i][j - 1];
                matrix[i][j - 1] = null;
              }
            }
          }
        }
      } else {
        for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j <= matrix[i].length - 1; j++) {
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
            } else if (j !== matrix[i].length) {
              if (!matrix[i][j] && matrix[i][j + 1]) {
                matrix[i][j] = matrix[i][j + 1];
                matrix[i][j + 1] = null;
              }
            }
          }
        }
      }
    }
    return score;
  };

  insertTile = (m, init = false) => {
    const maxValue = m.length - 1;
    // console.log(`Max Value: ${maxValue}`);

    let flag = init
      ? true
      : JSON.stringify(m) !== JSON.stringify(this.state.matrix);

    if (flag) {
      if (checkEmpty(m)) {
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

  undo = () => {
    this.setState({
      tiles: this.state.prev,
      score: this.state.prevScore,
    });
  };

  // decrease() {
  //   const [count, setCount] = useState(steps);
  //   const countRef = useRef(count);
  //   countRef.current = count;

  //   const decreaseSteps = () => {
  //     setTimeout(() => {
  //       console.log("working");
  //       if (this.state.steps > 0) {
  //         this.setState({
  //           steps: this.state.steps - 1,
  //         });
  //       }
  //     }, 4000);
  //   };
  // }

  decreaseSteps = () => {
    if (this.state.steps > 0) {
      this.setState({
        steps: this.state.steps - 1,
      });
    }
  };

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
      let prevScore = this.state.score;

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
        index.forEach((s) => {
          move(m, s, "left");
        });

        score = this.merge(m, index, "left");

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);

        if (hasMatrixChanged) {
          this.countKey();
          this.insertTile(m);
        }
      } else if (key === "ArrowUp") {
        index.forEach((s) => {
          move(m, s, "up");
        });

        score = this.merge(m, index, "up");
        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);

        if (hasMatrixChanged) {
          this.countKey();
          this.insertTile(m);
        }
      } else if (key === "ArrowRight") {
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

        score = this.merge(m, sortCol, "right");

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);

        if (hasMatrixChanged) {
          this.countKey();
          this.insertTile(m);
        }
      } else if (key === "ArrowDown") {
        index
          .slice()
          .reverse()
          .forEach((s) => {
            move(m, s, "down");
          });

        score = this.merge(m, index.slice().reverse(), "down");

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);

        if (hasMatrixChanged) {
          this.countKey();
          this.insertTile(m);
        }
      }

      if (hasMatrixChanged) {
        this.setState({
          prev: this.state.tiles,
          tiles: m,
          score,
          prevScore,
        });
      }
    }
  };

  render() {
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
                    OKK!
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
                    <Undo
                      onClick={() => {
                        this.undo();
                        this.decreaseSteps();
                      }}
                    >
                      UNDO{" "}
                    </Undo>

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
                        <div className="point">
                          You averaged {this.state.score / this.state.steps}{" "}
                          point per step.
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
