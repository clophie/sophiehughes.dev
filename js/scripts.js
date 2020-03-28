"use strict";

const aboutButton = document.querySelector("#aboutButton");
const projectsButton = document.querySelector("#projectsButton");
const experienceButton = document.querySelector("#experienceButton");
const photoButton = document.querySelector("#photoButton");
const name = document.querySelector("#name");
const aboutContent = document.querySelector("#aboutContent");
const projectsContent = document.querySelector("#projectsContent");
const experienceContent = document.querySelector("#experienceContent");
const photoContent = document.querySelector("#photoContent");
const navBar = document.querySelector("#navBar");
let animeTable = document.querySelector("#animeTable");

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
  navigationClicked(aboutContent)
});

// make the projects button show/hide the appropriate content
projectsButton.addEventListener(clickEvent, () => {
  navigationClicked(projectsContent)
});

// make the experience button show/hide the appropriate content
experienceButton.addEventListener(clickEvent, () => {
  navigationClicked(experienceContent)
});

// make the photography button show/hide the appropriate content
photoButton.addEventListener(clickEvent, () => {
  navigationClicked(photoContent)
});

// request the Jikan API in order to get a list of currently watching anime
fetch('https://api.jikan.moe/v3/user/clophie/animelist/watching')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    populateTable(data);
  });

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
  let tableHead = animeTable.createTHead();
  let headerRow = tableHead.insertRow();
  addCell(headerRow, '', 0);
  addCell(headerRow, 'Title', 0);
  addCell(headerRow, 'Episodes Watched', 0);

  // insert data
  data.anime.forEach((item) => {
    let row = animeTable.insertRow();
    addCell(row, item.image_url, 1);
    addCell(row, item.title, 0);
    addCell(row, item.watched_episodes + '/' + item.total_episodes, 0);
  });
};

const navigationClicked = (contentToShow) => {
  if (contentToShow.style.display === "none" || contentToShow.style.display === "") {
    name.style.display = "none";
    let contentElements = document.getElementsByClassName("content");

    for (let i = 0; i < contentElements.length; i++) {
      if (contentElements[i] !== contentToShow) {
        contentElements[i].style.display = "none";
      }
    }

    contentToShow.style.display = "inline-block";
  } else {
    contentToShow.style.display = "none";
    name.style.display = "inline-block";
  }
};
