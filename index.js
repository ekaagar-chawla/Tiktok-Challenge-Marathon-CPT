let modal = document.getElementById("myModal");
let btn = document.getElementById("modalBtn");
let close = document.getElementById("closeBtn");

btn.onclick = function()
{
 modal.style.display = "block";
 //hide other buttons for better display
 swapHtmlBtn.style.display = "none";
 hitHtmlBtn.style.display = "none";
 solveHtmlbtn.style.display = "none";
}
close.onclick = function()
{
 modal.style.display = "none";
 swapHtmlBtn.style.display = "inline-block";
 hitHtmlBtn.style.display = "inline-block";
 solveHtmlbtn.style.display = "inline-block";
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





