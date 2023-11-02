class Juego {
    constructor(jugadores, tablero, fichas, connect) {
        this.connect = connect;
        this.tablero = tablero;
        this.fichas = fichas;
        this.jugadores = jugadores.slice(0, 2);//solo puedo tener 2 players
        this.currentTurn = 0; // Comienza con el primer jugador
    }

    winGame(){
        let cellsConnect = this.board.cellsConnect(this.connect);
        if(cellsConnect.length > 0){
            this.showWinnerFichas(cellsConnect);
        }
    }

    showWinnerDisks(fichas) {
        for (let i = 0; i < fichas.length; i++) {
            const ficha = fichas[i];
            ficha.isWinner();
        }
    }

    switchTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.jugadores.length;
    }



    getCurrentPlayer() {
        return this.jugadores[this.currentTurn];
    }
}