//I saw this type of cursor on this website: https://www.dwait.dev. I tried to recreate the same in javascript. 


let wrapper = document.getElementById("cursor-wrapper");  //Getting all the elements defined on html pages in the next few lines
let tl = document.getElementById("tl");
let tr = document.getElementById("tr");
let bl = document.getElementById("bl");
let br = document.getElementById("br");

let mouseX = 0;
let mouseY = 0;  //initializing the positon of the cursor
let rotation = 0;
let spinning = true;
let lockedEl = null;  //checking if the cursor is over an element, so I can move the corners to the 4 corners of the selected element.

document.addEventListener("mousemove", (event) => {   //checking for movement, and then obtaining the coords of the cursor. 
    mouseX = event.clientX; // I learnt how to obtain the position from this website: https://stackoverflow.com/questions/23744605/javascript-get-x-and-y-coordinates-on-mouse-click#:~:text=Mouse%20Coordinate%20References:%20Different%20properties%20of%20the,the%20overall%20page%20content%2C%20including%20scroll%20position.
    mouseY = event.clientY;

    wrapper.style.left = `${mouseX}px`;
    wrapper.style.top = `${mouseY}px`;

    if (!spinning && lockedEl) {
        lockCorners(lockedEl);
    }

});

function rotate() //function used to actually rotate the cursor wrapper.
{
    if (spinning) {
        rotation += 3;
        if (rotation >= 360) {
            rotation = 0;
        }
        wrapper.style.transform = `translate(-50%,-50%) rotate(${rotation}deg)`;
    }
    requestAnimationFrame(rotate);  //requests the browser to actually animate the function, and then calls onto rotate function for the animation. 
}
rotate();

let clickableItems = document.querySelectorAll("button, a"); //collects all the clickable elements on the html page, buttons and anchor links.

for (let i = 0; i < clickableItems.length; i++) //iterates through all the clickable items in the list, and then adds event Listeners for leaving and entering the items.
{
    let el = clickableItems[i];
    el.addEventListener("mouseenter", (event) => {
        spinning = false;
        lockedEl = event.target;
        rotation = 0
        wrapper.style.transform = "translate(-50%, -50%) rotate(0deg)";
        lockCorners(event.target);
    });

    el.addEventListener("mouseleave", (event) => {
        spinning = true;
        lockedEl = null;
        tl.style.transform = "translate(-18px, -18px)";
        tr.style.transform = "translate(6px,-18px)";
        br.style.transform = "translate(6px,6px)";
        bl.style.transform = "translate(-18px,6px)";
    });
}
function lockCorners(el)  //got help from chatgpt.com, I did not know how to get the dimensions of the different elements
{
    let rectangularDimensions = el.getBoundingClientRect();
    let padding = 4;

    let left = rectangularDimensions.left - mouseX - padding;
    let right = rectangularDimensions.right - mouseX + padding - 12;
    let top = rectangularDimensions.top - mouseY - padding;
    let bottom = rectangularDimensions.bottom - mouseY + padding - 12;

    tl.style.transform = `translate(${left}px,  ${top}px)`;
    tr.style.transform = `translate(${right}px, ${top}px)`;
    br.style.transform = `translate(${right}px, ${bottom}px)`;
    bl.style.transform = `translate(${left}px,  ${bottom}px)`;
}


document.addEventListener("mousemove", (event) => {    //This detects mouse movement, and in that case, creates a pixel div and adds the class pixels to it. The initial position starts at the location of the cursor. 

    let pixels = document.createElement("div");
    pixels.classList.add("pixels");
    pixels.style.left = `${event.clientX}px`;
    pixels.style.top = `${event.clientY}px`;
    document.body.appendChild(pixels);
    removePixel()
    setTimeout(removePixel, 600);

});
function removePixel() {
    pixels.remove();
}

