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
skipBtn.onclick = function moveToEnd() {
    stopTimer();
    sessionStorage.setItem('puzzleTime', totalSeconds);
    window.location.href = "end.html";
}

//intialize the grid and moves.
let grid = [];
let moves = 0;

// I learnt to make this stopwatch from this youtube video: https://www.youtube.com/watch?v=d8-LGhKtzRw. 
let timerStarted = false; //setup the intial variables. 
let timerInterval = null;
let totalSeconds = 0;
//this function updates the timer display in the form 00:00:00, because of the padStart
function updateTimerDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    let h = String(hours).padStart(2, '0');
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');

    document.getElementById("timer").textContent = `Time: ${h}:${m}:${s}`;
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


/*This function first populates, and then gets the index of the blank tile, it calls onto another function to get the neighbours,
 and swaps the blank index with a random neighbor 200 times. */
function generateThePuzzle() {
    grid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = 0; i < 200; i++) {
        let blank = grid.indexOf(0);
        let neighbors = getTheNeighbors(blank);
        let randomPick = Math.floor(Math.random() * neighbors.length);
        let temp = neighbors[randomPick];
        grid[blank] = grid[temp];
        grid[temp] = 0;
    }
}

/*The function works like a 3x3 grid thats been flattened to a 1D array. The index is converted to rows and columns first
Then the neighbors are found by moving up, down, left, or right. */
function getTheNeighbors(i) {
    let neighbors = [];
    let col = i % 3;
    let row = Math.floor(i / 3);
    if (row > 0) { //moving up
        neighbors[neighbors.length] = i - 3;
    }
    if (row < 2) { //moving down
        neighbors[neighbors.length] = i + 3;
    }
    if (col > 0) { //moving left
        neighbors[neighbors.length] = i - 1;
    }
    if (col < 2) { //moving right
        neighbors[neighbors.length] = i + 1;
    }
    return neighbors;
}
//Condensed the CPT function, and made it more efficient by calling on multiple helper functions. 
function moveTheTile(index) {
    let blank = grid.indexOf(0);//gets the index of the blank tile.
    let neighbors = getTheNeighbors(blank);//gets the neighbors of the blank tile.
    let canMove = false;
    for (let i = 0; i < neighbors.length; i++) {
        if (neighbors[i] == index) { //checks if the clicked tile is a neighbor of the blank tile.
            canMove = true;
        }
    }
    if (!canMove) return;
    // start the timer on the very first move
    startTheTimer();
    swapTheTiles(index);
    incrementMoves();
    renderGrid(); // call the render grid function to update the display.
    checkIfSolved(); // call the check if solved function to check if the puzzle is solved.
}
function startTheTimer() {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
}
function incrementMoves() {
    moves++;
    document.getElementById("movesCount").textContent = `Moves: ${moves}`;
}
function swapTheTiles(index) {
    let blank = grid.indexOf(0);
    grid[blank] = grid[index];
    grid[index] = 0;
}

function checkIfSolved() { //iterates through the current grid, and compares it to the solved grid that is given in this function. 
    let solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] != solved[i]) {
            return;
        }
    }
    stopTimer(); //if solved, the timer stops and the winning message is displayed. This stopTimer() function was made above in the Timer Section.
    sessionStorage.setItem('puzzleTime', totalSeconds);
    document.getElementById("winningmessage").style.display = "block";
}


function renderGrid() {
    let gridElement = document.getElementById("grid"); //creates a grid elemnent.
    gridElement.innerHTML = ""; //clears the grid 
    for (let i = 0; i < grid.length; i++) { //iterates through the grid, and creates the tile element for each position, making a 3x3 grid. 
        let tile = document.createElement("div");
        if (grid[i] == 0) {
            tile.classList.add("tile", "blank"); //if the grid is blank, then it adds the blank class to the tile.
        }
        else {
            tile.classList.add("tile");
            tile.textContent = grid[i];
            tile.addEventListener("click", function () { //adds an event listener to the tile, which calls the moveTheTile function when the tile is clicked.
                moveTheTile(i);
            });
        }
        gridElement.appendChild(tile); //appends the tile to the grid element.
    }
}


document.getElementById("restartBtn").addEventListener("click", function () { //adds an event listener to the restart button, which calls the function when the button is clicked.
    moves = 0; //resets the number of moves.
    document.getElementById("movesCount").textContent = "Moves: 0"; //resets the text content of Moves.
    document.getElementById("winningmessage").style.display = "none"; //hides the winning message.

    // reset the timer so it's ready to go again on the next first move
    resetTimer();
    generateThePuzzle(); //intializes the whole grid and puzzle again because of the restart button. 
    renderGrid();
});

generateThePuzzle();
renderGrid();
