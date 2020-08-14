var canvas, canvasimg, backgroundImage, finalImg;
var mouseClicked = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var fillStyle = "black";
var globalCompositeOperation = "source-over";
var lineWidth = 2;

function init() {
    var imageSrc = '/abstract-geometric-pattern_23-2147508597.jpg'
    backgroundImage = new Image();
    backgroundImage.src = imageSrc;
    canvas = document.getElementById('can');
    finalImg = document.getElementById('finalImg');
    canvasimg = document.getElementById('canvasimg');
    canvas.style.backgroundImage = "url('" + imageSrc + "')";
    canvas.addEventListener("mousemove", handleMouseEvent);
    canvas.addEventListener("mousedown", handleMouseEvent);
    canvas.addEventListener("mouseup", handleMouseEvent);
    canvas.addEventListener("mouseout", handleMouseEvent);
}

function getColor(btn) {
    globalCompositeOperation = 'source-over';
    lineWidth = 2;
    switch (btn.getAttribute('data-color')) {
        case "green":
            fillStyle = "green";
            break;
        case "blue":
            fillStyle = "blue";
            break;
        case "red":
            fillStyle = "red";
            break;
        case "yellow":
            fillStyle = "yellow";
            break;
        case "orange":
            fillStyle = "orange";
            break;
        case "black":
            fillStyle = "black";
            break;
        case "eraser":
            globalCompositeOperation = 'destination-out';
            fillStyle = "rgba(0,0,0,1)";
            lineWidth = 14;
            break;
    }

}

function draw(dot) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.globalCompositeOperation = globalCompositeOperation;
    if (dot) {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(currX, currY, 2, 2);
    } else {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = fillStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
    ctx.closePath();
}

function erase() {
    if (confirm("Want to clear")) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    canvas.style.border = "2px solid";
    canvasimg.width = canvas.width;
    canvasimg.height = canvas.height;
    var ctx2 = canvasimg.getContext("2d");
    ctx2.drawImage(canvas, 0, 0);
    finalImg.src = canvasimg.toDataURL();
    finalImg.style.display = "inline";
}


function showCoords(event) {
    //console.log(event);
    var x = event.clientX;
    var y = event.clientY;
    document.getElementById("mouse_position").innerHTML = x + ", " + y;
}

function clearCoor(event) {
    //console.log(event);
    document.getElementById("mouse_position").innerHTML = "";
}

function handleMouseEvent(e) {
    if (e.type === 'mousedown') {
        prevX = currX;
        prevY = currY;
        currX = e.offsetX;
        currY = e.offsetY;
        mouseClicked = true;
        draw(true);
    }
    if (e.type === 'mouseup' || e.type === "mouseout") {
        mouseClicked = false;
    }
    if (e.type === 'mousemove') {
        if (mouseClicked) {
            prevX = currX;
            prevY = currY;
            currX = e.offsetX;
            currY = e.offsetY;
            draw();
        }
    }
}