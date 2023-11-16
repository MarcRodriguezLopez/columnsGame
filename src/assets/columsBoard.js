const BOARD_WIDTH = 10
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
    this.nextPiece = [randomColor(), randomColor(), randomColor()]
    this.generatePiece()
  }

  generatePiece() {
    this.piece = {
      content: this.nextPiece,
      x: BOARD_WIDTH / 2,
      y: 2
    }
    this.nextPiece = [randomColor(), randomColor(), randomColor()]
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
    if (this.piece.y === BOARD_HEIGHT || this.board[this.piece.y][this.piece.x] !== 0) {
      //revisar si se han completado lineas y en dicho caso quitarlas
      this.checkCompletedLines(this.board)
      this.generatePiece()
    }
  }

  makeMove(move) {
    if (move === 'ArrowUp') {
      this.piece.content = [this.piece.content[1], this.piece.content[2], this.piece.content[0]]
    }
    if (move === 'ArrowDown') {
      this.update()
    }
    if (
      move === 'ArrowLeft' &&
      this.piece.x - 1 > -1 &&
      this.board[this.piece.y][this.piece.x - 1] == 0
    ) {
      this.board[this.piece.y - 2][this.piece.x] = 0
      this.board[this.piece.y - 1][this.piece.x] = 0
      this.board[this.piece.y][this.piece.x] = 0
      this.piece.x--
    }
    if (
      move === 'ArrowRight' &&
      this.piece.x + 1 < BOARD_WIDTH &&
      this.board[this.piece.y][this.piece.x + 1] == 0
    ) {
      this.board[this.piece.y - 2][this.piece.x] = 0
      this.board[this.piece.y - 1][this.piece.x] = 0
      this.board[this.piece.y][this.piece.x] = 0
      this.piece.x++
    }
    this.draw()
  }

  checkCompletedLines(board) {
    let cellsToDelete = []
    function matchLines(row, col, dx, dy) {
      let cellsToDeleteLine = [[row, col]]
      const currentCell = board[row][col]

      if (currentCell === 0) return false

      for (let i = 1; i < 5; i++) {
        const newRow = row + i * dx
        const newCol = col + i * dy

        if (
          newRow < 0 ||
          newRow > BOARD_HEIGHT - 1 ||
          newCol < 0 ||
          newCol > BOARD_WIDTH - 1 ||
          board[newRow][newCol] !== currentCell
        ) {
          break
        }

        cellsToDeleteLine.push([newRow, newCol])
      }

      if (cellsToDeleteLine.length > 2) {
        for (let cells of cellsToDeleteLine) {
          cellsToDelete.push([cells[0], cells[1]])
        }
      }
    }

    for (let row = 0; row < BOARD_HEIGHT; row++) {
      for (let col = 0; col < BOARD_WIDTH; col++) {
        matchLines(row, col, 1, 0)
        matchLines(row, col, 0, 1)
        matchLines(row, col, 1, 1)
        matchLines(row, col, -1, 1)
      }
    }

    for (let cells of cellsToDelete) {
      board[cells[0]][cells[1]] = 0
    }

    for (let row = 0; row < BOARD_HEIGHT; row++) {
      for (let col = 0; col < BOARD_WIDTH; col++) {
        if (board[row][col] == 0) {
          for (let i = row; i > 0; i--) {
            board[i][col] = board[i - 1][col]
          }
          board[0][col] = 0
        }
      }
    }

    // Aqui revisamos que el tablero anterior y el nuevo sean iguales.
    // En caso de que sean distintos revisamos de nuevo todo el tablero para revisar si se han formado trios nuevos y, en dicho caso, eliminarlos
    const oldBoard = this.board
    console.log(this.board === board)
    console.log(oldBoard == board)
    this.board = board
    if (oldBoard !== board) {
      this.checkCompletedLines(this.board)
    }
  }
}
