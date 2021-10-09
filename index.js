let isPlaying = false;
let point1 = 0;
let point2 = 0;
let chosenMole = 0;
let timeoutID = 0;
let attemptsCounter = 0;
const maxNumberMole = 20;
const attempts = 10;

//
// Initialize game
//
function init() {

    includeHoles(maxNumberMole);
    prepareButtons();

}

//
// Initial screen - Include holes on game dashboard
//
function includeHoles(times) {

    console.log('includeHoles');
    const $$game = window.document.querySelector('#game');

    for (let i = 1; i <= times; i++) {

        const $$cell = document.createElement('div');
        $$cell.className = "game__cell";
        
        const $$img = document.createElement('img');
        $$img.src = "/images/hole-svgrepo-com.svg";
        $$img.alt = "Mole";
        $$img.className="game__img";
        $$img.id = "game__img_" + i;
        $$img.addEventListener('click', clickImg);

        $$cell.appendChild($$img);
        $$game.appendChild($$cell);
    }
}

//
// Prepare play and cancel buttons
//
function prepareButtons() {

    console.log('prepareButtons');
    window.document.querySelector('#game__btn-init').addEventListener('click', clickPlayButton);
    window.document.querySelector('#game__btn-canc').addEventListener('click', clickCancelButton);
}

//
// Play game
//
function playGame(nTimes) {

    console.log('playGame');
    
    chosenMole = selectRamdomMole(maxNumberMole);
    console.log('chosenMole ->', chosenMole);
    window.document.getElementById('game__img_' + chosenMole).src = "/images/mole-svgrepo-com.svg";
    
    console.log('Empieza el tiempo');
    
    timeoutID = setTimeout(showKo, 2000, 'game__img_' + chosenMole);
    console.log('timeoutID ->', timeoutID);   
}

//
// Function to be executed when clicking on a mole
//
function clickImg(event) {

    console.log('clickImg');
    console.log(event);
    console.log(event.target.id);

    clearTimeout(timeoutID);

    if ( event.target.id == 'game__img_' + chosenMole) {
        console.log("BIEEEN! Es el mismo");
        showOk(event.target.id);
    } else {
        console.log("OHHHH! No es el correcto");
        showKo(event.target.id);
    }

}

//
// Function to be executed when clicking on the start button
//
function clickPlayButton() {
    console.log('clickPlayButton');

    if (!isPlaying) {
        isPlaying = true;
        resetPoints();
        cleanGamePanel();
        playGame();
    } else {
        console.error('Ya está jugando');
    }
}

//
// Function to be executed when clicking on the cancel button
//
function clickCancelButton() {

    console.log('clickCancelButton');
    clearTimeout(timeoutID);
    isPlaying = false;
}

//
// Player has clicked on a hole and not on the mole
//
function showKo(elem) {
    
    console.log('showKo ->', elem);
    $$elem = window.document.querySelector('#' + elem);
    $$elem.src = "/images/error-svgrepo-com.svg";
    addPointKo();
    playAgain();
}

//
// Player has clicked on the mole
//
function showOk(elem) {

    console.log('showOk');
    $$elem = window.document.querySelector('#' + elem);
    $$elem.src = "/images/success-svgrepo-com.svg";
    addPointOk();
    playAgain();
}

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
    }     
}

function addPointOk() {
    console.log('addPointOk');
    point1++;
    updatePointOk(point1);
}

function addPointKo() {
    console.log('addPointKo');
    point2++;
    updatePointKo(point2);
}

function resetPoints() {
    console.log('resetPointOk');
    point1=0;
    point2=0;
    updatePointOk(point1);
    updatePointKo(point2);
}

function updatePointOk(value) {
    window.document.querySelector('#game__points-1').textContent = value;
}

function updatePointKo(value) {
    window.document.querySelector('#game__points-2').textContent = value;
}
 
//
// Randomly selects the mole to be played with
//
function selectRamdomMole(maxValue) {

    return (Math.round((maxValue - 1) * Math.random()) + 1);
}

function cleanGamePanel() {

    console.log("cleanGamePanel");
    const $$cells = document.querySelectorAll('.game__img');
    $$cells.forEach((elem) => {
        elem.src = "/images/hole-svgrepo-com.svg";
    });
}


window.onload = () => {
    
    console.log("Onload");
    init();
}