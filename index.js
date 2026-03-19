let modal = document.getElementById("myModal");
let btn = document.getElementById("modalBtn");
let close = document.getElementById("closeBtn");


btn.onclick = function()
{
  modal.style.display = "block";
}


close.onclick = function()
{
  modal.style.display = "none";
}   

let swapHtmlBtn = document.getElementById("swap");
let hitHtmlBtn = document.getElementById("hit");
let solveHtmlbtn = document.getElementById("solve");

swapHtmlBtn.onclick = function()
{
    window.location.href = "swap.html";
}

hitHtmlBtn.onclick = function()
{
    window.location.href = "aim.html";
}
solveHtmlbtn.onclick = function ()
{
    window.location.href = "puzzle.html";
}