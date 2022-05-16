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
button.onMouseDown = stopFocus

button2 = document.createElement("button");
button2.id = "increaseButton";
button2.className = "button insideLayer";
button2.innerHTML = "Confirm"
button2.onclick = increaseCount
// button2.autofocus = true;

button3 = document.createElement("button");
button3.id = "cancelButton";
button3.className = "button insideLayer";
button3.onclick = removeDialog

button4 = document.createElement("button");
button4.id = "otherCancelButton";
button4.className = "button insideLayer"
button4.innerHTML = "Cancel"
button4.onclick = removeDialog

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
div.style.display = "flex";
div.style.position = "absolute";
div.style.left = "40%";
div.style.top = "35%";

div2 = document.createElement("div")
div2.id = "actualMessage"
div2.className = "info"
div2.innerHTML = `Clicking Confirm will increase the counter.`

div3 = document.createElement("div")
div3.id = "messageTitle"
div3.className = "headerMessage"
div3.innerHTML = "Confirmation Message"

div4 = document.createElement('div')
div4.id = 'buttonHolder'
div4.className = "info"

// creating the html elements and putting them on the page

document.body.appendChild(button);
document.body.appendChild(div1);

let countButton = document.getElementById('counterButton')


function onKeyUpEnter(e) {
            console.log("event handler adding check")
            if (e.target.key === "Enter") {
                console.log("enter fired")
                increaseCount()
                removeDialog()
            } else {
                null
            }
        }
function onKeyUpEscape(e) {
    if (e.target.key === "Escape") {
        console.log(e.key)
        removeDialog()
    }
}

function addDialog() {
    document.body.appendChild(div)
    div.appendChild(div3)
    div.appendChild(button3)
    div.appendChild(div2)
    div.appendChild(div4)
    div4.appendChild(button2)
    div4.appendChild(button4);
        // check if a key was pressed (enter for okay, esc for cancel)
        document.getElementById('increaseButton').focus()
        document.getElementById('increaseButton').addEventListener('keyup', (e) => {onKeyUpEnter(e)})
        document.getElementById('messageBox').addEventListener('keyup', (e) => {onKeyUpEscape(e)})
    console.log("Dialog Fired")
}

function removeDialog() {
    document.getElementById('scrim').style.display = "none";
    document.getElementById('increaseButton').removeEventListener('keyup', (e) => {onKeyUpEnter(e)})
    document.getElementById('messageBox').removeEventListener('keyup', (e) => {onKeyUpEscape(e)})

    if (document.getElementById('messageBox') !== null) {
    document.body.removeChild(div)
    div.removeChild(div3)
    div.removeChild(button3)
    div.removeChild(div2)
    div.removeChild(div4)
    div4.removeChild(button2)
    div4.removeChild(button4);
    }
}

function increaseCount() {
    confirmation++
    console.log("increase happened")
    counterButton.innerHTML = `Confirmation Counter: ${confirmation}`
    // counterButton.blur()
    // document.getElementById('scrim').style.display = "none";
    
    removeDialog();
}

function stopFocus() {e => e.preventDefault()}


// this part does the setting of the dragging and dropping using offsets to be more accurate and less jumpy

div.addEventListener('mousedown', function(e) {
    if (e.target === document.getElementById("messageTitle")) {
        isDown = true;
        offset = [
            div.offsetLeft - e.clientX,
            div.offsetTop - e.clientY
    ]};
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
    if (document.getElementById("messageBox") !== null) {
    removeDialog()
    }
})

document.getElementById("counterButton").addEventListener("click", function(event) {
    document.getElementById("scrim").style.display = "block";
    addDialog()
    // counterButton.blur()
})
let stupidStuff = false;

if (!stupidStuff) {
document.getElementById("counterButton").addEventListener("keyup", function(event) {
    if(event.key === 'Enter') {
    document.getElementById("scrim").style.display = "block";
    addDialog()
    // counterButton.blur()
    stupidStuff = true
    }
})} else {
document.getElementById("counterButton").removeEventListener("keyup", function(event) {
    document.getElementById("scrim").style.display = "block";
    addDialog()
    // counterButton.blur()
    stupidStuff = false
})
}

//is supposed to move the box back in view if it goes out of bounds: Works now.
let innerX = window.innerWidth - (window.innerWidth*.25);
let innerY = window.innerHeight - (window.innerHeight*.20);

document.addEventListener('mouseup', function(event) {
    if (document.getElementById('messageBox') !== null) {

    let rect = document.getElementById('messageBox').getBoundingClientRect();
    // console.log(rect)
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
}})