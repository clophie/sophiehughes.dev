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

// make the about button show/hide the appropriate content
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

// request the Jikan API in order to get a list of currently watching anime
fetch('https://api.jikan.moe/v3/user/clophie/animelist/watching')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    populateTable(data);});

const populateTable = (data) => {

  // helper function
  const addCell = (tr, text, img) => {
    let td = tr.insertCell();

    if (img === 0) {
      td.textContent = text;
    } else if (img === 1) {
      let img = document.createElement('img');
      img.src = text;
      img.className = "animeImage";
      td.appendChild(img);
    }

    return td;
  };

  // create header
  let tableHead = table.createTHead();
  let headerRow = tableHead.insertRow();
  addCell(headerRow, '', 0);
  addCell(headerRow, 'Title', 0);
  addCell(headerRow, 'Episodes Watched', 0);

  // insert data
  data.anime.forEach((item) => {
    let row = table.insertRow();
    addCell(row, item.image_url, 1);
    addCell(row, item.title, 0);
    addCell(row, item.watched_episodes + '/' + item.total_episodes, 0);
  });
};
