let replayBtn = document.getElementById("replay");
replayBtn.onclick = function () {
    sessionStorage.clear();
    window.location.href = "index.html";
};

function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function saveResult(swap, aim, puzzle, total) {
    let results = JSON.parse(localStorage.getItem("marathonResults")) || [];
    /*json.parse creates an object, so I am using .push to add the new result to the object.
    It's appending al the values we have right as parameters to their respecgive keys.
    I could also use a for loop going from 0 to i <= result.length, but this is cleaner. */
    results.push({
        swap: swap,
        aim: aim,
        puzzle: puzzle,
        total: total
    });
    localStorage.setItem("marathonResults", JSON.stringify(results));
}
function loadResults() {
    let results = JSON.parse(localStorage.getItem("marathonResults")) || [];

    // Used bubble sort for sorting from least to greatest.
    for (let i = 0; i < results.length - 1; i++) {
        for (let j = 0; j < results.length - 1 - i; j++) {
            if (results[j].total > results[j + 1].total) {
                let temp = results[j];
                results[j] = results[j + 1];
                results[j + 1] = temp;
            }
        }
    }
    return results;
}

//I used claude.com for this function of showing previous results and I got some help with the idea and for the big for loop.
function showPastResults() {
    let results = loadResults();
    let top3Div = document.getElementById("top3");
    let allDiv = document.getElementById("all-results");

    top3Div.innerHTML = "";
    allDiv.innerHTML = "";

    if (results.length == 0) {
        let zeroData = document.createElement("p");
        zeroData.className = "no-data";
        zeroData.textContent = "No results yet. Complete at least 2 games first!";
        allDiv.appendChild(zeroData);
        return;
    }

    let medals = ["Gold", "Silver", "Bronze"];
    let rankClasses = ["rank-gold", "rank-silver", "rank-bronze"];

    for (let i = 0; i < results.length; i++) {
        let r = results[i];
        let row = document.createElement("div");
        row.className = "result-row";

        let rankSpan = document.createElement("span");
        rankSpan.className = "result-rank";
        if (i < 3) {
            rankSpan.textContent = medals[i];
            row.classList.add(rankClasses[i]);
        } else {
            rankSpan.textContent = "#" + (i + 1);
        }
        let timesSpan = document.createElement("span");
        timesSpan.className = "result-times";
        timesSpan.textContent = formatTime(r.swap) + "  |  " + formatTime(r.aim) + "  |  " + formatTime(r.puzzle);
        let totalSpan = document.createElement("span");
        totalSpan.className = "result-total";
        totalSpan.textContent = formatTime(r.total);
        row.appendChild(rankSpan);
        row.appendChild(timesSpan);
        row.appendChild(totalSpan);
        if (i < 3) {
            top3Div.appendChild(row);
        } else {
            allDiv.appendChild(row);
        }
    }
}

let overlay = document.getElementById("modal-overlay");
let pastResultsBtn = document.getElementById("pastResults");
let modalCloseBtn = document.getElementById("modal-close");

pastResultsBtn.onclick = function () {
    showPastResults();
    overlay.classList.add("visible");
};

modalCloseBtn.onclick = function () {
    overlay.classList.remove("visible");
};

let clearBtn = document.getElementById("clear-results");
clearBtn.onclick = function () {
    localStorage.removeItem("marathonResults");
    showPastResults();
};

let swapSeconds = 0;
let aimSeconds = 0;
let puzzleSeconds = 0;
let totalSeconds = 0;

// If race mode was used, calculate times from the saved timestamps so they all add up
if (sessionStorage.getItem("raceModeActive") === "true") {
    let raceStart = Number(sessionStorage.getItem("raceStartTime"));
    let swapEnd = Number(sessionStorage.getItem("swapEndTime"));
    let aimEnd = Number(sessionStorage.getItem("aimEndTime"));
    let puzzleEnd = Number(sessionStorage.getItem("puzzleEndTime"));

    swapSeconds = Math.floor((swapEnd - raceStart) / 1000);
    aimSeconds = Math.floor((aimEnd - swapEnd) / 1000);
    puzzleSeconds = Math.floor((puzzleEnd - aimEnd) / 1000);
    totalSeconds = Math.floor((puzzleEnd - raceStart) / 1000);

    document.getElementById("swapTime").textContent = formatTime(swapSeconds);
    document.getElementById("pinsTime").textContent = formatTime(aimSeconds);
    document.getElementById("puzzleTime").textContent = formatTime(puzzleSeconds);
    document.getElementById("total-label").textContent = "Race Time";
    document.getElementById("totalTime").textContent = formatTime(totalSeconds);
} else {
    /*session storage.getItem either returns a string or it returns null.
    I learnt this from: https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem */
    if (sessionStorage.getItem("swapTime") != null) {
        swapSeconds = Number(sessionStorage.getItem("swapTime"));
        document.getElementById("swapTime").textContent = formatTime(swapSeconds);
    }
    if (sessionStorage.getItem("aimTime") != null) {
        aimSeconds = Number(sessionStorage.getItem("aimTime"));
        document.getElementById("pinsTime").textContent = formatTime(aimSeconds);
    }
    if (sessionStorage.getItem("puzzleTime") != null) {
        puzzleSeconds = Number(sessionStorage.getItem("puzzleTime"));
        document.getElementById("puzzleTime").textContent = formatTime(puzzleSeconds);
    }
    totalSeconds = swapSeconds + aimSeconds + puzzleSeconds;
    document.getElementById("totalTime").textContent = formatTime(totalSeconds);
}

// Count how many games the user actually played
let gamesPlayed = 0;
if (swapSeconds > 0) { gamesPlayed = gamesPlayed + 1; }
if (aimSeconds > 0) { gamesPlayed = gamesPlayed + 1; }
if (puzzleSeconds > 0) { gamesPlayed = gamesPlayed + 1; }

// Only save if all 3 games were completed
if (gamesPlayed >= 3) {
    saveResult(swapSeconds, aimSeconds, puzzleSeconds, totalSeconds);
}