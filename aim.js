// =====================
// GAME SETUP
// =====================
let hitPins = [];
const gameArea = document.getElementById("gameArea");


let pinsContainer = document.createElement("div");
pinsContainer.id = "pinsContainer";
gameArea.appendChild(pinsContainer);


const ball = document.getElementById("ball");
let arrow = document.getElementById("aimArrow");


// =====================
// GAME STATE
// =====================
let direction = 0;
let power = 0;


let aiming = false;
let settingPower = false;


let dirInterval;
let powerInterval;


// =====================
// TIMER (STOPWATCH)
// =====================
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
    timerInterval = setInterval(() => {
        totalSeconds++;
        updateTimerDisplay();
    }, 1000);
}


function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}


// =====================
// SPAWN PINS
// =====================
function spawnPins() {
    pinsContainer.innerHTML = "";


    const placedPins = []; //assigning to an array so pins don't overlap
    const minDistance = 150;


    for (let i = 0; i < 7; i++) {
        const pin = document.createElement("img");
        pin.src = "transpin.png";
        pin.classList.add("pin");


        let x, y, overlapping;


        do {
            overlapping = false;


            x = Math.random() * (gameArea.clientWidth - 200); // so pins don't go out of bounds
            y = Math.random() * (gameArea.clientHeight - 250);


            for (let p of placedPins) {
                const dx = x - p.x;
                const dy = y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);


                if (dist < minDistance) {
                    overlapping = true;
                    break;
                }
            }


        } while (overlapping);


        placedPins.push({ x, y });


        pin.style.left = x + "px";
        pin.style.top = y + "px";


        pinsContainer.appendChild(pin);
    }
}


// =====================
// AIMING
// =====================
function startAiming() {
    aiming = true;
    let increasing = true;


    dirInterval = setInterval(() => {
        if (increasing) {
            direction += 2;
        } else {
            direction -= 2;
        }


        if (direction >= 90) increasing = false;
        if (direction <= -90) increasing = true;


        if (arrow) {
            arrow.style.transform = `translateX(-50%) rotate(${direction}deg)`;
        }


    }, 20);
}


// =====================
// POWER
// =====================
function startPower() {
    settingPower = true;
    let increasing = true;


    powerInterval = setInterval(() => {
        if (increasing) {
            power += 1;
        } else {
            power -= 1;
        }
        if (power >= 50) increasing = false;
        if (power <= 5) increasing = true;


        let min = 5;
        let max = 50;
        let ratio = (power - min) / (max - min);


        // COLOR
        let red = Math.round(255 * (1 - ratio));
        let green = Math.round(255 * ratio);
        arrow.style.color = `rgb(${red}, ${green}, 0)`;


        // SIZE (🔴 small → 🟢 big)
        let minSize = 50;   // smallest size (px)
        let maxSize = 100;   // biggest size (px)


        let size = minSize + (maxSize - minSize) * ratio;
        arrow.style.fontSize = size + "px";
    }, 20);
}


// =====================
// RESET BALL
// =====================
function resetBall() {
    clearInterval(dirInterval);
    clearInterval(powerInterval);


    ball.style.left = "50%";
    ball.style.bottom = "10px";
    ball.style.top = "";


    direction = 0;
    power = 0;
    startAiming();
}


// =====================
// SHOOT BALL
// =====================
function shootBall() {
    const angle = direction * Math.PI / 180;


    let x = ball.offsetLeft;
    let y = ball.offsetTop;


    let vx = Math.sin(angle) * power * power;
    let vy = -Math.cos(angle) * power * power;


    const friction = 0.96;
    hitPins = [];


    let slowFrames = 0;


    const move = setInterval(() => {
        x += vx * 0.03;
        y += vy * 0.03;


        vx *= friction;
        vy *= friction;


        ball.style.left = x + "px";
        ball.style.top = y + "px";


        checkCollision();


        // OUT OF BOUNDS → cancel hits
        if (
            y < 0 ||
            x < 0 ||
            x > gameArea.clientWidth ||
            y > gameArea.clientHeight
        ) {
            clearInterval(move);


            hitPins.forEach(pin => {
                pin.style.opacity = "1";
            });


            hitPins = [];
            resetBall();
            return;
        }


        // 🧠 slow motion detector
        if (Math.abs(vx) < 1 && Math.abs(vy) < 1) {
            slowFrames++;
        } else {
            slowFrames = 0;
        }


        // ⛔ force stop if crawling too long
        if (slowFrames > 15) {
            clearInterval(move);


            hitPins.forEach(pin => pin.remove());
            hitPins = [];


            if (document.querySelectorAll(".pin").length === 0) {
                stopTimer();

                // If race mode is on, save timestamp and go to the next game
                if (sessionStorage.getItem("raceModeActive") === "true") {
                    sessionStorage.setItem("aimEndTime", Date.now());
                    window.location.href = "puzzle.html";
                    return;
                }
                sessionStorage.setItem('aimTime', totalSeconds);
                document.getElementById("winningMessage").style.display = "block";
            }


            resetBall();
            return;
        }


        // STOP → confirm hits
        if (Math.abs(vx) < 1.5 && Math.abs(vy) < 1.5) {
            clearInterval(move);


            hitPins.forEach(pin => pin.remove());
            hitPins = [];


            if (document.querySelectorAll(".pin").length === 0) {
                stopTimer();

                // If race mode is on, save timestamp and go to the next game
                if (sessionStorage.getItem("raceModeActive") === "true") {
                    sessionStorage.setItem("aimEndTime", Date.now());
                    window.location.href = "puzzle.html";
                    return;
                }
                sessionStorage.setItem('aimTime', totalSeconds);
                document.getElementById("winningMessage").style.display = "block";
            }


            resetBall();
        }


    }, 20);
}

// =====================
// COLLISION
// =====================
function checkCollision() {
    const pins = document.querySelectorAll(".pin");


    pins.forEach(pin => {
        const pinRect = pin.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();


        if (
            ballRect.left < pinRect.right &&
            ballRect.right > pinRect.left &&
            ballRect.top < pinRect.bottom &&
            ballRect.bottom > pinRect.top
        ) {
            if (!hitPins.includes(pin)) {
                hitPins.push(pin);


                // visually show hit (optional)
                pin.style.opacity = "0.5";
            }
        }
    });
}


// =====================
// BUTTONS
// =====================


// Lock direction → power
document.getElementById("lockDirection").onclick = function () {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
    timerStarted = true;
    if (aiming) {
        clearInterval(dirInterval);
        aiming = false;
        startPower();
    }
};


// Lock power → shoot
document.getElementById("lockPower").onclick = function () {
    if (settingPower) {
        clearInterval(powerInterval);
        settingPower = false;
        shootBall();
    }
};


// Restart (MERGED LOGIC)
document.getElementById("restartButton").onclick = function () {
    stopTimer();
    totalSeconds = 0;
    timerStarted = false;
    updateTimerDisplay();


    document.getElementById("winningMessage").style.display = "none";


    clearInterval(dirInterval);
    clearInterval(powerInterval);


    resetBall();
    spawnPins();
};


// Quit button
document.getElementById("quitButton").onclick = function () {
    window.location.href = "index.html";
};


// Next button
document.getElementById("nextButton").onclick = function () {
    window.location.href = "puzzle.html";
};


// Hide restart, next, and quit buttons in race mode
if (sessionStorage.getItem("raceModeActive") === "true") {
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("quitButton").style.display = "none";
}

// =====================
// INIT
// =====================
spawnPins();
resetBall();

