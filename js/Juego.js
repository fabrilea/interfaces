class Juego {
    constructor(jugadores, tablero, fichas, connect) {
        this.connect = connect;
        this.tablero = tablero;
        this.fichas = fichas;
        this.jugadores = jugadores.slice(0, 2);//solo puedo tener 2 players
        this.currentTurn = 0; // Comienza con el primer jugador
        this.gameOver = false;
        this.lastPlayed = 1;
    }

    winGame(){
        let cellsConnect = this.tablero.cellsConnect(this.connect);
        if(cellsConnect.length > 0){
            let n = this.jugadores[this.lastPlayedTurn()].getNombre()
            setTimeout(function() { alert(n); window.location.reload(); }, 2000);
        }
    }

    switchTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.jugadores.length;
    }

    lastPlayedTurn(){
        return this.lastPlayed = (this.currentTurn + 1) % this.jugadores.length;
    }


    getCurrentPlayer() {
        return this.jugadores[this.currentTurn];
    }


   //metodos para chekear ganador
   cellsConnect(connect){
    //se fija todos los metodos para chekear y  si hay un connect devuelve las celdas ganadoras
    let connectedCells = this.connectHorizontal(connect);
    //if(connectedCells.length === 0){
    //    connectedCells = this.connectVertical(connect);
    //}
    //if(connectedCells.length === 0) {
    //    connectedCells = this.connectDiagonal(connect);
    //}
    return connectedCells;
}

connectHorizontal(connect) {
    const connectedCells = [];
    for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col <= this.cols - connect; col++) {
            if (this.matrix[row][col] !== null) {
                let firstCircle = this.matrix[row][col];
                const inLineCells = [firstCircle];
                for (let i = 1; i < connect; i++) {
                    if(this.matrix[row][col + i] !== null) {
                        if (firstCircle.compareTo(this.matrix[row][col + i])) {
                            inLineCells.push(this.matrix[row][col + i]);
                        } else {
                            break;
                        }
                    }
                }
                if (inLineCells.length === connect) {
                    connectedCells.push(...inLineCells);
                }
            }
        }
    }
    return connectedCells;
}
   
// //        // vertical
// //        for (let c = 0; c < columns; c++) {
// //            for (let r = 0; r < rows - 3; r++) {
// //                if (board[r][c] != ' ') {
// //                    if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
// //                        setWinner(r, c);
// //                        return;
// //                    }
// //                }
// //            }
// //        }
   
// //        // anti diagonal
// //        for (let r = 0; r < rows - 3; r++) {
// //            for (let c = 0; c < columns - 3; c++) {
// //                if (board[r][c] != ' ') {
// //                    if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
// //                        setWinner(r, c);
// //                        return;
// //                    }
// //                }
// //            }
// //        }
   
// //        // diagonal
// //        for (let r = 3; r < rows; r++) {
// //            for (let c = 0; c < columns - 3; c++) {
// //                if (board[r][c] != ' ') {
// //                    if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
// //                        setWinner(r, c);
// //                        return;
// //                    }
// //                }
// //            }
// //        }
   

// }

//     setWinner(r, c) {
//         let winner = document.getElementById("winner");
//         if (tablero.matrix[r][c] == jugadores[0]) {
//             winner.innerText = "Red Wins";
//         } else {
//             winner.innerText = "Yellow Wins";
//         }
//         this.gameOver = true;
//     }
}