class Jugador{
    
    constructor(nombre, arr) {
        this.nombre = nombre
        this.ganador = false;
        this.fichas = arr || [];
    }

    //Obtiene un arreglo de fichas que muestra por consola
    getFichas(){
        console.log(this.fichas)
    }

    //Verifica la ficha que se está moviendo
    fichasContains(ficha){
        for(const elem of this.fichas){
            if(elem.compareTo(ficha)){
                return true;
            }
        }
        return false;
    }

    //Lanza la ficha y cambia el turno
    dropFicha(col, ficha, board,game){
        let cord = board.fillCol(col,ficha);
        ficha.moveTo(cord);
        game.switchTurn();
    }

    //Mueve la ficha gradualmente
    moveDisc(cord, ficha) {
        console.log(this.fichas)
        if (this.fichasContains(ficha)) {

            const targetX = cord.x;
            const targetY = cord.y;

            // Calcula las diferencias en las coordenadas X e Y
            const dx = (targetX - ficha.getPosX()) / 60;
            const dy = (targetY - ficha.getPosY()) / 60;

            const animate = () => {
                update();
                ficha.ctx.beginPath()
                // Verifica si el círculo ha llegado a la posición objetivo
                if (Math.abs(ficha.getPosX() - targetX) < Math.abs(dx) || Math.abs(ficha.getPosY() - targetY) < Math.abs(dy)) {
                    ficha.setPositionAnimacion(targetX, targetY);
                    ficha.draw();
                    return;
                }

                // Mueve el círculo gradualmente
                ficha.setPositionAnimacion(ficha.getPosX() + dx, ficha.getPosY() + dy);
                ficha.draw();

                requestAnimationFrame(animate);
                ficha.ctx.closePath();
            };
            animate();
            ficha.movido = true;
        }


    }

    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }
}