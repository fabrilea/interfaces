let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let turn = document.getElementById('turn');
const tipoJuego = document.getElementById('opciones');
const play = document.getElementById('play');
const formulario = document.getElementById('selector');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let ficha = null;
let jugadores = [];
let figures = [];
let fichasA = [];
let fichasB = [];

//Creo mi juego, tablero ,jugadores y fichas tomando lo que me pase el usuario desde el DOM
let tablero = new Tablero(6, 7, 60, 190, 30);//tablero por default
let CANT_FIG = tablero.getSize();
tablero.draw(ctx);

let jugador1 = new Jugador("azul", fichasA);
let jugador2 = new Jugador("rojo", fichasB);
jugadores.push(jugador1, jugador2);

let juego = new Juego(jugadores, tablero, figures);

let lastClickedFigure = null;
let isMouseDown = false;

function crearJuego() {
    //Creo el juego inicializando cada método necesario (tablero, juego, fichas, etc...)
    if(juego.gameOver){
        return;
    }
    let cellSize = 60;
    let valor = tipoJuego.value;
    let rows = parseInt(valor) + 2;
    let cols = (parseInt(valor) * 2 )-1 ;
    let tableroWidth = cols * cellSize;
    let startX = (canvasWidth - tableroWidth) / 2;
    let startY = 20;
    tablero = new Tablero(rows, cols, cellSize, startX, startY);
    juego = new Juego(jugadores, tablero, figures,parseInt(valor));
    addFigures();
    tablero.draw(ctx);
    CANT_FIG = tablero.getSize();
}


//Se manda al nuevo tablero lo que el usuario pase por parametro 
formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    // name1 = document.getElementById('jugador1').value;
    // name2 = document.getElementById('jugador2').value;

    jugador1.setNombre("Atacantes");
    jugador2.setNombre("Defensores");

    crearJuego();

});

let currentColor = 'blue';
//Se añaden las figuras
function addFigure() {
    //Chequea el color adecuado para agregarlo en la figura
    if (currentColor === 'blue') {
        addCircle('blue');
        currentColor = 'red';
    } else {
        addCircle('red');
        currentColor = 'blue';
    }
    update();
}

function update(c) {
    // Limpia el canvas
    clearCanvas();
    tablero.draw(ctx,c);
    let jugador = juego.getCurrentPlayer();
    turn.textContent = 'Es el turno de: ' + jugador.getNombre();
    //Luego se encarga de dibujar el tablero y las fichas al mostrarlos en el canvas
    ctx.fillRect(200, 600, 200, 20);

    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addCircle(color) {
    //Añade la ficha a un arraylist y lo pushea a los arreglos de fichas a y b para dibujarlos en el canvas
    let circleRadius = 20;
    let posX, posY;
    if (color === 'blue') {
        posX = 100;
        posY = 200;
        let circle = new Ficha(posX, posY, circleRadius, color, ctx);
        fichasA.push(circle);
    } else if (color === 'red') {
        posX = 700;
        posY = 200;
        let circle = new Ficha(posX, posY, circleRadius, color, ctx);
        fichasB.push(circle);

    }

    let circle = new Ficha(posX, posY, circleRadius, color, ctx);
    figures.push(circle);
}

function onMouseDown(e) {
    //Chequea que el cursor izquierdo se esté presionando
    isMouseDown = true;

    if (lastClickedFigure != null) {
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }
    let jugador = juego.getCurrentPlayer();
    let clickFig = findClickedFigure(e.layerX, e.layerY);
    if (clickFig != null && jugador.fichasContains(clickFig)) {
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }
    update();
}

function onMouseUp(e) {
    //Chequea que el cursor izquierdo sea soltado
    isMouseDown = false;
    ficha = lastClickedFigure;
    if(ficha != null){
        var col = tablero.getCol(ficha);
    }

    if (ficha != null && col != null) {
        let jugador = juego.getCurrentPlayer();

        jugador.dropFicha(col, ficha, tablero, juego);
        juego.checkWinner()

        console.log(juego.gameOver)
        //console.log(tablero.matrix);
    } else if(ficha != null && col === null) {
        ficha.posOriginal();
    }

}

function onMouseMove(e) {
    //Mueve el objeto a la posición deseada
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        let col = tablero.getCol(lastClickedFigure);
        update(col);
    }
}

function clearCanvas() {
    //Borra el objeto anterior para dar paso al que se mueve, lo borra y dibuja continuamente
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function addFigures() {
    //Añade fichas mientras sea menor que la variable CANT_FIG
    addFigure();
    if (figures.length < CANT_FIG) {
        setTimeout(addFigures, 33);
    }
}



function findClickedFigure(x, y) {
    //Busca el objeto seleccionado
    for (let i = 0; i < figures.length; i++) {
        const element = figures[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
