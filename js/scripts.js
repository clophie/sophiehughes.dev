"use strict";

const aboutButton = document.querySelector("#aboutButton");
const projectsButton = document.querySelector("#projectsButton");
const experienceButton = document.querySelector("#experienceButton");
const photoButton = document.querySelector("#photoButton");
const name = document.querySelector("#name");
const portrait = document.querySelector("#mePicture");
const aboutContent = document.querySelector("#aboutContent");
const projectsContent = document.querySelector("#projectsContent");
const experienceContent = document.querySelector("#experienceContent");
const photoContent = document.querySelector("#photoContent");
let animeTable = document.querySelector("#animeTable");
const images = document.getElementsByClassName("galleryImage");

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


// Function to handle showing and hiding of elements based on what nav button was clicked
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

// Functions to handle changing the portrait image on the hover of a gallery image

const galleryImageMouseEnter = (image) => {
  portrait.src = image
};

const galleryImageMouseLeave = () => {
  portrait.src = "media/me.jpg"
};

Array.from(images).forEach(x => x.addEventListener("mouseenter", () => galleryImageMouseEnter(x.src), false));
Array.from(images).forEach(x => x.addEventListener("mouseleave", () => galleryImageMouseLeave(), false));

Array.from(images).forEach(x => x.addEventListener("ontouchstart", () => galleryImageMouseEnter(x.src), false));
Array.from(images).forEach(x => x.addEventListener("ontouchend", () => galleryImageMouseLeave(), false));