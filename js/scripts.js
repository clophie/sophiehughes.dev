"use strict";

const aboutButton = document.querySelector("#aboutButton");
const projectsButton = document.querySelector("#projectsButton");
const experienceButton = document.querySelector("#experienceButton");
const photoButton = document.querySelector("#photoButton");
const name = document.querySelector("#name");
const aboutText = document.querySelector("#aboutText");
const navBar = document.querySelector("#navBar");
let animeJson = '';

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

// Request the Jikan API in order to get a list of currently watching anime
fetch('https://api.jikan.moe/v3/user/clophie/animelist/watching')
  .then(response => response.json())
  .then(data => {
    animeJson = data;
    console.log(data);
  })