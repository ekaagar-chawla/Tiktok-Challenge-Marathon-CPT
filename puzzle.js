let quitBtn = document.getElementById("quitButton");


quitBtn.onclick = function () {
    window.location.href = "index.html";
}
let titleElement = document.getElementById("title");
let textTitle = "Welcome to Solve the Puzzle";
let index = 0;


function typeWriter() {
    if (index < textTitle.length) {
        titleElement.textContent += textTitle[index];
        index++;
        setTimeout(typeWriter, 50);
        /* calls the function for each character every 50ms.
         Got inspiration from : https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout_cleartimeout */
    }
}
typeWriter();
let skipBtn = document.getElementById("skipButton");
skipBtn.onclick = function () {
    window.location.href = "end.html";
}


let grid = [];
let moves = 0;

// --- Timer stuff ---
var timerStarted = false;
var timerInterval = null;
var totalSeconds = 0;

function updateTimerDisplay() {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    // pad each number to 2 digits so it always looks like 00:00:00
    var h = String(hours).padStart(2, '0');
    var m = String(minutes).padStart(2, '0');
    var s = String(seconds).padStart(2, '0');

    document.getElementById("timer").textContent = "Time: " + h + ":" + m + ":" + s;
}

function startTimer() {
    timerInterval = setInterval(function () {
        totalSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    totalSeconds = 0;
    timerStarted = false;
    updateTimerDisplay();
}


function generateDaPuzzle() {
    grid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = 0; i < 200; i++) {
        let blank = grid.indexOf(0);
        let neighbors = getDaNeighbors(blank);
        let randomPick = Math.floor(Math.random() * neighbors.length);
        let temp = neighbors[randomPick];
        grid[blank] = grid[temp];
        grid[temp] = 0;
    }
}


function getDaNeighbors(i) {
    let neighbors = [];
    let col = i % 3;
    let row = Math.floor(i / 3);
    if (row > 0) {
        neighbors[neighbors.length] = i - 3;
    }
    if (row < 2) {
        neighbors[neighbors.length] = i + 3;
    }
    if (col > 0) {
        neighbors[neighbors.length] = i - 1;
    }
    if (col < 2) {
        neighbors[neighbors.length] = i + 1;
    }
    return neighbors;
}
//main function.
function moveDaTile(index) {
    let blank = grid.indexOf(0);
    let neighbors = getDaNeighbors(blank);
    let canMove = false;
    for (let i = 0; i < neighbors.length; i++) {
        if (neighbors[i] == index) {
            canMove = true;
        }
    }
    if (!canMove) {
        return;
    }

    // start the timer on the very first move
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }

    grid[blank] = grid[index];
    grid[index] = 0;
    moves++;
    document.getElementById("movesCount").textContent = `Moves: ${moves}`;
    renderGrid();
    checkIfSolved();
}


function checkIfSolved() {
    let solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] != solved[i]) {
            return;
        }
    }
    stopTimer();
    document.getElementById("winningmessage").style.display = "block";
}


function renderGrid() {
    let gridElement = document.getElementById("grid");
    gridElement.innerHTML = "";
    for (let i = 0; i < grid.length; i++) {
        let tile = document.createElement("div");
        if (grid[i] == 0) {
            tile.classList.add("tile", "blank");
        }
        else {
            tile.classList.add("tile");
            tile.textContent = grid[i];
            tile.addEventListener("click", function () {
                moveDaTile(i);
            });
        }
        gridElement.appendChild(tile);
    }
}


document.getElementById("restartBtn").addEventListener("click", function () {
    moves = 0;
    document.getElementById("movesCount").textContent = "Moves: 0";
    document.getElementById("winningmessage").style.display = "none";

    // reset the timer so it's ready to go again on the next first move
    resetTimer();

    generateDaPuzzle();
    renderGrid();
});


generateDaPuzzle();
renderGrid();

