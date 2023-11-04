class Ficha {

    //Llamo a todos los elementos para crear el objeto Ficha
    constructor(posX, posY, fill, radius, context, image) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        
        this.fill = fill;


        this.ctx = context;
        this.image = image;
        this.movido = false;

        this.posOriginalX = posX;
        this.posOriginalY =  posY;
    }

    draw() {
        // Dibuja la imagen en el centro de la ficha
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath()
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill()
        this.ctx.closePath();
        if(this.image){
            const imageX = this.posX - this.radius * 1.2; 
            // Calcula la posición X de la imagen
            const imageY = this.posY - this.radius * 1.2; 
            // Calcula la posición Y de la imagen
            this.ctx.drawImage(this.image, imageX, imageY, 50, 70); 
            //Lo dibuja
            }
    }

    posOriginal(){
        //Busca la posición original para mandar coordenadas
        const cord = { x: this.posOriginalX, y: this.posOriginalY };
        this.returnTo(cord);

    }

    compareTo(c2){
        return this.getFill() === c2.getFill();
    }

    returnTo(cord){
        //Si el objeto es movido a un direcció no posible se devuelve gradualmente
        if(!this.movido){
            const targetX = cord.x;
            const targetY = cord.y;
    
            // Calcula las diferencias en las coordenadas X e Y
            const dx = (targetX - this.posX) / 60;
            const dy = (targetY - this.posY) / 60;
    
            const animate = () => {
                update();
                this.ctx.beginPath()
                // Verifica si el círculo ha llegado a la posición objetivo
                if (Math.abs(this.posX - targetX) < Math.abs(dx) || Math.abs(this.posY - targetY) < Math.abs(dy)) {
                    this.setPositionAnimacion(targetX, targetY);
                    this.draw();
                    return;
                }
    
                // Mueve el círculo gradualmente
                this.setPositionAnimacion(this.posX + dx, this.posY + dy);
                this.draw();
    
                //Se va animando por frames
                requestAnimationFrame(animate);
                this.ctx.closePath();
            };
            animate();
            this.setResaltado(false);
        }
    }
    
    moveTo(cord) {
        const targetX = cord.x;
        const targetY = cord.y;

        // Calcula las diferencias en las coordenadas X e Y
        const dx = (targetX - this.posX) / 60;
        const dy = (targetY - this.posY) / 60;

        const animate = () => {
            update();
            this.ctx.beginPath()
            // Verifica si la ficha ha llegado a la posición objetivo
            if (Math.abs(this.posX - targetX) < Math.abs(dx) || Math.abs(this.posY - targetY) < Math.abs(dy)) {
                this.setPositionAnimacion(targetX, targetY);
                this.draw();
                return;
            }

            // Mueve la ficha gradualmente
            this.setPositionAnimacion(this.posX + dx, this.posY + dy);
            this.draw();

            requestAnimationFrame(animate);
            this.ctx.closePath();
        };
        animate();
        this.movido = true;
    }


    //Getters y Setters
    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }


    getRadius() {
        return this.radius;
    }

    //Chequea si el cursor está encima del objeto
    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    setFill(fill) {
        this.fill = fill;
    }

    setPositionAnimacion(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setPosition(x, y) {
        if (!this.movido) {
            this.posX = x;
            this.posY = y;
        }
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }

    getFill() {
        return this.fill;
    }
}