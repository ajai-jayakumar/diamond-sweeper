import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  _renderRowElements(row) {
    let rowElements = [];
    for (let i = 0; i < 8; i++) {
      rowElements.push(<td key={i + '' + row}>yay</td>);
    }
    return rowElements;
  }

  _renderRows() {
    let row = [];
    for (let i = 0; i < 8; i++) {
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
        <section>{this._renderTable()}</section>
      </Fragment>
    );
  }
}

export default App;
