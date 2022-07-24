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
    // this.myRef.current.focus();
    this.newGame(4);
    // window.addEventListener("beforeunload", this.onUnload);
  }

  newGame = (sizeArg) => {
    // let size = sizeArg ? sizeArg : this.state.size;
    let size = sizeArg;
    console.log(`size of array: ${size}`);

    // Insert grid boxes
    let m = [];
    let t = Array(size).fill(null);
    for (let i = 0; i < size; i++) {
      m.push(t.slice());
    }

    this.insertNew(m);
    this.insertNew(m);

    this.setState({
      tiles: m,
      // prev: m,
      score: 0,
      // prevScore: 0,
      // game: {
      //   ...this.state.game,
      // },
    });
    // this.myRef.current.focus();
  };

  random = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  containsNull = (array) => {
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

  insertNew = (m, init = false) => {
    const maxValue = m.length - 1;
    console.log(`maxValue: ${maxValue}`);
    let flag = init
      ? true
      : JSON.stringify(m) !== JSON.stringify(this.state.matrix);
    if (flag) {
      if (this.containsNull(m)) {
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
          <Board>
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
              Please use arrows to move the tile
            </p>{" "}
          </strong>
        </Footer>
      </div>
    );
  }
}
export default App;
