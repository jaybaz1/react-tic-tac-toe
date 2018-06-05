import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Functional component
// Function accepts a props which encapulates all the properties defined on the react element

// Props get passed in to a component
function Square(props) {
  // Since this isn't a react component and isn't init with a constructor 'this' keyword is undefined

  // Returns a view, uses props defined in the parent object
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// React component is an abstract class

class Board extends React.Component {
  // Has a constructor that needs to be initialised with super.
  constructor() {
    // Super must be initialised to allows access to parents objects
    super();

    // “state” is an object that represents the parts of the app that can change.
    // Each component can maintain its own state, which lives in an object called this.state.
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  // This is pushed to the square functional component through props
  handleClick(i) {
    // Takes a copy of the squares so not to mutate the original array
    const squares = this.state.squares.slice();

    // If a winner is true return immediately
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    // Updates the components state
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  // Fn that returns the Square React element with define props
  //
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  // Component rerenders everytime state or props gets updated.
  render() {
    // Check if there is a winner
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
