const images = [
  "transred.png",
  "transorange.png",
  "transyellow.png",
  "transgreen.gif",
  "transblue.png",
  "transpurple.png"
];
//https://www1.lunapic.com/editor/?action=transparent for transparent images

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
let topRow, bottomRow;
function countCorrect(arr1, arr2) {
  let count = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] == arr2[i]) {
      count++;
    }
  }
  return count;
}
do {
  topRow = shuffle([...images]);
  bottomRow = shuffle([...images]);
} while (countCorrect(topRow, bottomRow) > 1);


let timerStarted = false;
let timerInterval = null;
let totalSeconds = 0;


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


let selectedIndex = null;
let moves = 0;

const topDiv = document.getElementById("top");
const bottomDiv = document.getElementById("bottom");
const scoreText = document.getElementById("score");


// Draw rows
function draw() {
  topDiv.innerHTML = "";
  bottomDiv.innerHTML = "";


  // Top row (clickable)
  topRow.forEach((imgSrc, index) => {
    const btn = document.createElement("button");


    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.height = "175px";
    btn.style.height = "200px";
    btn.style.backgroundColor = "transparent"; // fully transparent
    btn.style.display = "flex";
    btn.style.justifyContent = "center";
    btn.style.justifyContent = "down";
    btn.style.padding = "0";
    btn.appendChild(img);
    btn.addEventListener("click", () => handleClick(index));
    // highlight selected
    if (index === selectedIndex) {
      btn.style.border = "3px solid gold";
    }
    topDiv.appendChild(btn);
  });
  // Bottom row (target)
  bottomRow.forEach((imgSrc, index) => {
    const btn = document.createElement("button");


    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.height = "200px";


    btn.style.backgroundColor = "transparent"; // fully transparent
    btn.style.display = "flex";
    btn.style.justifyContent = "center";
    btn.style.alignItems = "center";
    btn.style.padding = "0";
    btn.appendChild(img);


    btn.addEventListener("click", () => handleClick(index));


    // highlight selected


    bottomDiv.appendChild(btn);
  });
  updateScore();
}


// Handle swapping
function handleClick(index) {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }


  if (selectedIndex === null) {
    selectedIndex = index;
  } else {
    // swap
    [topRow[selectedIndex], topRow[index]] =
      [topRow[index], topRow[selectedIndex]];

    moves++;
    document.getElementById("moves").textContent = "Moves: " + moves;


    selectedIndex = null;
  }


  draw();
}


// Score check
function updateScore() {
  let correct = 0;


  for (let i = 0; i < images.length; i++) {
    if (topRow[i] == bottomRow[i]) {
      correct++;
    }
  }


  scoreText.textContent = "Correct positions: " + correct + " / " + images.length;


  if (correct == images.length) {
    stopTimer();

    // If race mode is on, save the timestamp and go straight to the next game
    if (sessionStorage.getItem("raceModeActive") === "true") {
      sessionStorage.setItem("swapEndTime", Date.now());
      window.location.href = "aim.html";
      return;
    }

    sessionStorage.setItem('swapTime', totalSeconds);

    document.getElementById("score").style.display = "none";
    document.getElementById("winningMessage").style.display = "block";
    document.getElementById("box").style.display = "none";
  }
}




draw();
let quitBtn = document.getElementById("quitButton");


quitBtn.onclick = function () {
  window.location.href = "index.html";
}


document.getElementById("nextButton").onclick = function () {
  window.location.href = "aim.html";
}


// Hide restart, next, and quit buttons in race mode
if (sessionStorage.getItem("raceModeActive") === "true") {
  document.getElementById("restartButton").style.display = "none";
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("quitButton").style.display = "none";
}

document.getElementById("restartButton").onclick = function () {
  stopTimer();
  totalSeconds = 0;
  timerStarted = false; //resets the timer and the started variable
  updateTimerDisplay();
  do { //re-shuffles all the bottles and restarts the game.
    topRow = shuffle([...images]);
    bottomRow = shuffle([...images]);
  } while (countCorrect(topRow, bottomRow) > 1);
  moves = 0;
  document.getElementById("moves").textContent = "Moves: 0";
  selectedIndex = null;
  document.getElementById("score").style.display = "block";
  document.getElementById("winningMessage").style.display = "none";
  document.getElementById("box").style.display = "block";

  draw();
}
















