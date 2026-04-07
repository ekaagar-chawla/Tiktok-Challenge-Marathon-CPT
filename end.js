let replayBtn = document.getElementById("replay");

replayBtn.onclick = function () {
    window.location.href = "index.html";
    sessionStorage.clear(); //clears the stored times based after the user resets the game. 
}

function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

let swapSeconds = 0;
let aimSeconds = 0;
let puzzleSeconds = 0;
/*session storage.getItem either returns a string or it returns null. 
I learnt this from: https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem#:~:text=Espa%C3%B1ol-,Storage:%20getItem()%20method,in%20the%20given%20Storage%20object. */
if (sessionStorage.getItem('swapTime') != null) {
    swapSeconds = Number(sessionStorage.getItem('swapTime')); // Converts the string to a number. 
    document.getElementById("swapTime").textContent = formatTime(swapSeconds);
}

if (sessionStorage.getItem('aimTime') != null) {
    aimSeconds = Number(sessionStorage.getItem('aimTime'));
    document.getElementById("pinsTime").textContent = formatTime(aimSeconds);
}

if (sessionStorage.getItem('puzzleTime') != null) {
    puzzleSeconds = Number(sessionStorage.getItem('puzzleTime'));
    document.getElementById("puzzleTime").textContent = formatTime(puzzleSeconds);
}

let totalSeconds = swapSeconds + aimSeconds + puzzleSeconds;
document.getElementById("totalTime").textContent = formatTime(totalSeconds);

if (totalSeconds > 0) saveResult(swapSeconds, aimSeconds, puzzleSeconds, totalSeconds);

// --- localStorage helpers ---

