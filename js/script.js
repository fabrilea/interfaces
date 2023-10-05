"use strict"



const fila = document.querySelectorAll('.car-juegos');
const elementos = document.querySelectorAll('.elemento');

const flechaIzquierda = document.querySelectorAll('.flecha');
const flechaDerecha = document.querySelectorAll('.flecha-der');

let indicadores = document.querySelectorAll(".indicadores");

for(let i = 0; i < 4; i++){
    // ? ----- ----- Event Listener para la flecha derecha. ----- -----
    flechaDerecha[i].addEventListener('click', () => {
        console.log("hola")
        fila[i].scrollLeft += fila[i].offsetWidth;

        const indicadorActivo = indicadores[i].querySelector('.activo');
        if(indicadorActivo.nextSibling){
            indicadorActivo.nextSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
});

    // ? ----- ----- Event Listener para la flecha izquierda. ----- -----
    flechaIzquierda[i].addEventListener('click', () => {
        fila[i].scrollLeft -= fila[i].offsetWidth

        const indicadorActivo = indicadores[i].querySelector('.activo');
        if(indicadorActivo.previousSibling){
            indicadorActivo.previousSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    });
 


    // ? ----- ----- Paginacion ----- ----
    const numeroPaginas = Math.ceil(fila[i].querySelectorAll(".elemento").length / 5);
    for(let j = 0; j < numeroPaginas; j++){
        const indicador = document.createElement('button');

        if(j === 0){
            indicador.classList.add('activo');
        }
    
	indicadores[i].appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila[i].scrollLeft = j * fila[i].offsetWidth;

        const indicadorActivo = indicadores[i].querySelector('.activo');

		indicadorActivo.classList.remove('activo');
		e.target.classList.add('activo');
	});
}
}


let cambiarMenuUser = document.querySelector(".perfil");
let userMenuElement = document.querySelector("#menu-usu");
let cambiarMenuElement = document.querySelector(".btn-ham");
let hamMenuElement = document.querySelector("#menu-ham");
let compartir = document.querySelector(".compartir");
let cancelar = document.querySelector(".btn-cancelar");
let hecho = document.querySelector(".btn-hecho");
let compartir_box = document.querySelector("#comp-box");

cambiarMenuUser.addEventListener("click", () => {
    cambiarMenuUser.classList.toggle("perfil-grande");
    userMenuElement.classList.toggle("menu-usuario");
});

cambiarMenuElement.addEventListener("click", () => {
    hamMenuElement.classList.toggle("menu-usuario2");
});

compartir.addEventListener("click", () => {
    compartir_box.classList.add("compartir-box");
});

cancelar.addEventListener("click", () => {
    compartir_box.classList.remove("compartir-box");
});

hecho.addEventListener("click", () => {
    compartir_box.classList.remove("compartir-box");
});