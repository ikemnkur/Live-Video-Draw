let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let canvasH = document.getElementById('canvasHUD');
let ctx = canvas.getContext('2d');
let ctxH = canvasH.getContext('2d');

let colorPicker = document.getElementById('color-picker');
let strokeSizeSlider = document.getElementById('stroke-size');
let clearButton = document.getElementById('clear');
let modeSelect = document.getElementById('mode');

let showEraser = false;

let coordinatesDisplay = document.getElementById('coordinates');
let mode = 'draw';

let textEditor = document.getElementById('TextEditor');
let textCanvas = document.getElementById('textCanvas');
let textCtx = textCanvas.getContext('2d');
let textInput = document.getElementById('textInput');
let fontSelector = document.getElementById('fontSelector');
let fontSizeSelector = document.getElementById('fontSize');



// const fs = require('fs');

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
        video.srcObject = stream;
        video.addEventListener('play', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvasH.width = video.videoWidth;
            canvasH.height = video.videoHeight;
            textCanvas.width = video.videoWidth;
            textCanvas.height = video.videoHeight;
        });
    })
    .catch((err) => {
        console.error("Error accessing media devices.", err);
    });

let drawing = false;
let x = 0;
let y = 0;

// Canvas HUD elements

canvasH.addEventListener('mousedown', (e) => {
    showEraser = true;
    console.log("showEraser: ", showEraser);

    x = e.offsetX;
    y = e.offsetY;
    drawing = true;
});

canvasH.addEventListener('mousemove', (e) => {
    if (drawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }

    // Display the mouse coordinates.
    coordinatesDisplay.innerText = `${e.offsetX}, ${e.offsetY}`;

    // Render the eraser square if the mode is not 'draw'.
    if (modeSelect.value === 'erase') {
        renderEraserSquare(e.offsetX, e.offsetY);
    }
});

canvasH.addEventListener('mouseup', (e) => {
    showEraser = false;
    console.log("showEraser: ", showEraser);

    if (drawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        drawing = false;
    }
});

// Main Canvas

canvas.addEventListener('mousedown', (e) => {
    x = e.offsetX;
    y = e.offsetY;
    drawing = true;
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }

    // Display the mouse coordinates.
    coordinatesDisplay.innerText = `${e.offsetX}, ${e.offsetY}`;

    // // Render the eraser square if the mode is not 'draw'.
    // if (modeSelect.value === 'erase') {
    //     renderEraserSquare(e.offsetX, e.offsetY);
    // }
});

