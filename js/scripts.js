"use strict";

const aboutButton = document.querySelector("#aboutButton");
const projectsButton = document.querySelector("#projectsButton");
const experienceButton = document.querySelector("#experienceButton");
const photoButton = document.querySelector("#photoButton");
const name = document.querySelector("#name");
const aboutText = document.querySelector("#aboutText");
const navBar = document.querySelector("#navBar");
let table = document.querySelector("#animeTable");
let animeJson = '';

function burgerToggle() {
  if (navBar.className === "navBar") {
    navBar.className += " responsive";
  } else {
    navBar.className = "navBar";
  }
}

let clickEvent = (() => {
  if ('ontouchstart' in document.documentElement)
    return 'touchstart';
  else
    return 'click';
})();

aboutButton.addEventListener(clickEvent, () => {
  if (name.style.display === "none") {
    name.style.display = "inline-block";
    aboutText.style.display = "none";
    table.style.display = "none;"
  } else {
    name.style.display = "none";
    aboutText.style.display = "inline-block";
    table.style.display = "inline-block";
  }
});

// Request the Jikan API in order to get a list of currently watching anime
fetch('https://api.jikan.moe/v3/user/clophie/animelist/watching')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    populateTable(data);});

const populateTable = (data) => {

  // helper function
  function addCell(tr, text) {
    let td = tr.insertCell();
    td.textContent = text;
    return td;
  }

  // create header
  let tableHead = table.createTHead();
  let headerRow = tableHead.insertRow();
  addCell(headerRow, '');
  addCell(headerRow, 'Title');
  addCell(headerRow, 'Episodes Watched');

  // insert data
  data.anime.forEach((item) => {
    let row = table.insertRow();
    addCell(row, item.image_url);
    addCell(row, item.title);
    addCell(row, item.watched_episodes + '/' + item.total_episodes);
  });
};
