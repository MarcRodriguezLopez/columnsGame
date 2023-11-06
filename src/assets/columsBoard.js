const BOARD_WIDTH = 14
const BOARD_HEIGHT = 20

function randomColor() {
  return Math.floor(Math.random() * 6) + 1
}

export default class Columns {
  constructor() {
    this.board = Array(BOARD_HEIGHT)
      .fill('')
      .map(() => {
        return Array(BOARD_WIDTH).fill(0)
      })
  }

  generatePiece() {
    this.piece = {
      content: [randomColor(), randomColor(), randomColor()],
      x: BOARD_WIDTH / 2,
      y: 2
    }
  }

  draw() {
    this.board[this.piece.y - 2][this.piece.x] = this.piece.content[0]
    this.board[this.piece.y - 1][this.piece.x] = this.piece.content[1]
    this.board[this.piece.y][this.piece.x] = this.piece.content[2]
    if (this.piece.y - 3 >= 0) {
      this.board[this.piece.y - 3][this.piece.x] = 0
    }
  }

  update() {
    this.piece.y++
    this.checkMovement()
    this.draw()
  }

  checkMovement() {
    if (this.piece.y === BOARD_HEIGHT || this.board[this.piece.y][this.piece.x]  !== 0) {
      this.generatePiece()
    }
  }

  makeMove(move) {
    if (move === 'ArrowUp') {
      this.piece.content = [this.piece.content[1], this.piece.content[2], this.piece.content[0]]
    }
    if (move === 'ArrowDown' && this.piece.y+1 < BOARD_HEIGHT && this.board[this.piece.y+1][this.piece.x] === 0) {
      this.piece.y++
    }
    if (move === 'ArrowLeft' && this.piece.x-1 > -1) {
      this.board[this.piece.y - 2][this.piece.x] = 0
      this.board[this.piece.y - 1][this.piece.x] = 0
      this.board[this.piece.y][this.piece.x] = 0
      this.piece.x--
    }
    if (move === 'ArrowRight' && this.piece.x+1 < BOARD_WIDTH) {
      this.board[this.piece.y - 2][this.piece.x] = 0
      this.board[this.piece.y - 1][this.piece.x] = 0
      this.board[this.piece.y][this.piece.x] = 0
      this.piece.x++
    }
    this.draw()
  }
}