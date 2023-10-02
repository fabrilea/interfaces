"use strict"

let cambiarMenuElement = document.querySelector(".btn-ham");
let hamMenuElement = document.querySelector(".menu-h-oculto");

cambiarMenuElement.addEventListener("click", () => {
    hamMenuElement.classList.toggle("menu-hamburguesa");
});
