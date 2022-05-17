var mousePosition;
var offset = [0, 0];
var messageBox;
var isDown = false;
var confirmation = 0;


// creating the elements to be used in this app
counterButton = document.createElement("button");
counterButton.id = "counterButton";
counterButton.className = "button outsideLayer";
counterButton.innerText = `Confirmation Counter: ${confirmation}`;
counterButton.onclick = open

confirmButton = document.createElement("button");
confirmButton.id = "confirmButton";
confirmButton.className = "button insideLayer";
confirmButton.innerHTML = "Confirm"
confirmButton.onclick = confirm

escButton = document.createElement("button");
escButton.id = "cancelButton";
escButton.className = "button insideLayer";
escButton.onclick = close

cancelButton = document.createElement("button");
cancelButton.id = "otherCancelButton";
cancelButton.className = "button insideLayer"
cancelButton.innerHTML = "Cancel"
cancelButton.onclick = close

scrim = document.createElement("div");
scrim.id = "scrim";
scrim.style.display = "none"
scrim.style.position = "absolute";
scrim.style.left = "0px";
scrim.style.top = "0px";
scrim.style.right = "0px";
scrim.style.bottom = "0px";
scrim.onclick = close


messageBox = document.createElement("div");
messageBox.id = "messageBox";
messageBox.style.display = "flex";
messageBox.style.position = "absolute";
messageBox.style.left = "40%";
messageBox.style.top = "35%";

messageText = document.createElement("div")
messageText.id = "actualMessage"
messageText.className = "info"
messageText.innerHTML = `Clicking Confirm will increase the counter.`

messageTitle = document.createElement("div")
messageTitle.id = "messageTitle"
messageTitle.className = "headerMessage"
messageTitle.innerHTML = "Confirmation Message"

messageboxButtons = document.createElement('div')
messageboxButtons.id = 'buttonHolder'
messageboxButtons.className = "info"

// creating the html elements and putting them on the page
document.body.appendChild(counterButton);
document.body.appendChild(scrim);
messageBox.appendChild(messageTitle)
messageBox.appendChild(escButton)
messageBox.appendChild(messageText)
messageBox.appendChild(messageboxButtons)
messageboxButtons.appendChild(confirmButton)
messageboxButtons.appendChild(cancelButton);



/// Opens the messagebox and waits for a keyup event to call openComplete
function open(e) {
    scrim.style.display = "block";
    document.body.appendChild(messageBox)
    counterButton.blur();
    
    // here's the hidden magic. A detail value of 0 indicates that the event e
    // originates from a non-clicked source.
    if(e.detail == 0) {
        window.addEventListener('keyup', openComplete);
        return;
    }
    
    window.addEventListener('keydown', onKeyDown);
    confirmButton.focus();
}


/// Completes the messagebox open and permits key interactions
function openComplete() {
    window.removeEventListener('keyup', openComplete);
    window.addEventListener('keydown', onKeyDown);
    confirmButton.focus();
}


/// Closes the messagebox and cleans up
function close() {
    scrim.style.display = "none";
    window.removeEventListener('keydown', onKeyDown)
    document.body.removeChild(messageBox)
}


/// Increments the counter and closes the messagebox
function confirm() {
    confirmation++
    counterButton.innerHTML = `Confirmation Counter: ${confirmation}`
    close();
}


/// Handles actions when the Enter or ESC keys are typed.
function onKeyDown(k) {
    // notice that the k.target has to be the Confirm button; otherwise I could type Enter when
    // the Cancel button is focus and confirm would get called.
    if (k.key === "Enter" && k.target == counterButton) {
        confirm();
    }
    else if (k.key === "Escape") {
        close();
    }
}


// this part does the setting of the dragging and dropping using offsets to be more accurate and less jumpy

messageBox.addEventListener('mousedown', function (e) {
    if (e.target === document.getElementById("messageTitle")) {
        isDown = true;
        offset = [
            messageBox.offsetLeft - e.clientX,
            messageBox.offsetTop - e.clientY
        ]
    };
}, true);

document.addEventListener('mouseup', function () {
    isDown = false;
}, true);

document.addEventListener('mousemove', function (event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        messageBox.style.left = (mousePosition.x + offset[0]) + 'px';
        messageBox.style.top = (mousePosition.y + offset[1]) + 'px';
    }
}, true);


// Provides functionality and some style to the elements that make up the scrim and alert/message
// document.getElementById('scrim').addEventListener('click', close)
// document.getElementById("counterButton").addEventListener("click", open)


//is supposed to move the box back in view if it goes out of bounds: Works now.
let innerX = window.innerWidth - (window.innerWidth * .25);
let innerY = window.innerHeight - (window.innerHeight * .20);

document.addEventListener('mouseup', function (event) {
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
    }
})