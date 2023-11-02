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



    draw(ctx, column) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = this.startX + col * this.cellSize;
                const y = this.startY + row * this.cellSize;

                if (col % 2 === 0) {
                    if (row % 2 === 0) {
                        ctx.fillStyle = '#008A01';
                        ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    } else {
                        ctx.fillStyle = '#00A019';
                        ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    }
                    
                }else{
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


        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

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


    coordCell(row, col) {
        const x = this.startX + col * this.cellSize + this.cellSize / 2;
        const y = this.startY + row * this.cellSize + this.cellSize / 2;
        return { x, y };
    }

    fillCol(col, circle) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.matrix[row][col]) {
                this.matrix[row][col] = circle;
                return this.coordCell(row, col);
            }
        }
    }

    isDropeable(circulo, col) {
        const circuloX = circulo.getPosX();
        const circuloY = circulo.getPosY();
        const cellX = this.startX + col * this.cellSize + this.cellSize / 2;
        const cellY = this.startY + 0 * this.cellSize + this.cellSize / 2;

        const distance = Math.sqrt((circuloX - cellX) ** 2 + (circuloY - cellY) ** 2);
        
        return distance < circulo.getRadius();
    }


    cellsConnect(connect) {
        let connectedCells = this.connectHorizontal(connect);
        // if(connectedCells.length === 0){
        //    connectedCells = this.connectVertical(connect);
        // }
        // if(connectedCells.length === 0) {
        //    connectedCells = this.connectDiagonal(connect);
        // }
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
                        if (this.matrix[row][col + i] !== null) {
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

    getSize() {
        const filas = this.matrix.length;
        const columnas = this.matrix[0].length;
        return filas * columnas;
    }

    getWidth() {
        return this.cols * this.cellSize;
    }

    getHeight() {
        return this.rows * this.cellSize;
    }

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


