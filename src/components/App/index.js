import React, { Component, Fragment } from 'react';
import Grid from '../Grid';

const SIZE = 8;

class App extends Component {
  constructor() {
    super();
    this.state = {
      diamondsLeft: SIZE,
      foundAllDiamond: false,
      gameOver: false,
      score: SIZE * SIZE,
    };
    this._removeDiamondFromArray = this._removeDiamondFromArray.bind(this);
    this._decrementCounter = this._decrementCounter.bind(this);
    this.diamondPositions = [];
  }

  componentDidMount() {
    while (this.diamondPositions.length < SIZE) {
      let row = Math.floor(Math.random() * SIZE);
      let col = Math.floor(Math.random() * SIZE);
      if (
        this.diamondPositions.findIndex(
          pos => pos.row === row && pos.col === col,
        ) === -1
      ) {
        this.diamondPositions.push({ row, col });
      }
    }
  }

  _removeDiamondFromArray(row, col) {
    this.diamondPositions.splice(
      this.diamondPositions.findIndex(
        diamond => diamond.row === row && diamond.col === col,
      ),
      1,
    );
    this.setState({
      diamondsLeft: this.diamondPositions.length,
    });
    if (this.diamondPositions.length === 0) {
      this.setState({ foundAllDiamond: true });
    }
  }

  _decrementCounter() {
    this.setState({
      score: this.state.score - 1,
    });
    if (this.state.score === 0) {
      this.setState({ gameOver: true });
    }
  }

  _renderRowElements(row) {
    let rowElements = [];
    for (let i = 0; i < SIZE; i++) {
      rowElements.push(
        <div className="game-grid">
          <Grid
            key={i + '' + row}
            row={row}
            col={i}
            diamondPositions={this.diamondPositions}
            removeDiamondFromArray={() => this._removeDiamondFromArray(row, i)}
            decrementCounter={() => this._decrementCounter(row, i)}
          />
        </div>,
      );
    }
    return rowElements;
  }

  _renderRows() {
    let row = [];
    for (let i = 0; i < SIZE; i++) {
      row.push(
        <div key={i} className="game-rows">
          {this._renderRowElements(i)}
        </div>,
      );
    }
    return row;
  }

  _renderTable() {
    return (
      <Fragment>
        <div className="game-scoreboard">
          <div>Your Score: {this.state.score}</div>
          <div>Diamonds Left: {this.state.diamondsLeft}</div>
        </div>
        {this._renderRows()}
      </Fragment>
    );
  }

  _renderGameOver() {
    return (
      <div className="game-over-content">
        <span className="game-over-text">
          {this.state.gameOver
            ? `Game Over`
            : `Congratulations! You have found all the diamonds.`}
        </span>
        <p className="game-score-text">Your score: {this.state.score}</p>
        <p>Reload the page to Play again</p>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <h1 className="game-title">Diamond Sweeper</h1>
        <section className="game-content">
          {this.state.gameOver || this.state.foundAllDiamond
            ? this._renderGameOver()
            : this._renderTable()}
        </section>
      </Fragment>
    );
  }
}

export default App;
