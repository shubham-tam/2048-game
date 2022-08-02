import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRotate } from "@fortawesome/free-solid-svg-icons";
import {
  ParentContainer,
  Header,
  Board,
  NewGame,
  ScoreContainer,
  Footer,
} from "./style";
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

      // prev: [],
      // score: 2,
      // prevScore: 0,
      // gridChange: false,
      // optedForRestart: false,
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
      score: 0,
    });
  };

  move = (m, el, dir) => {
    // both rows and columns will be equal
    const maxValue = m.length - 1;

    let r = el.rIndex;
    // console.log(`row index is ${r}`);
    let c = el.cIndex;
    // console.log(`column index is ${c}`);
    // console.log("\n");

    if (dir === "up" && r !== 0) {
      //shift logic
      while (r !== 0 && !m[r - 1][c]) {
        m[r - 1][c] = m[r][c];
        m[r][c] = null;
        // if (r - 1 > 0) {
        r = r - 1;
        // } else {
        // break;
        // }
      }
    }

    if (dir === "down" && r !== maxValue) {
      while (r !== maxValue && !m[r + 1][c]) {
        m[r + 1][c] = m[r][c];
        m[r][c] = null;
        r = r + 1;
      }
    }

    // c = 3;

    if (dir === "right" && c !== maxValue) {
      while (c !== maxValue && !m[r][c + 1]) {
        m[r][c + 1] = m[r][c];
        m[r][c] = null;
        c = c + 1;
      }
    }

    if (dir === "left") {
      while (c !== 0 && !m[r][c - 1]) {
        m[r][c - 1] = m[r][c];
        m[r][c] = null;
        c = c - 1;
      }
    }
  };

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

  handleKeyDown = async (e) => {
    const { key } = e;
    // let score;
    if (
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "ArrowUp" ||
      key === "ArrowDown"
    ) {
      let ind = [];
      let hasMatrixChanged;

      const check = (items) =>
        items.map((item) => (Array.isArray(item) ? check(item) : item));

      // let m = this.state.tiles
      let m = check(this.state.tiles);

      m.forEach((row, i) => {
        row.forEach((element, j) => {
          if (element !== null) {
            ind.push({ rIndex: i, cIndex: j, value: element });
          }
        });
      });

      if (key === "ArrowLeft") {
        ind.forEach((s) => {
          this.move(m, s, "left");
        });

        // check status of matrix on left keypress

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);

        // console.log(hasMatrixChanged);
      } else if (key === "ArrowUp") {
        ind.forEach((s) => {
          this.move(m, s, "up");
        });

        // score = this.merge(m, ind, "up");
        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);
      } else if (key === "ArrowRight") {
        // let colSorted = ind.slice().sort((a, b) => {
        //   if (a.cIndex > b.cIndex) {
        //     return -1;
        //   } else if (a.cIndex < b.cIndex) {
        //     return 1;
        //   }
        //   return 1;
        // });

        // colSorted.forEach((s) => {
        //   this.move(m, s, "right");
        // });

        ind.forEach((s) => {
          this.move(m, s, "right");
        });

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);
        // console.log(hasMatrixChanged);
      } else if (key === "ArrowDown") {
        ind
          // .slice()
          .reverse()
          .forEach((s) => {
            this.move(m, s, "down");
          });

        // ind.forEach((s) => {
        //   this.move(m, s, "down");
        // });

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.tiles);
      }

      if (hasMatrixChanged) {
        this.setState({
          tiles: m,
          score: 0,
        });
      }
    }
  };

  render() {
    // const { tiles } = this.state;
    return (
      <div>
        <ParentContainer>
          <Header>
            <NewGame>
              {/* <FontAwesomeIcon
                // onClick={}
                icon={faRotate}
                size="2x"
                style={{
                  marginTop: "100px",
                  cursor: "pointer",
                  // marginLeft: "-20px",
                }}
              /> */}
              New Game
            </NewGame>
            <ScoreContainer>
              <div>
                <strong style={{ color: "white" }}> SCORE : </strong> <br />{" "}
                <div style={{ color: "white" }}> {this.state.score} </div>
              </div>
            </ScoreContainer>
          </Header>
          <Board
            ref={this.myRef}
            onKeyDown={(e) => this.handleKeyDown(e)}
            tabIndex="0"
          >
            {this.state.tiles.map((row, i) =>
              row.map((element, j) => (
                <div
                  key={i + "-" + j}
                  className={`board ` + (element !== null ? `exists ` : ``)}
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
            {" "}
            <p style={{ color: "#7f5539" }}>
              {" "}
              Tap on any block to continue playing <br />
              Please use arrows to move the tile
            </p>{" "}
          </strong>
        </Footer>
      </div>
    );
  }
}
export default App;
