var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
var confirmation = 0;


// creating the elements to be used in this app
button = document.createElement("button");
button.id = "counterButton";
button.className = "button outsideLayer";
button.innerText = `Confirmation Counter: ${confirmation}`;

button2 = document.createElement("button");
button2.id = "increaseButton";
button2.className = "button insideLayer";
button2.innerHTML = "Confirm"

button3 = document.createElement("button");
button3.id = "cancelButton";
button3.className = "button insideLayer";

div1 = document.createElement("div");
div1.id = "scrim";
div1.style.display = "none"
div1.style.position = "absolute";
div1.style.left = "0px";
div1.style.top = "0px";
div1.style.right = "0px";
div1.style.bottom = "0px";


div = document.createElement("div");
div.id = "messageBox";
div.style.display = "none";
div.style.position = "absolute";
div.style.left = "50%";
div.style.top = "50%";

div2 = document.createElement("div")
div2.id = "actualMessage"
div2.className = "info"
div2.innerHTML = `Clicking Confirm will increase the counter.`

div3 = document.createElement("div")
div3.id = "messageTitle"
div3.className = "headerMessage"
div3.innerHTML = "Confirmation Message"

// creating the html elements and putting them on the page

document.body.appendChild(button);
document.body.appendChild(div1);
document.body.appendChild(div)
div.appendChild(div3)
div.appendChild(button3)
div.appendChild(div2)
div.appendChild(button2);


// this part does the setting of the dragging and dropping using offsets to be more accurate and less jumpy

div.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
    
            x : event.clientX,
            y : event.clientY
    
        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);


// Provides functionality and some style to the elements that make up the scrim and alert/message
document.getElementById('scrim').addEventListener('click', function(e) {
    document.getElementById('scrim').style.display = "none";
    document.getElementById('messageBox').style.display = "none";
})

document.getElementById("counterButton").addEventListener("click", function(event) {
    document.getElementById("scrim").style.display = "block";
    document.getElementById('messageBox').style.left = "40%";
    document.getElementById('messageBox').style.top = "35%";
    document.getElementById('messageBox').style.display = "flex";

})

document.getElementById('increaseButton').addEventListener("click", function(event) {
    confirmation = confirmation += 1
    document.getElementById('counterButton').innerHTML = `Confirmation Counter: ${confirmation}`
    document.getElementById('scrim').style.display = "none";
    document.getElementById('messageBox').style.display = "none";
})
document.getElementById('cancelButton').addEventListener("click", function(event) {
    document.getElementById('scrim').style.display = "none";
    document.getElementById('messageBox').style.display = "none";
})


// check if a key was pressed (enter for okay, esc for cancel)
document.addEventListener('keyup', (e) => {
    if (document.getElementById('scrim').style.display === 'block') {
        if (e.key === "Enter") {
            confirmation = confirmation += 1
            document.getElementById('counterButton').innerHTML = `Confirmation Counter: ${confirmation}`
            document.getElementById('scrim').style.display = "none";
            document.getElementById('messageBox').style.display = "none";
        } else if (e.key === "Escape") {
            document.getElementById('scrim').style.display = "none";
            document.getElementById('messageBox').style.display = "none";
        } else {
            null
        }
    }
}, true)


//is supposed to move the box back in view if it goes out of bounds: Works now.
let innerX = window.innerWidth - (window.innerWidth*.2);
let innerY = window.innerHeight - (window.innerHeight*.15);

let rect = document.getElementById('messageBox').getBoundingClientRect();

document.addEventListener('mouseup', function(event) {

    let rect = document.getElementById('messageBox').getBoundingClientRect();
    console.log(rect)
    if (rect.right > innerX) {
        document.getElementById("messageBox").style.left = innerX + 'px'
    }

    if (rect.bottom > innerY) {
        document.getElementById("messageBox").style.top = innerY + 'px'
    }

    if (rect.top < 0) {
        document.getElementById("messageBox").style.top = 0 + 'px'
    }

    if (rect.left < 0) {
        document.getElementById('messageBox').style.left = 0 + 'px'
    }
})