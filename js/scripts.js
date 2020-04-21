"use strict";

const aboutButton = document.querySelector("#aboutButton");
const projectsButton = document.querySelector("#projectsButton");
const todoButton = document.querySelector("#todoButton");
const photoButton = document.querySelector("#photoButton");
const name = document.querySelector("#name");
const portrait = document.querySelector("#mePicture");
const aboutContent = document.querySelector("#aboutContent");
const projectsContent = document.querySelector("#projectsContent");
const banlistBotCell = document.querySelector("#banlistBot");
const previousSiteCell = document.querySelector("#previousSite");
const todoContent = document.querySelector("#todoContent");
const photoContent = document.querySelector("#photoContent");
const images = document.getElementsByClassName("galleryImage");
const todoForm = document.querySelector("#todoForm");
const todoResults = document.querySelector("#todoResults");
const animeTable = document.querySelector("#animeTable");

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
todoButton.addEventListener(clickEvent, () => {
  navigationClicked(todoContent)
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
const imageMouseEnter = (image) => {
  portrait.src = image
};

const imageMouseLeave = () => {
  portrait.src = "media/me.jpg"
};

Array.from(images).forEach(x => x.addEventListener("mouseenter", () => imageMouseEnter(x.src), false));
Array.from(images).forEach(x => x.addEventListener("mouseleave", () => imageMouseLeave(), false));

Array.from(images).forEach(x => x.addEventListener("ontouchstart", () => imageMouseEnter(x.src), false));
Array.from(images).forEach(x => x.addEventListener("ontouchend", () => imageMouseLeave(), false));

banlistBotCell.addEventListener("mouseenter", () => imageMouseEnter("media/banlistbot.jpg"), false);
banlistBotCell.addEventListener("mouseleave", () => imageMouseLeave(), false);

previousSiteCell.addEventListener("mouseenter", () => imageMouseEnter("media/previoussite.jpg"), false);
previousSiteCell.addEventListener("mouseleave", () => imageMouseLeave(), false);

// Function to save a to do list task
const saveTask = (event) => {
  event.preventDefault();

  let taskValue = document.querySelector("#todoInput").value;
  let importantValue = document.querySelector("#todoImportant").checked;

  let task = {
    task:taskValue,
    important:importantValue
  };

  if(localStorage.getItem('tasks') == null) {
    localStorage.setItem('tasks', JSON.stringify(task));
  } else {
    let tasks = localStorage.getItem('tasks');

    let taskString = `${tasks},${JSON.stringify(task)}`;

    localStorage.setItem('tasks', taskString);
  }
  fetchTask();
};

// Function to get the tasks from local storage
const fetchTask = () => {
  todoResults.innerHTML = '';
  if(localStorage.getItem('tasks') != null) {
    let tasks = Array.from(JSON.parse(`{"tasks":[${localStorage.getItem('tasks')}]}`).tasks);

    tasks.forEach(task => {
      if (task.task != null) {
        if(task.important === true) {
          todoResults.innerHTML += `<li class="important" id="${task.task.toString()}">${task.task.toString()}</li>`;
        } else {
          todoResults.innerHTML += `<li class="unimportant" id="${task.task.toString()}">${task.task.toString()}</li>`;
        }
      }
    });
  }
};

const deleteTask = (task) => {
  if(localStorage.getItem('tasks') != null) {
    let tasks = Array.from(JSON.parse(`{"tasks":[${localStorage.getItem('tasks')}]}`).tasks);

    let returnedTasks = tasks.filter(storedTask => {
      return storedTask.task !== task;
    });

    localStorage.setItem('tasks', JSON.stringify(returnedTasks).replace("[", "").replace("]", ""));

    fetchTask();
  }
};

todoResults.addEventListener('click', e => {
  let task = e.target;

  if(task.classList.contains('checked')){
    task.parentNode.removeChild(task);
    deleteTask(task.id)
  } else {
    task.classList.add('checked');
  }
});

fetchTask();

todoForm.addEventListener('submit', saveTask);