canvas.addEventListener('mouseup', (e) => {
    if (drawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        drawing = false;
    }
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// MODE SELECTOR

modeSelect.addEventListener('change', (e) => {
    mode = e.target.value;
    ctxH.clearRect(0, 0, canvas.width, canvas.height);
    var StrokeSizeEditor = document.getElementById('StrokeSizeEditor');
    var ColorEditor = document.getElementById('ColorEditor');

    if (mode === 'draw') {
        canvas.style.cursor = 'crosshair';
        canvasH.style.display = 'none';
        textCanvas.style.display = 'none';
        ColorEditor.style.display = 'block';

    } else if (mode === 'text') {
        textCanvas.style.cursor = 'move';
        canvasH.style.display = 'none';
        textCanvas.style.display = 'block';
        ColorEditor.style.display = 'block';
        StrokeSizeEditor.style.display = 'none';
    } else if (mode === 'erase') {
        canvasH.style.cursor = 'none';
        canvasH.style.display = 'block';
        textCanvas.style.display = 'none';
        ColorEditor.style.display = 'none';
    }

    if (mode === 'text') {
        textEditor.style.display = 'block';
    } else {
        textEditor.style.display = 'none';
        textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    }

    if (mode === 'addMedia') {
        mediaContainer.style.display = 'block';
    } else {
        mediaContainer.style.display = 'none';
    }

});

function renderEraserSquare(x, y) {
    // if (showEraser == true) {
    let size = strokeSizeSlider.value * 2;
    ctxH.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(x - size / 2, y - size / 2, size, size);
    ctxH.save();
    ctxH.globalCompositeOperation = 'source-over';
    ctxH.fillStyle = 'white';
    ctxH.strokeStyle = 'black';
    ctxH.lineWidth = 1;
    ctxH.fillRect(x - size / 2, y - size / 2, size, size);
    ctxH.strokeRect(x - size / 2, y - size / 2, size, size);
    ctxH.restore();
    // }

}

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();

    if (modeSelect.value === 'draw') {
        context.strokeStyle = modeSelect.value === 'draw' ? colorPicker.value : '#FFFFFF';
        context.lineWidth = strokeSizeSlider.value;
        context.lineCap = "round";
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }
    if (modeSelect.value === 'erase') {
        // let radius = strokeSizeSlider.value;
        context.globalCompositeOperation = 'destination-out';
        let size = strokeSizeSlider.value * 2;
        context.fillRect(x2 - size / 2, y2 - size / 2, size, size);
        // context.arc(x2, y2, radius, 0, Math.PI * 2);
        context.fill();
    } else {
        // if (modeSelect.value === 'draw') {
        context.globalCompositeOperation = 'source-over';
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        // }
    }

    console.log("drawing line: ", modeSelect.value)

    context.closePath();

}

textInput.addEventListener('input', renderTextPreview);
fontSelector.addEventListener('change', renderTextPreview);
fontSizeSelector.addEventListener('change', renderTextPreview);
textCanvas.addEventListener('mousemove', (e) => {
    if (mode === 'text') {
        renderTextPreview(e);
    }
});
textCanvas.addEventListener('click', finalizeText);

function renderTextPreview(e) {
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    textCtx.font = `${fontSizeSelector.value}px ${fontSelector.value}`;
    textCtx.fillStyle = colorPicker.value;
    let x = e ? e.offsetX : textCanvas.width / 2;
    let y = e ? e.offsetY : textCanvas.height / 2;
    textCtx.fillText(textInput.value, x, y);
}

function finalizeText(e) {
    if (mode === 'text') {
        ctx.font = `${fontSizeSelector.value}px ${fontSelector.value}`;
        ctx.fillStyle = colorPicker.value;
        ctx.fillText(textInput.value, e.offsetX, e.offsetY);
        textInput.value = "";
        textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    }
}

let saveCanvasButton = document.getElementById('saveCanvas');
let saveScreenshotButton = document.getElementById('saveScreenshot');

saveCanvasButton.addEventListener('click', () => {
    let link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

saveScreenshotButton.addEventListener('click', () => {
    let temporaryCanvas = document.createElement('canvas');
    let temporaryCtx = temporaryCanvas.getContext('2d');

    temporaryCanvas.width = video.videoWidth;
    temporaryCanvas.height = video.videoHeight;

    // Draw the video frame to the temporary canvas.
    temporaryCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(canvas, 0, 0);

    // Now save this composite image.
    let link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = temporaryCanvas.toDataURL('image/png');
    link.click();
});

const mediaContainer = document.getElementById('mediaContainer');
const mediaTabs = document.querySelectorAll('.mediaTab');
const imageSettings = document.getElementById('imageSettings');
const audioVideoSettings = document.getElementById('audioVideoSettings');

mediaTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        mediaTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        if (this.dataset.tab === 'image') {
            imageSettings.style.display = 'block';
            audioVideoSettings.style.display = 'none';
        } else {
            audioVideoSettings.style.display = 'block';
            imageSettings.style.display = 'none';
        }

        tab.addEventListener('click', () => {
            mediaType = tab.dataset.tab;
        });
    });
});

const goButton = document.getElementById('goButton');
const searchBar = document.getElementById('searchBar');
const resultList = document.getElementById('mediaList');

let mediaType = 'image';

goButton.addEventListener('click', () => {
    if (searchBar.value.length > 2) {
        // const files = fs.readdirSync('./media/' + mediaType);


        console.log("files: " + files);
        resultList.innerHTML = ''; // Clear existing list
        files.forEach(file => {
            const listItem = document.createElement('div');
            listItem.textContent = file;
            listItem.style.border = '2px solid black';
            listItem.style.padding = '5px';
            listItem.style.margin = '3px';
            listItem.style.background = 'white';
            listItem.addEventListener('click', () => {
                document.querySelectorAll('#mediaContainer > div[style*="lightgrey"] > div').forEach(item => {
                    item.style.background = 'white';
                });
                listItem.style.background = 'lightblue';
            });
            resultList.appendChild(listItem);
        });

        // fetch(`/search?mediaType=${mediaType}&q=${searchBar.value}`)
        //     .then(response => response.json())
        //     .then(files => {
        //         resultList.innerHTML = ''; // Clear existing list
        //         files.forEach(file => {
        //             const listItem = document.createElement('div');
        //             listItem.textContent = file;
        //             listItem.style.border = '2px solid black';
        //             listItem.style.padding = '5px';
        //             listItem.style.margin = '3px';
        //             listItem.style.background = 'white';
        //             listItem.addEventListener('click', () => {
        //                 document.querySelectorAll('#mediaContainer > div[style*="lightgrey"] > div').forEach(item => {
        //                     item.style.background = 'white';
        //                 });
        //                 listItem.style.background = 'lightblue';
        //             });
        //             resultList.appendChild(listItem);
        //         });
        //     });
    }
});

// var images;
// var audios;
// var videos;

// var socket = io();

// socket.on('mediaList', function (Imgfiles, Sndfiles, Vidfiles) {

//     images = Imgfiles;
//     audios = Sndfiles;
//     videos = Vidfiles;

// });

// socket.emit('mediaList', data);


