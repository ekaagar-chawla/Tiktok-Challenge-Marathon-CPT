let modal = document.getElementById("myModal");
let btn = document.getElementById("modalBtn");
let close = document.getElementById("closeBtn");
let infoSwap = document.getElementById("infoSwap");


btn.onclick = function () {
   modal.style.display = "block";
   //hide other buttons for better display
   swapHtmlBtn.style.display = "none";
   hitHtmlBtn.style.display = "none";
   solveHtmlbtn.style.display = "none";
}


btn.onclick = function () {
   modal.style.display = "block";
   //hide other buttons for better display
   swapHtmlBtn.style.display = "none";
   hitHtmlBtn.style.display = "none";
   solveHtmlbtn.style.display = "none";
}


const textDefault = "Welcome to the TikTok Challenge Marathon by Ekaagar and Aaryan!<br>"
   + "This is a compilation of several games inspired by TikTok.<br>"
   + "Try to complete the games as fast as possible!";




close.onclick = function () {
   modalHeader.textContent = "Instructions for Tiktok Challenge Marathon";
   modalText.innerHTML = textDefault;
   modal.style.display = "none";
   swapHtmlBtn.style.display = "inline-block";
   hitHtmlBtn.style.display = "inline-block";
   solveHtmlbtn.style.display = "inline-block";
}


const textSwap = "Here is how to play Swap the Bottles:<br>"
   + "There will be 4 hidden bottles arranged in a random order.<br>"
   + "There will also be 4 bottles on top of the box.<br>"
   + "You will have to swap 2 bottles at a time, until all 4 match.<br>"
   + "The computer will tell you how much bottles you have matched.<br>";






infoSwap.onclick = function () {
   modalHeader.textContent = "Swap the Bottles";
   modalText.innerHTML = textSwap;
}


const textAim = "Here is how to play Hit the Pins:<br>"
   + "There will be 4 pins in random locations on a table.<br>"
   + "There will be a ball at the end of the table that you have to push.<br>"
   + "The direction of the push will oscillate between left and right.<br>"
   + "Once clicked, the strength of the push will oscillate between high and low.<br>"
   + "Once clicked, the ball will be released, and you have to knock down all 4 pins.<br>"

infoAim.onclick = function () {
   modalHeader.textContent = "Hit the Pins";
   modalText.innerHTML = textAim;
}

const textPuzzle = "Here is how to play Solve the Puzzle :<br> There will be a 3x3 randomized grid of numbers from 1 - 8, with one blank space. Your job is to put the puzzle in ascending order in the least amount of moves possible, in order to completely solve the puzzle. <br><br>" +
   "You will have a time and a moves counter to track your progress.";

infoPuzzle.onclick = function () {
   modalHeader.textContent = "Solve the Puzzle";
   modalText.innerHTML = textPuzzle;
}

let swapHtmlBtn = document.getElementById("swap");
let hitHtmlBtn = document.getElementById("hit");
let solveHtmlbtn = document.getElementById("solve");

swapHtmlBtn.onclick = function () {
   window.location.href = "swap.html";
}
hitHtmlBtn.onclick = function () {
   window.location.href = "aim.html";
}
solveHtmlbtn.onclick = function () {
   window.location.href = "puzzle.html";
}

let raceModeBtn = document.getElementById("raceModeBtn");
let raceCountdown = document.getElementById("raceCountdown");

raceModeBtn.onclick = function () {
   raceModeBtn.disabled = true;

   let count = 3;
   raceCountdown.textContent = count;

   let countdownTimer = setInterval(function () {
      count--;
      if (count > 0) {
         raceCountdown.textContent = count;
      } else {
         clearInterval(countdownTimer);
         raceCountdown.textContent = "GO!";
         sessionStorage.setItem("raceModeActive", "true");
         sessionStorage.setItem("raceStartTime", Date.now());
         setTimeout(function () {
            window.location.href = "swap.html";
         }, 500);
      }
   }, 1000);
}
