let quitBtn = document.getElementById("quitButton");

quitBtn.onclick = function () {
    window.location.href = "index.html";
}
// I learnt to make this stopwatch from this youtube video: https://www.youtube.com/watch?v=d8-LGhKtzRw. 
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

document.getElementById("nextButton").onclick = function () {
    window.location.href = "puzzle.html";
}

document.getElementById("restartButton").onclick = function () {
    stopTimer();
    totalSeconds = 0;
    timerStarted = false;
    updateTimerDisplay();
    document.getElementById("winningMessage").style.display = "none";
    // re-initialize the game here, like dont with puzzle.js and swap.js
}

