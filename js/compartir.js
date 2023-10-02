"use strict"

let compartir = document.querySelector(".compartir");
let cancelar = document.querySelector(".btn-cancelar");
let hecho = document.querySelector(".btn-hecho");
let compartir_box = document.querySelector(".oculto-box");

compartir.addEventListener("click", () => {
    compartir_box.classList.add("compartir-box");
});

cancelar.addEventListener("click", () => {
    compartir_box.classList.remove("compartir-box");
});

hecho.addEventListener("click", () => {
    compartir_box.classList.remove("compartir-box");
});