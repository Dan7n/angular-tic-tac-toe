import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  squares: string[] = []
  xIsNext: boolean;
  winner: string;

  constructor() { }



  //initial setup work here
  ngOnInit(): void {
    //start a new game
    this.newGame();
    console.log(this.squares)
  }

  newGame(): void {
    this.squares = Array(9).fill(null) //populate the squares array
    this.winner = null; 
    this.xIsNext = true
  }

  get nextPlayer(): string {
    return this.xIsNext ? "X" : "O"
  }

  makeMove(index: number) {
    //if the square hasn't been clicked before
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.nextPlayer)
      this.xIsNext = !this.xIsNext //change the state
      this.winner = this.calculateWinner() 
    }
  }

  //from the react documentation
  calculateWinner() {
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
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
