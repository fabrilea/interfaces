class Juego {
    constructor(jugadores, tablero, fichas, connect) {
        this.connect = connect;
        this.tablero = tablero;
        this.fichas = fichas;
        this.jugadores = jugadores.slice(0, 2);//solo puedo tener 2 players
        this.currentTurn = 0; // Comienza con el primer jugador
        this.gameOver = false;
    }

    // winGame(){
    //     let cellsConnect = this.tablero.cellsConnect(this.connect);
    //     if(cellsConnect.length > 0){
    //         this.showWinnerFichas(cellsConnect);
    //     }
    // }

    destroyGame(){

    }

    showWinnerDisks(fichas) {
        for (let i = 0; i < fichas.length; i++) {
            const ficha = fichas[i];
            ficha.checkWinner();
        }
    }

    switchTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.jugadores.length;
        console.log()
    }



    getCurrentPlayer() {
        return this.jugadores[this.currentTurn];
    }

    // cellsConnect(connect) {
    //     let connectedCells = this.connectHorizontal(connect);
    //     // if(connectedCells.length === 0){
    //     //    connectedCells = this.connectVertical(connect);
    //     // }
    //     // if(connectedCells.length === 0) {
    //     //    connectedCells = this.connectDiagonal(connect);
    //     // }
    //     return connectedCells;
    // }

    // connectHorizontal(connect) {
    //     const connectedCells = [];
    //     for (let row = 0; row < this.rows; row++) {
    //         for (let col = 0; col <= this.cols - connect; col++) {
    //             if (this.matrix[row][col] !== null) {
    //                 let firstCircle = this.matrix[row][col];
    //                 const inLineCells = [firstCircle];
    //                 for (let i = 1; i < connect; i++) {
    //                     if (this.matrix[row][col + i] !== null) {
    //                         if (firstCircle.compareTo(this.matrix[row][col + i])) {
    //                             inLineCells.push(this.matrix[row][col + i]);
    //                         } else {
    //                             break;
    //                         }
    //                     }
    //                 }
    //                 if (inLineCells.length === connect) {
    //                     connectedCells.push(...inLineCells);
    //                 }
    //             }
    //         }
    //     }
    //     return connectedCells;
    // }
    checkWinner() {
        // horizontal
        for (let r = 0; r < tablero.getRows(); r++) {
            for (let c = 0; c < tablero.getCols() - 3; c++){
                console.log(this.tablero.matrix[r][c])
               if (tablero.matrix[r][c] != ' ') {
                   if (tablero.matrix[r][c] == tablero.matrix[r][c+1] 
                    && tablero.matrix[r][c+1] == tablero.matrix[r][c+2] 
                    && tablero.matrix[r][c+2] == tablero.matrix[r][c+3]) {
                    console.log("hola carla")
                        this.setWinner(r, c);
                       return;
                   }
                   console.log("hola jorge")
               }
            }
       }
   
//        // vertical
//        for (let c = 0; c < columns; c++) {
//            for (let r = 0; r < rows - 3; r++) {
//                if (board[r][c] != ' ') {
//                    if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
//                        setWinner(r, c);
//                        return;
//                    }
//                }
//            }
//        }
   
//        // anti diagonal
//        for (let r = 0; r < rows - 3; r++) {
//            for (let c = 0; c < columns - 3; c++) {
//                if (board[r][c] != ' ') {
//                    if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
//                        setWinner(r, c);
//                        return;
//                    }
//                }
//            }
//        }
   
//        // diagonal
//        for (let r = 3; r < rows; r++) {
//            for (let c = 0; c < columns - 3; c++) {
//                if (board[r][c] != ' ') {
//                    if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
//                        setWinner(r, c);
//                        return;
//                    }
//                }
//            }
//        }
   

}

    setWinner(r, c) {
        let winner = document.getElementById("winner");
        if (tablero.matrix[r][c] == jugadores[0]) {
            winner.innerText = "Red Wins";
        } else {
            winner.innerText = "Yellow Wins";
        }
        this.gameOver = true;
    }
}