"use strict";

const aboutButton = document.querySelector("#aboutButton");
const projectsButton = document.querySelector("#projectsButton");
const experienceButton = document.querySelector("#experienceButton");
const photoButton = document.querySelector("#photoButton");
const name = document.querySelector("#name");
const aboutText = document.querySelector("#aboutText");
const navBar = document.querySelector("#navBar");

function burgerToggle() {
  if (navBar.className === "navBar") {
    navBar.className += " responsive";
  } else {
    navBar.className = "navBar";
  }
}

var clickEvent = (() => {
  if ('ontouchstart' in document.documentElement)
    return 'touchstart';
  else
    return 'click';
})();

aboutButton.addEventListener(clickEvent, () => {
  if (name.style.display === "none") {
    name.style.display = "inline-block";
    aboutText.style.display = "none";
  } else {
    name.style.display = "none";
    aboutText.style.display = "inline-block";
  }
});