"use strict"

let cambiarMenuUser = document.querySelector(".perfil");
let userMenuElement = document.querySelector("#menu-usu");

let cambiarMenuElement = document.querySelector(".btn-ham");
let hamMenuElement = document.querySelector("#menu-ham");
 
let compartir = document.querySelector(".compartir");
let cancelar = document.querySelector(".btn-cancelar");
let hecho = document.querySelector(".btn-hecho");
let compartir_box = document.querySelector("#comp-box");

cambiarMenuUser.addEventListener("click", () => {

    cambiarMenuUser.classList.toggle("grande");
    userMenuElement.classList.toggle("menu-usuario");
});

cambiarMenuElement.addEventListener("click", () => {
    cambiarMenuElement.classList.toggle("grande");
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



