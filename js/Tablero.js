class Tablero {
    constructor(rows, cols, cellSize, startX, startY) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.startX = startX;
        this.startY = startY;
        this.matrix = new Array(rows);

        for (let row = 0; row < rows; row++) {
            this.matrix[row] = new Array(cols).fill(null);
        }
    }


    //Dibuja el tablero
    draw(ctx, column) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = this.startX + col * this.cellSize;
                const y = this.startY + row * this.cellSize;

                //Va dibujando las columnas dependiendo las posiciones, y les asigna un color
                if (col % 2 === 0) {
                    if (row % 2 === 0) {
                        ctx.fillStyle = '#008A01';
                        ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    } else {
                        ctx.fillStyle = '#00A019';
                        ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    }
                    
                }else{
                    //Lo mismo para las filas
                    if (row % 2 === 0) {
                        ctx.fillStyle = '#00B019';
                        ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    } else {
                        ctx.fillStyle = '#00CE1E';
                        ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    }
                }
            }
        }

        //Les pone un lineado negro
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        //Empieza a dibujar el contenido, metiendolo en el canvas
        for (let row = 0; row <= this.rows; row++) {
            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY + row * this.cellSize);
            ctx.lineTo(this.startX + this.cols * this.cellSize, this.startY + row * this.cellSize);
            ctx.stroke();
        }

        for (let col = 0; col <= this.cols; col++) {
            if (column != null && (col === column || col === column + 1)) {
                ctx.strokeStyle = '#F8FFB5';
                ctx.lineWidth = 3;
            } else {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
            }
            ctx.beginPath();
            ctx.moveTo(this.startX + col * this.cellSize, this.startY);
            ctx.lineTo(this.startX + col * this.cellSize, this.startY + this.rows * this.cellSize);
            ctx.stroke();

        }

    }

    //Hace la conexión de fichas en el tablero, verificando cómo se va ganando
    cellsConnect(connect) {
        let connectedCells = this.connectHorizontal(connect);
        //Verifica si no hubo coincidencias de alineamientos para llamar al siguiente método de chequeo
        if(connectedCells.length === 0){
           connectedCells = this.connectVertical(connect);
        }
        if(connectedCells.length === 0) {
           connectedCells = this.connectDiagonal(connect);
        }
        if(connectedCells.length === 0) {
            connectedCells = this.connectAntiDiagonal(connect);
         }
        return connectedCells;
    }

    connectHorizontal(connect) {
        const connectedCells = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col <= this.cols - connect; col++) {
                //Verifica que la posición consultada no esté vacía
                if (this.matrix[row][col] !== null) {
                    //Recuerda la posición de la ficha de 4,5,6,7 en linea
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        //Compara la posición de esa ficha, que termina siendo la última lanzada, 
                        //y va recorriendo la matriz, buscando coincidencias
                        if (this.matrix[row][col + i] !== null) {
                            if (firstCircle.compareTo(this.matrix[row][col + i])) {
                                inLineCells.push(this.matrix[row][col + i]);
                            } else {
                                break;
                            }
                        }
                    }
                    //Si las coincidencias dentro del arreglo son igual 4, gana por ese método
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    //Se repiten la explicación para las siguientes, 
    //sólo cambia el recorrido de las matrices dependiendo del caso
    connectVertical(connect) {
        const connectedCells = [];
        for (let row = 0; row <= this.rows - connect; row++) {
            for (let col = 0; col < this.cols; col++) {
                //Verifica que la posición consultada no esté vacía
                if (this.matrix[row][col] !== null) {
                    //Recuerda la primer posición de la ficha de 4,5,6,7 en linea
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        //Compara la posición de esa ficha, que termina siendo la última lanzada, 
                        //y va recorriendo la matriz, buscando coincidencias
                        if (this.matrix[row + i][col] !== null) { 
                            if (firstCircle.compareTo(this.matrix[row + i][col])) {
                                inLineCells.push(this.matrix[row + i][col]);
                            } else {
                                break;
                            }
                        }
                    }
                    //Si las coincidencias dentro del arreglo son igual 4, gana por ese método
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    connectDiagonal(connect) {
        const connectedCells = [];
        for (let row = 0; row <= this.rows - connect; row++) {
            for (let col = 0; col <= this.cols - connect; col++) {
                //Verifica que la posición consultada no esté vacía
                if (this.matrix[row][col] !== null) {
                    //Recuerda la posición de la ficha de 4,5,6,7 en linea
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        //Compara la posición de esa ficha, que termina siendo la última lanzada, 
                        //y va recorriendo la matriz, buscando coincidencias
                        if (this.matrix[row + i][col - i] !== null) {
                            if (firstCircle.compareTo(this.matrix[row + i][col - i])) {
                                inLineCells.push(this.matrix[row + i][col - i]);
                            } else {
                                break;
                            }
                        }
                    }
                    //Si las coincidencias dentro del arreglo son igual 4, gana por ese método
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    connectAntiDiagonal(connect) {
        const connectedCells = [];
        for (let row = 0; row <= this.rows - connect; row++) {
            for (let col = 0; col <= this.cols - connect; col++) {
                //Verifica que la posición consultada no esté vacía
                if (this.matrix[row][col] !== null) {
                    //Recuerda la posición de la ficha de 4,5,6,7 en linea
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        //Compara la posición de esa ficha, que termina siendo la última lanzada, 
                        //y va recorriendo la matriz, buscando coincidencias
                        if (this.matrix[row + i][col + i] !== null) {
                            if (firstCircle.compareTo(this.matrix[row + i][col + i])) {
                                inLineCells.push(this.matrix[row + i][col + i]);
                            } else {
                                break;
                            }
                        }
                    }
                    //Si las coincidencias dentro del arreglo son igual 4, gana por ese método
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    //Obtiene las coordenadas de la celda
    coordCell(row, col) {
        const x = this.startX + col * this.cellSize + this.cellSize / 2;
        const y = this.startY + row * this.cellSize + this.cellSize / 2;
        return { x, y };
    }

    //Va llenando la columna con el objeto ficha
    fillCol(col, circle) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.matrix[row][col]) {
                this.matrix[row][col] = circle;
                return this.coordCell(row, col);
            }
        }
    }

    //Se fijate la distancia de lanzamiento de la ficha, y si es posible hacerlo
    isDropeable(circulo, col) {
        const circuloX = circulo.getPosX();
        const circuloY = circulo.getPosY();
        const cellX = this.startX + col * this.cellSize + this.cellSize / 2;
        const cellY = this.startY + 0 * this.cellSize + this.cellSize / 2;

        const distance = Math.sqrt((circuloX - cellX) ** 2 + (circuloY - cellY) ** 2);
        
        return distance < circulo.getRadius();
    }


    //Determina la columna donde la ficha puede ser tirada
    getCol(circulo) {
        let col = 0;
        let cond = false;
        while (col < this.cols && cond === false) {
            if (this.isDropeable(circulo, col)) {
                cond = true;
                break;
            }
            col++;
        }
        if (col != this.cols) {
            return col;
        } else {
            return null;
        }

    }

    //Obtiene el tamaño de la matriz
    getSize() {
        const filas = this.matrix.length;
        const columnas = this.matrix[0].length;
        return filas * columnas;
    }

    //Ancho de la matriz
    getWidth() {
        return this.cols * this.cellSize;
    }

    //Alto de la matriz
    getHeight() {
        return this.rows * this.cellSize;
    }


    //Getters y Setters
    getRows() {
        return this.rows;
    }

    setRows(value) {
        this.rows = value;
    }

    getCols() {
        return this.cols;
    }

    setCols(value) {
        this.cols = value;
    }
    getCellSize() {
        return this.cellSize;
    }
    setCellSize(value) {
        this.cellSize = value;
    }
    getStartX() {
        return this.startX;
    }
    setStartX(value) {
        this.startX = value;
    }
    getStartY() {
        return this.startY;
    }
    setStartY(value) {
        this.startY = value;
    }
}


