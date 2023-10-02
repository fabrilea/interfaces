"use strict"

let cambiarMenuUser = document.querySelector(".perfil");
let userMenuElement = document.querySelector(".menu-u-oculto");

cambiarMenuUser.addEventListener("click", () => {
    userMenuElement.classList.toggle("menu-usuario");
});