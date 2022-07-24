import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRotate } from "@fortawesome/free-solid-svg-icons";
import {
  ParentContainer,
  // Header,
  Board,
  // AdditionalFeatures,
  // ScoreContainer,
  // Footer,
} from "./style";
import "./App.css";

class TwentyFourtyEight extends Component {
  // the game will be of 4x4
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      matrix: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      // prev: [],
      // score: 0,
      // prevScore: 0,
      // gridChange: false,
      // optedForRestart: false,
    };
  }

  componentDidMount() {
    // this.myRef.current.focus();
    this.startOver(4);
    // window.addEventListener("beforeunload", this.onUnload);
  }

  startOver = (sizeArg) => {
    // let size = sizeArg ? sizeArg : this.state.game.size;
    let size = sizeArg ? sizeArg : this.state.size;
    console.log(size);

    let m = [];
    let t = Array(size).fill(null);
    for (let i = 0; i < size; i++) {
      m.push(t.slice());
    }

    this.insertNew(m, true);
    this.insertNew(m, true);
    this.setState({
      matrix: m,
    });
  };

  random = (min, max) => {
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
    return (
      <>
        <ParentContainer>
          <Board>
            {this.state.matrix.map((row, i) =>
              row.map((element, j) => (
                <div
                  key={i + "-" + j}
                  className={`board ` + (element !== null ? `exists ` : ``)}
                >
                  <div
                    className={
                      `tiles _` +
                      (this.state.matrix[i][j] !== null
                        ? this.state.matrix[i][j]
                        : ``)
                    }
                  >
                    {this.state.matrix[i][j]}
                  </div>
                </div>
              ))
            )}
          </Board>
        </ParentContainer>
      </>
    );
  }
}
export default TwentyFourtyEight;
