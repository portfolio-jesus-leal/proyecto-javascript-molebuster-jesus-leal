//
// General variables and constants
//
let isPlaying = false;
let point1 = 0;
let point2 = 0;
let chosenMole = "";
let timeoutID = 0;
let attemptsCounter = 0;
const maxNumberMole = 20;
const attempts = 10;
const nTimeout = 1800;
const nPause = 900;

//
// Initialize game
//
function init() {
  hideGameOver();
  includeHoles(maxNumberMole);
  prepareButtons();
}

//
// Initial screen - Include holes on game dashboard
//
function includeHoles(times) {
  console.log("includeHoles");
  const $$game = window.document.querySelector("#game");

  for (let i = 1; i <= times; i++) {
    const $$cell = document.createElement("div");
    $$cell.className = "game__cell";

    const $$img = document.createElement("img");
    $$img.src = "/images/hole-svgrepo-com.svg";
    $$img.alt = "Mole";
    $$img.className = "game__img";
    $$img.id = "game__img_" + i;
    $$img.addEventListener("click", clickImg);

    $$cell.appendChild($$img);
    $$game.appendChild($$cell);
  }
}

//
// Prepare play and cancel buttons
//
function prepareButtons() {
  console.log("prepareButtons");
  window.document
    .querySelector("#game__btn-init")
    .addEventListener("click", clickPlayButton);
  window.document
    .querySelector("#game__btn-canc")
    .addEventListener("click", clickCancelButton);
}

//
// Play game
//
function playGame(nTimes) {
  console.log("playGame");

  chosenMole = "game__img_" + selectRamdomMole(maxNumberMole);
  window.document.getElementById(chosenMole).src =
    "/images/mole-svgrepo-com.svg";
  timeoutID = setTimeout(showKo, nTimeout, chosenMole);
}

//
// Function to be executed when clicking on a mole
//
function clickImg(event) {
  console.log("clickImg");
  clearTimeout(timeoutID);

  if (event.target.id == chosenMole) {
    showOk(event.target.id);
  } else {
    showKo(event.target.id);
  }
}

//
// Function to be executed when clicking on the start button
//
function clickPlayButton() {
  console.log("clickPlayButton");

  if (!isPlaying) {
    isPlaying = true;
    attemptsCounter = 0;
    resetPoints();
    cleanGamePanel();
    hideGameOver();
    playGame();
  } else {
    console.error("Ya está jugando");
  }
}

//
// Function to be executed when clicking on the cancel button
//
function clickCancelButton() {
  console.log("clickCancelButton");
  if (isPlaying) {
    isPlaying = false;
    clearTimeout(timeoutID);
    cleanGamePanel();
    showGameOver();
  }
}

//
// Player has clicked on a hole and not on the mole
//
function showKo(elem) {
  console.log("showKo");
  $$elem = window.document.querySelector("#" + elem);
  $$elem.src = "/images/error-svgrepo-com.svg";
  addPointKo();
  playAgain();
}

//
// Player has clicked on the mole
//
function showOk(elem) {
  console.log("showOk");
  $$elem = window.document.querySelector("#" + elem);
  $$elem.src = "/images/success-svgrepo-com.svg";
  addPointOk();
  playAgain();
}

//
// Play successive games
//
function playAgain() {
  attemptsCounter++;

  if (attemptsCounter < attempts) {
    timeoutID = setTimeout(() => {
      cleanGamePanel();
      playGame();
    }, 1000);
  } else {
    isPlaying = false;
    attemptsCounter = 0;
    showGameOver();
  }
}

//
// Add a point OK
//
function addPointOk() {
  console.log("addPointOk");
  point1++;
  updatePointOk(point1);
}

//
// Add a point KO
//
function addPointKo() {
  console.log("addPointKo");
  point2++;
  updatePointKo(point2);
}

//
// Set points to zero
//
function resetPoints() {
  console.log("resetPointOk");
  point1 = 0;
  point2 = 0;
  updatePointOk(point1);
  updatePointKo(point2);
}

// 
// Update points OK on the web
// 
function updatePointOk(value) {
  window.document.querySelector("#game__points-1").textContent = value;
}

// 
// Update points KO on the web
// 
function updatePointKo(value) {
  window.document.querySelector("#game__points-2").textContent = value;
}

//
// Randomly selects the mole to be played with
//
function selectRamdomMole(maxValue) {
  return Math.round((maxValue - 1) * Math.random()) + 1;
}

//
// Initialize the game panel and makes it ready for a new game
//
function cleanGamePanel() {
  console.log("cleanGamePanel");
  const $$cells = document.querySelectorAll(".game__img");
  $$cells.forEach((elem) => {
    elem.src = "/images/hole-svgrepo-com.svg";
  });
}

//
// Show the Game Over message
//
function showGameOver() {
  console.log("showGameOver");
  document.querySelector(".game__over").classList.remove("d-none");
}

//
// Hide the Game Over message
// 
function hideGameOver() {
  console.log("hideGameOver");
  document.querySelector(".game__over").classList.add("d-none");
}

//
// Main function
//
window.onload = () => {
  console.log("Onload");
  init();
};
