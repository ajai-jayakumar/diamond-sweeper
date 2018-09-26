import React, { Component, Fragment } from 'react';
import Grid from './Grid';
import './App.css';

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
  }

  _decrementCounter() {
    if (this.state.score === 0) {
      this.setState({ gameOver: true });
    }
    this.setState({
      score: this.state.score - 1,
    });
  }

  _renderRowElements(row) {
    let rowElements = [];
    for (let i = 0; i < SIZE; i++) {
      rowElements.push(
        <td key={i + '' + row}>
          <Grid
            row={row}
            col={i}
            diamondPositions={this.diamondPositions}
            removeDiamondFromArray={() => this._removeDiamondFromArray(row, i)}
            decrementCounter={() => this._decrementCounter(row, i)}
          />
        </td>,
      );
    }
    return rowElements;
  }

  _renderRows() {
    let row = [];
    for (let i = 0; i < SIZE; i++) {
      row.push(<tr key={i}>{this._renderRowElements(i)}</tr>);
    }
    return row;
  }

  _renderTable() {
    return (
      <div>
        <table className="table-board">
          <tbody>{this._renderRows()}</tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <h1>Diamond Sweeper</h1>
        <section className="game-content">
          <div className="game-grid">{this._renderTable()}</div>
          <div className="game-scoreboard">
            <div>Your Score: {this.state.score}</div>
            <div>Diamonds Left: {this.state.diamondsLeft}</div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default App;
