var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
var confirmation = 0;

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
div2.innerHTML = "Clicking Confirm will increase the counter."

div3 = document.createElement("div")
div3.id = "messageTitle"
div3.className = "headerMessage"
div3.innerHTML = "Confirmation Message"

document.body.appendChild(button);
document.body.appendChild(div1);
document.body.appendChild(div)
div.appendChild(div3)
div.appendChild(button3)
div.appendChild(div2)
div.appendChild(button2);


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


//doesn't work yet... is supposed to check if a key was pressed
document.getElementById('increaseButton').addEventListener('keydown', (e) => {
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
})


//also doesn't work yet... is supposed to move the box into a corner if it goes out of bounds
let innerX = window.innerWidth - (window.innerWidth*.2);
let innerY = window.innerHeight - (window.innerHeight*.15);

let rect = document.getElementById('messageBox').getBoundingClientRect();

if (rect.right > innerX) {
    document.getElementById("messageBox").style.left = innerX
}

if (rect.bottom > innerY) {
    document.getElementById("messageBox").style.top = innerY
}