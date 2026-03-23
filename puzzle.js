let quitBtn = document.getElementById("quitButton");


quitBtn.onclick = function()
{
    window.location.href = "index.html";
}

let titleElement = document.getElementById("title");
let textTitle = "Welcome to Solve the Puzzle";
let index = 0;

function typeWriter()
{
      if(index < textTitle.length)
      {
            titleElement.textContent += textTitle[index];
            index++;
            setTimeout(typeWriter,50); //calls the function for each character every 50ms. Got inspiration from : https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout_cleartimeout
      }
}
typeWriter();


let skipBtn = document.getElementById("skipButton");
skipBtn.onclick = function() {
    window.location.href = "end.html";
}

// function moveTile(index)