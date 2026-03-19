let colors = ["red","green","yellow","blue"];
let moves = 0;

// shuffle top row
let topRow = [];
for(let i = 0; i < colors.length; i++){
  topRow[i] = colors[i];
}

// shuffle
for(let i = topRow.length - 1; i > 0; i--){
  let j = Math.floor(Math.random() * (i + 1));
  let temp = topRow[i];
  topRow[i] = topRow[j];
  topRow[j] = temp;
}
// target row
let bottomRow = ["red","green","yellow","blue"];

let selected = null;

let topDiv = document.getElementById("top");
let bottomDiv = document.getElementById("bottom");
let scoreText = document.getElementById("score");

function draw(){
  topDiv.innerHTML = "";
  bottomDiv.innerHTML = "";

  // top row (clickable)

  topRow.forEach((c,i)=>{ //for(let i = 0; i < c.length;)
    let btn = document.createElement("button");
    btn.textContent = c;
    btn.style.background = c;
    btn.onclick = ()=>clickTop(i);
    topDiv.appendChild(btn);
  });


  // bottom row (target)
  bottomRow.forEach(c=>{
    let btn = document.createElement("button");
    btn.textContent = c;
    btn.style.background = c;
    bottomDiv.appendChild(btn);
  });

  updateScore();
}

function clickTop(i){
  if(selected == null){
    selected = i;
    return;
  }

  // swap
  console.log(selected);
  let temp = topRow[selected];
  topRow[selected] = topRow[i];
  topRow[i] = temp;

  selected = null;
  draw();
}

function updateScore(){
  let correct = 0;

  for(let i=0;i<4;i++){
    if(topRow[i] == bottomRow[i]){
      correct++;
    }
  }

  scoreText.textContent = "Correct positions: " + correct + " / 4";
}

draw();
let quitBtn = document.getElementById("quitButton");


quitBtn.onclick = function()
{
    window.location.href = "index.html";
}