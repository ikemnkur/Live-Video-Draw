let video = document.getElementById('video');

let videoCanvas = document.getElementById('videoCanvas');
let drawCanvas = document.getElementById('drawCanvas');
let eraseCanvas = document.getElementById('eraseCanvas');
let mediaCanvasFloat = document.getElementById('mediaCanvasFloat');
let mediaCanvas = document.getElementById('mediaCanvas');

let mcfCtx = mediaCanvas.getContext('2d')
let mediaCtx = mediaCanvas.getContext('2d');
var vcCTX = videoCanvas.getContext('2d');
let ctx = drawCanvas.getContext('2d');
let ctxH = eraseCanvas.getContext('2d');
let ctxMCF = eraseCanvas.getContext('2d');

let colorPicker = document.getElementById('color-picker');
let strokeSizeSlider = document.getElementById('stroke-size');
let clearButton = document.getElementById('clear');
let modeSelect = document.getElementById('mode');

let angleSlider = document.getElementById('angleSlider');
let sizeSlider = document.getElementById('sizeSlider');
let durationSlider = document.getElementById('durationSlider');
let offsetInput = document.getElementById('offsetDuration');
let volumeSlider = document.getElementById('volumeSlider');

let showEraser = false;
let ctxVal = false;

let coordinatesDisplay = document.getElementById('coordinates');
let coordinatesDisplay2 = document.getElementById('coordinates2');
// the art mode( draw, erase, add text, add media)
let mode = 'draw';
// mouse moving position
let mouseX = video.width / 2;
let mouseY = video.height / 2;
// mosue down position
let mouseX2 = 320//video.width / 2;
let mouseY2 = 240//video.height / 2;

let textEditor = document.getElementById('TextEditor');
let textCanvas = document.getElementById('textCanvas');
let textCtx = textCanvas.getContext('2d');
let textInput = document.getElementById('textInput');
let fontSelector = document.getElementById('fontSelector');
let fontType = document.getElementById('fontType');
let fontSizeSelector = document.getElementById('fontSize');
let textAngleSlider = document.getElementById('textAngleSlider');
let textAngleValue = document.getElementById('textAngleValue');


let mediaLink = '';
var base_video = document.getElementById('base_video');

let size = 1;
let angle = 0;
let time = 0;

var audioLibrary = []
var imageLibrary = []
var videoLibrary = []

var interval = setInterval(() => {
    time++;
    if (time > 99) time = 0;
}, 50);

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
        video.srcObject = stream;
        video.addEventListener('play', () => {
            drawCanvas.width = video.videoWidth;
            drawCanvas.height = video.videoHeight;
            eraseCanvas.width = video.videoWidth;
            eraseCanvas.height = video.videoHeight;
            textCanvas.width = video.videoWidth;
            textCanvas.height = video.videoHeight;
            videoCanvas.width = video.videoWidth;
            videoCanvas.height = video.videoHeight;
            mediaCanvas.width = video.videoWidth;
            mediaCanvas.height = video.videoHeight;
        });
        video.addEventListener('play', function () {
            var $this = this; //cache
            (function loop() {
                if (!$this.paused && !$this.ended) {
                    vcCTX.drawImage($this, 0, 0);
                    setTimeout(loop, 1000 / 30); // drawing at 30fps
                }
            })();
        }, 0);
    })
    .catch((err) => {
        console.error("Error accessing media devices.", err);
    });

let drawing = false;
let x = 0;
let y = 0;

// Canvas HUD elements

eraseCanvas.addEventListener('mousedown', (e) => {
    showEraser = true;
    console.log("showEraser: ", showEraser);

    x = e.offsetX;
    y = e.offsetY;
    drawing = true;
});

eraseCanvas.addEventListener('mousemove', (e) => {
    if (drawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }

    // Display the mouse coordinates.
    coordinatesDisplay.innerText = `${e.offsetX}, ${e.offsetY}`;
    mouseX = e.offsetX;
    mouseY = e.offsetY;

    // Render the eraser square if the mode is not 'draw'.
    if (modeSelect.value === 'erase') {
        renderEraserSquare(e.offsetX, e.offsetY);
    }
});

eraseCanvas.addEventListener('mouseup', (e) => {
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

drawCanvas.addEventListener('mousedown', (e) => {
    x = e.offsetX;
    y = e.offsetY;
    drawing = true;
});

drawCanvas.addEventListener('mousemove', (e) => {
    if (drawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }

    // Display the mouse coordinates.
    coordinatesDisplay.innerText = `${e.offsetX}, ${e.offsetY}`;
    mouseX = e.offsetX;
    mouseY = e.offsetY;

});

drawCanvas.addEventListener('mouseup', (e) => {
    if (drawing === true) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        drawing = false;
    }
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
});

// angleSlider.addEventListener('onchange', () => {
//     angle = angleSlider.value;
//     document.getElementById('angleValue').value = angle + " deg"
// });

// sizeSlider.addEventListener('input', () => {
//     // size = e.target.value/100;
//     size = sizeSlider.value/100;
//     document.getElementById('sizeValue').value = size + "%"
// });


// MODE SELECTOR

modeSelect.addEventListener('change', (e) => {

    mode = e.target.value;
    ctxH.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    var StrokeSizeEditor = document.getElementById('StrokeSizeEditor');
    var ColorEditor = document.getElementById('ColorEditor');

    if (mode === 'draw') {
        drawCanvas.style.cursor = 'crosshair';
        eraseCanvas.style.display = 'none';
        textCanvas.style.display = 'none';
        ColorEditor.style.display = 'block';
        StrokeSizeEditor.style.display = 'block';
    }

    if (mode === 'erase') {
        eraseCanvas.style.cursor = 'none';
        eraseCanvas.style.display = 'block';
        textCanvas.style.display = 'none';
        ColorEditor.style.display = 'none';
        StrokeSizeEditor.style.display = 'block';
    } else {
        eraseCanvas.style.display = 'none';
    }

    if (mode === 'text') {
        textCanvas.style.cursor = 'move';
        eraseCanvas.style.display = 'none';
        textCanvas.style.display = 'block';
        ColorEditor.style.display = 'block';
        StrokeSizeEditor.style.display = 'none';
        textEditor.style.display = 'block';
        document.getElementById("textAngleSlider").style.display = 'block';
    } else {
        textEditor.style.display = 'none';
        textCanvas.style.display = 'none';
        textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        document.getElementById("textAngleSlider").style.display = 'none';
    }

    if (mode === 'addMedia') {
        mediaContainer.style.display = 'block';
        mediaCanvas.style.display = 'block';
        mediaCanvas.style.cursor = 'move';
        ColorEditor.style.display = 'none';
        StrokeSizeEditor.style.display = 'none';
    } else {
        mediaContainer.style.display = 'none';
        mediaCanvas.style.display = 'none';
        mediaCanvas.style.cursor = 'regular';
    }

});

// Draw the eraser square

function renderEraserSquare(x, y) {
    // if (showEraser == true) {
    let size = strokeSizeSlider.value * 2;
    ctxH.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
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

// Draw the line

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

// Text Editior

textInput.addEventListener('input', renderTextPreview);
fontSelector.addEventListener('change', renderTextPreview);
fontType.addEventListener('change', renderTextPreview);
fontSizeSelector.addEventListener('change', renderTextPreview);

// ---------------mouse move event listener

textCanvas.addEventListener('mousemove', (e) => {
    if (mode === 'text') {
        renderTextPreview(e);
        // Display the mouse coordinates.
        coordinatesDisplay.innerText = `${e.offsetX}, ${e.offsetY}`;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
});

// ----------Angle Slider control

textCanvas.addEventListener('click', finalizeText);
textAngleSlider.addEventListener('input', () => {
    textAngleValue.value = textAngleSlider.value;
});
textAngleValue.addEventListener('input', () => {
    textAngleSlider.value = textAngleValue.value;
});

// -----------rendering the text in real time at mouse position

function renderTextPreview(e) {
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    textCtx.font = `${fontType.value} ${fontSizeSelector.value}px ${fontSelector.value}`;
    textCtx.fillStyle = colorPicker.value;
    let x = e ? e.offsetX : textCanvas.width / 2;
    let y = e ? e.offsetY : textCanvas.height / 2;
    let angle = textAngleSlider.value;
    textCtx.save(); //save the state of canvas
    textCtx.translate(x, y); //let's translate
    textCtx.rotate(angle * Math.PI / 180)
    textCtx.translate(-x, -y); //let's translate
    textCtx.fillText(textInput.value, x, y);
    textCtx.restore(); //restore the state of canvas
    // textCtx.rotate(-angle * Math.PI / 180)
    // textAngleValue.innerText = textAngleSlider.value;
}

// -------print the text to the main canvas

function finalizeText(e) {
    if (mode === 'text') {
        let angle = textAngleSlider.value;
        ctx.font = `${fontType.value} ${fontSizeSelector.value}px ${fontSelector.value}`;
        ctx.fillStyle = colorPicker.value;

        let x = e ? e.offsetX : textCanvas.width / 2;
        let y = e ? e.offsetY : textCanvas.height / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-x, -y);
        ctx.fillText(textInput.value, e.offsetX, e.offsetY);
        textInput.value = "";
        textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        ctx.restore();
    }
}

// Image Media Editor

mediaCanvas.addEventListener('mousemove', (e) => {
    if (mode === 'addMedia') {
        // renderImagePreview();
        // Display the mouse coordinates.
        coordinatesDisplay.innerText = `${e.offsetX}, ${e.offsetY}`;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
});

let moveMedia = false;

// Click the canvas to move the Image to the mouse position
mediaCanvas.addEventListener('mousedown', (e) => {
    if (mode === 'addMedia') {

        console.log("Mousedown");
        moveMedia = true;

        mediaCanvas.addEventListener('mousemove', (e) => {
            if (moveMedia)
                moveDMedia(e);
        });

        function moveDMedia(e) {
            mouseX2 = e.offsetX;
            mouseY2 = e.offsetY;
            // renderImagePreview();
            coordinatesDisplay2.innerText = `${e.offsetX}, ${e.offsetY}`;
            console.log("Moveing Media");
        }

        mediaCanvas.addEventListener('mouseup', (e) => {
            moveMedia = false;
            console.log("Mouseup");
        });

    }
});

let doneBtn = document.getElementById('doneBtn');
doneBtn.addEventListener('click', finalizeImage);
let sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', () => {
    ctxVal = !ctxVal
    if (ctxVal)
        sendBtn.style.background = "lightblue";
    else
        sendBtn.style.background = "lightgrey";
});

function renderImagePreview() {
    if (mediaLink != "") {
        // draw the media object
        if (mediaType === 'image') {
            mediaCtx.clearRect(0, 0, mediaCanvas.width, mediaCanvas.height);
            // textCtx.font = `${fontType.value} ${fontSizeSelector.value}px ${fontSelector.value}`;
            // textCtx.fillStyle = colorPicker.value;
            // let x = e ? e.offsetX : mediaCanvas.width / 2;
            // let y = e ? e.offsetY : mediaCanvas.height / 2;

            base_image = new Image();
            base_image.src = './media/image/' + mediaLink;
            let sSize = sizeSlider.value;
            let angle = angleSlider.value;
            let width = sSize / 100 * base_image.width;
            let height = sSize / 100 * base_image.height;

            // translate and rotate the canvas so that the image is centered
            mediaCtx.save();
            mediaCtx.translate(mouseX2, mouseY2);
            mediaCtx.rotate(angle * Math.PI / 180);
            mediaCtx.translate(-mouseX2, -mouseY2);

            // draw the "edit image" background behind the media object
            if (Math.floor(time / 10) % 2) mediaCtx.strokeStyle = '#ff0000';
            else mediaCtx.strokeStyle = '#000000';
            mediaCtx.globalAlpha = .4;
            mediaCtx.shadowColor = "#d53";
            mediaCtx.shadowBlur = 20;
            mediaCtx.lineJoin = "round";
            mediaCtx.lineWidth = 5;
            // mediaCtx.strokeStyle = "#38f";
            mediaCtx.strokeRect((mouseX2 - width / 2), (mouseY2 - height / 2), width, height);
            mediaCtx.globalAlpha = 1;

            // draw the image
            mediaCtx.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
            mediaCtx.restore();
        }
        if (mediaType === 'audio') {
            mediaCtx.clearRect(0, 0, mediaCanvas.width, mediaCanvas.height);
            base_image = new Image();
            base_image.src = './media/image/soundIcon.png';
            let sSize = sizeSlider.value;
            let angle = angleSlider.value;
            let width = sSize / 100 * base_image.width;
            let height = sSize / 100 * base_image.height;
            // mediaCtx.rotate(angle * Math.PI / 180);
            mediaCtx.save();
            mediaCtx.translate(mouseX2, mouseY2);
            mediaCtx.rotate(angle * Math.PI / 180);
            mediaCtx.translate(-mouseX2, -mouseY2);

            // draw the "edit image" background behind the media object
            if (Math.floor(time / 10) % 2) mediaCtx.strokeStyle = '#ff0000';
            else mediaCtx.strokeStyle = '#000000';
            mediaCtx.globalAlpha = .4;
            mediaCtx.shadowColor = "#d53";
            mediaCtx.shadowBlur = 20;
            mediaCtx.lineJoin = "round";
            mediaCtx.lineWidth = 5;
            // mediaCtx.strokeStyle = "#38f";
            mediaCtx.strokeRect((mouseX2 - width / 2) - 7, (mouseY2 - height / 2) - 7, width + 7, height + 7);
            mediaCtx.globalAlpha = 1;
            mediaCtx.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);

            // mediaCtx.rotate(-angle * Math.PI / 180);
            mediaCtx.restore();
        }
        if (mediaType === 'video') {

            var base_video = document.getElementById('base_video');

            base_video.addEventListener("ended", () => {
                // if (base_video.playing) { // checks if element is playing right now
                //     // Do anything you want to
                //     if (base_video.ended)
                //         base_video.play();
                // } else {
                //     base_video.play();
                // }
                // let loop = document.getElementById('medialoop').checked
                // if (loop) {
                base_video.play();
                // console.log("replaying video")
                // }
            });
        }
    }
}

function drawVideo() {
    var base_video = document.getElementById('base_video');
    base_video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                angle = angleSlider.value
                // mediaCanvas.drawImage($this, 0, 0);
                let width = sizeSlider.value / 100 * 640;
                let height = sizeSlider.value / 100 * 480;
                mediaCtx.clearRect(0, 0, mediaCanvas.width, mediaCanvas.height);
                // mediaCtx.drawImage($this, 0, 0, 120, 80);
                mediaCtx.save();
                mediaCtx.translate(mouseX2, mouseY2);
                mediaCtx.rotate(angle * Math.PI / 180);
                mediaCtx.translate(-mouseX2, -mouseY2);

                // draw the "edit image" background behind the media object
                if (Math.floor(time / 10) % 2)
                    mediaCtx.fillStyle = '#ff0000';
                else
                    mediaCtx.fillStyle = '#000000';

                mediaCtx.globalAlpha = .4;
                mediaCtx.fillRect((mouseX2 - width / 2) - 3, (mouseY2 - height / 2) - 3, width + 6, height + 6);
                mediaCtx.fill();
                mediaCtx.globalAlpha = 1;

                mediaCtx.drawImage($this, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
                mediaCtx.restore();
                if (mediaType === 'video')
                    setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);
}
//update media canvas preview
setInterval(() => {
    renderImagePreview();
}, 1000 / 30)

function finalizeImage(e) {
    if (mode === 'addMedia') {
        if (mediaType === 'image') {
            mediaCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
            base_image = new Image();
            base_image.src = './media/image/' + mediaLink;

            // let x = e ? e.offsetX : mediaCanvas.width / 2;
            // let y = e ? e.offsetY : mediaCanvas.height / 2;

            let sSize = sizeSlider.value;
            let angle = angleSlider.value;
            let width = sSize / 100 * base_image.width;
            let height = sSize / 100 * base_image.height;

            // // pick the right canvas to draw on
            // let ctx
            // if (ctxVal == false)
            //     ctx = drawCanvas.getContext("2d");
            // else
            //     ctx = mediaCanvasFloat.getContext("2d");

            ctx.save();
            ctx.translate(mouseX2, mouseY2);
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-mouseX2, -mouseY2);
            ctx.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
            ctx.restore();

            clearMediaPreviewDiv();

            // clear the drawn image on the canvas after timeVal seconds
            // clearMediaAfterTimeout(ctx, width, height);
        }

        if (mediaType === 'audio') {
            mediaCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
            base_image = new Image();
            base_image.src = './media/image/soundIcon.png';

            let sSize = sizeSlider.value;
            let angle = angleSlider.value;
            let width = sSize / 100 * 128;
            let height = sSize / 100 * 128;

            //Draw sound icon
            mcfCtx.save();
            mcfCtx.translate(mouseX2, mouseY2);
            mcfCtx.rotate(angle * Math.PI / 180);
            mcfCtx.translate(-mouseX2, -mouseY2);
            mcfCtx.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
            font = `12px ${fontSelector.value}`;
            mcfCtx.fillText(mediaLink, e.offsetX, e.offsetY);
            mcfCtx.restore();

            var sound = new Audio();
            sound.src = './media/audio/' + mediaLink;
            sound.play()

            clearMediaPreviewDiv();
            // clear the drawn sound icon off the canvas after timeVal seconds
            // clearMediaAfterTimeout(mediaCtx, width, height)

        }
    }
}

function clearMediaAfterTimeout(ctx, width, height) {
    var timeValue = document.getElementById('timeValue').value;
    let val = parseInt(timeValue);
    if (val == "") {
        val = 5;
    }
    setTimeout(function () {
        console.log('clearMediaAfterTimeout: ', val);
        ctx.clearRect(mouseX2 - width / 2, mouseY2 - height / 2, width, height);
    }, val * 1000)
}

function clearMediaPreviewDiv() {
    // Clear all the image in the display div
    // let mediaDisplay = document.getElementById('mediaDisplay');
    // while (mediaDisplay.hasChildNodes()) {
    //     mediaDisplay.removeChild(mediaDisplay.firstChild);
    // }
    document.querySelectorAll('#list').forEach(item => {
        item.style.background = '';
    });
    mediaLink = "";
}

// Dyanamic Labels, updates the slider's text in real-time

let sizeValue = document.getElementById('sizeValue');
sizeSlider.addEventListener('input', () => {
    sizeValue.value = sizeSlider.value;
    renderImagePreview();
});
sizeValue.addEventListener('input', () => {
    sizeSlider.value = sizeValue.value;
    renderImagePreview();
});

let angleValue = document.getElementById('angleValue');
angleSlider.addEventListener('input', () => {
    angleValue.value = angleSlider.value;
    renderImagePreview();
});
angleValue.addEventListener('input', () => {
    angleSlider.value = angleValue.value;
    renderImagePreview();
});

// let volumeValue = document.getElementById('volumeValue');
// volumeSlider.addEventListener('input', () => {
//     volumeValue.value = volumeSlider.value;
// });
// volumeValue.addEventListener('input', () => {
//     volumeSlider.value = volumeValue.value;
// });

let mediaStartSlider = document.getElementById('mediaStart');
let mediaStartValue = document.getElementById('mediaStartValue');
mediaStartSlider.addEventListener('input', () => {
    mediaStartValue.innerText = mediaStartSlider.value;
});
mediaStartValue.addEventListener('input', () => {
    mediaStartSlider.value = mediaStartValue.value;
});

let mediaStopSlider = document.getElementById('mediaStop');
let mediaStopValue = document.getElementById('mediaStopValue');
mediaStopSlider.addEventListener('input', () => {
    mediaStopValue.innerText = mediaStopSlider.value;
});
mediaStopValue.addEventListener('input', () => {
    mediaStopSlider.value = mediaStopValue.value;
});

// Media search Buttons

const mediaContainer = document.getElementById('mediaContainer');
const mediaTabs = document.querySelectorAll('.mediaTab');
const imageSettings = document.getElementById('imageSettings');
const audioVideoSettings = document.getElementById('audioVideoSettings');

// Media search Buttons

const imageBtn = document.getElementById('imageBtn');
const audioBtn = document.getElementById('audioBtn');
const videoBtn = document.getElementById('videoBtn');
let mediaSearchText = document.getElementById('mediaSearchType');

imageBtn.addEventListener('click', () => {
    mediaType = 'image';
    mediaSearchText.innerText = 'Image';
    imageSettings.style.display = 'block';
    audioVideoSettings.style.display = 'none';
    document.getElementById('timeDiv').style.display = 'block'
    search4Media();
});

videoBtn.addEventListener('click', () => {
    mediaType = 'video';
    mediaSearchText.innerText = 'Video';
    imageSettings.style.display = 'block';
    document.getElementById('base_audio').style.display = 'none'
    audioVideoSettings.style.display = 'block';
    document.getElementById('timeDiv').style.display = 'none'
    search4Media();
});

audioBtn.addEventListener('click', () => {
    mediaType = 'audio';
    mediaSearchText.innerText = 'Audio';
    audioVideoSettings.style.display = 'block';
    document.getElementById('base_audio').style.display = 'block'
    document.getElementById('timeDiv').style.display = 'none'
    search4Media();
});

mediaTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        mediaTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // if (this.dataset.tab === 'image') {
        //     imageSettings.style.display = 'block';
        //     audioVideoSettings.style.display = 'none';
        // } else if (this.dataset.tab === 'audio') {
        //     audioVideoSettings.style.display = 'block';
        //     imageSettings.style.display = 'block';
        // } else {
        //     audioVideoSettings.style.display = 'block';
        //     imageSettings.style.display = 'block';
        // }

        tab.addEventListener('click', () => {
            mediaType = tab.dataset.tab;
            console.log("searching for: " + mediaType + 's');
        });

    });
});

const goButton = document.getElementById('goButton');
const searchBar = document.getElementById('searchBar');
const resultList = document.getElementById('mediaList');

let mediaType = 'image';

function search4Media() {
    if (searchBar.value.length > 2) {
        let files = images;
        if (mediaType == 'image') {
            if (libraryMode.checked) {
                files = imageLibrary;
            } else {
                files = images;
            }
        }
        if (mediaType == 'audio') {
            files = audio;
        }
        if (mediaType == 'video') {
            files = videos;
        }


        search = searchBar.value;
        search = search.toLowerCase();

        let x = files;
        var matches = [];
        // console.log("searching for: ", search, " in ", fullImgList);
        for (i = 0; i < x.length; i++) {
            if (x[i].toLowerCase().includes(search)) {
                // x[i].style.display = "none";
                matches.push(x[i]);
                // x[i].style.display = "";
            }
        }

        console.log("Matching Search Results: ", matches)
        // Clear existing list
        resultList.innerHTML = '';
        matches.forEach(file => {
            if (mediaType == 'video') {
                let videoPreview = document.createElement('video');
                videoPreview.id = "list";
                videoPreview.clicked = false;

                videoPreview.style.borderRadius = '3px';
                videoPreview.style.padding = '3px';
                videoPreview.style.margin = '3px';
                mediaLink = file;

                videoPreview.src = "./media/video/" + mediaLink;
                videoPreview.height = 64;
                videoPreview.width = 96;
                videoPreview.play();

                videoPreview.addEventListener('click', () => {
                    var base_video = document.getElementById('base_video');

                    document.querySelectorAll('#list').forEach(item => {
                        item.style.background = 'white';
                    });

                    if (videoPreview.clicked == true) {
                        videoPreview.style.background = 'white';
                        mediaLink = "";
                        videoPreview.clicked = false;
                        base_video.src = "./media/video/testdummy.mp4";
                    }
                    else {
                        videoPreview.style.background = 'lightblue';
                        mediaLink = file;
                        videoPreview.clicked = true;
                        if (mediaType == 'video') {
                            base_video.src = `./media/video/${mediaLink}`;
                            base_video.play();
                            let width = parseInt(sizeSlider.value) / 100 * 640;
                            let height = parseInt(sizeSlider.value) / 100 * 480;
                            console.log("Dimensions: (" + width + "," + height + ")");
                            drawVideo()
                        }
                    }

                });

                resultList.appendChild(videoPreview);
            }

            if (mediaType == 'audio') {
                let listItem = document.createElement('div');
                if (file.length > 30) {
                    listItem = document.createElement('marquee');
                }
                listItem.id = "list";
                listItem.clicked = false;
                listItem.textContent = file;
                listItem.style.border = '2px solid black';
                listItem.style.padding = '5px';
                listItem.style.margin = '3px';
                listItem.style.background = 'white';
                listItem.addEventListener('click', () => {
                    var base_audio = document.getElementById('base_audio');
                    // var audio = new Audio();
                    if (listItem.clicked == true) {
                        listItem.style.background = 'white';
                        mediaLink = "";
                        listItem.clicked = false;
                        // base_audio.src = `./media/audio/${mediaLink}`;
                        document.querySelectorAll('#list').forEach(item => {
                            item.style.background = 'white';
                        });
                    }
                    else {
                        listItem.style.background = 'lightblue';
                        mediaLink = file;
                        listItem.clicked = true;
                        base_audio.src = `./media/audio/${mediaLink}`;
                        base_audio.play();
                    }
                });

                resultList.appendChild(listItem);
            }

            if (mediaType == 'image') {

                mediaLink = file;

                let thumbnail = new Image()
                thumbnail.src = "./media/image/" + mediaLink;
                thumbnail.height = 64;
                thumbnail.width = 64;
                thumbnail.id = "list";
                thumbnail.style.padding = '5px';
                thumbnail.style.margin = '3px';
                thumbnail.style.borderRadius = '3px';
                thumbnail.clicked = false;

                thumbnail.addEventListener('click', () => {
                    if (libraryMode.value) {
                        if (removeFromLibrary) {
                            // Search for the item to remove
                            const index = imageLibrary.indexOf(file);
                            // Remove the item
                            imageLibrary.splice(index, 1);
                            // delete the item from the screen/DOM
                            thumbnail.remove();
                        }
                    }
                    if (thumbnail.clicked == true) {
                        thumbnail.style.background = '';
                        mediaLink = "";
                        thumbnail.clicked = false;
                    }
                    else {
                        document.querySelectorAll('#list').forEach(item => {
                            item.style.background = '';
                        });
                        thumbnail.style.background = 'lightblue';
                        mediaLink = file;
                        thumbnail.clicked = true;
                    }
                });

                thumbnail.addEventListener('dblclick', () => {
                    var searchMode = document.getElementById('search').value
                    if (searchMode) {
                        thumbnail.style.background = 'lightgreen';
                        mediaLink = file;
                        thumbnail.clicked = true;
                        // if the file has not been loaded in to the library yet, then add it to the list
                        // var result = imageLibrary.find(item => item == file);
                        // if (result != null)
                        //     imageLibrary.push(file)
                        // 
                        imageLibrary.push(file)
                        var result = removeDuplicates(imageLibrary);
                        console.log("Library: " + result)
                    }
                });

                // add the item to the list in the media display div
                resultList.appendChild(thumbnail);
            }
            // if the media link is not empty, render the linked media to the canvas
            if (!(mediaLink == "")) {
                renderImagePreview()
            }
        });
    }
}


function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);;
}
// 

var removeFromLibrary = false;
var removeButton = document.getElementById('removeButton');
removeButton.addEventListener('click', () => {
    removeFromLibrary = !removeFromLibrary;
    if (removeFromLibrary)
        removeButton.style.background = "red"
    else
        removeButton.style.background = ""
    console.log(removeFromLibrary)
});

var searchMode = document.getElementById('search')
searchMode.addEventListener('click', () => {
    removeButton.style.display = 'none';
    search4Media();
});

var libraryMode = document.getElementById('library')
libraryMode.addEventListener('click', () => {
    removeButton.style.display = 'block';
    mediaList.innerHTML = '';
    search4Media();
});


// Execute a function when the user presses a key on the keyboard
searchBar.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        goButton.click();
    }
});

goButton.addEventListener('click', () => {
    search4Media();
});

var imagesStr = "108-1083789_cringe-discord-emoji-clipart-png-download-transparent-png.png,156-1560918_25-asusgayqueerhoe-emoji.png,300-3006223gay_ahegao-ahegao-discord-emoji-sus-nasty-queer-weird-dumb-hoeduckface.png,350549-fartpoopbootycheeksmiddle.png,392103110_ANGRY_EMOJI_mad_hot.gif,3dcrytearseyeswatersad.gif,4-44224_shrugging-discord-emoji unsure dontknow.png,62182-middle.png,aleinanimatedspaceufo.gif,alienemojispace.png,alienspaceetemoji.png,angry.gif,angrymaskfacered.png,animated-devil-emoji-mad-enemybad.gif,apng1.png,arabindianturkturbanmanmuslimislam.png,armflexmuslcesstrongbuff.png,armswolebuffmuscle.png,arrowheart.png,asianmansoldiergreenberet.png,babyboylittlekidyoung.png,bagmoneypursechange.png,ballegaysushomodance.png,ballon.png,bamboocliff.png,bang-bang-discord-emoji-fight-violence.gif,bathshowercleandirtynastywash.png,beaming_face_with_smiling_eyes_256_2.gif,beating-red-heart-emoji-doodle.gif,bikinibraclothes.png,blankfaceunimpressed.png,blastexplodepopbang.png,blouseshirtclothes.png,blowakisssmooch.png,blowkissemoji.png,boatshipcaptainpirateemoji.png,bracesemoji.png,brideandgroomweddingring.png,briefcaseworkoffice.png,britishsoldier.png,building24.png,buildingburgerking.png,buildingoffice.png,buzzeddazedhighstoned.gif,calculatormathschool.jpg,cameradslrphotoelectronic.png,cartoonramsheep.png,caterpillarbugnastyinsect.png,checkmarkgreen.png,chefcusinetasteyummyfoodcook.png,chefs-kiss-emoji-ac11f2imaqahmhf2.gif,chinaorientaldollculturemath.png,christmastree.png,claphandspray.png,clipart.png,cloudrainsnowweatherhail.png,clowncryiconemoji.webp,coinpursebag.png,colorrobotdisco.png,computermonitorkeyboard.png,confusedemoji.png,cooknigknifecutslicestab.png,coolemoji.png,coupleloveromance.png,cringefaceemoji.png,cringegrimmacestunnedemoji.png,cringepanicworryshame.png,critical thinking pressuresweat-discord-emoji.png,crownkingqueenprincess.png,cryemojisadtears.gif,crysadlmaoemoji.png,crystreamemoji.gif,crytearscrazy.gif,cryyawnemojibaby.png,cupidangelhalobodyholyheaven.png,cuthairemoji.png,dab-emoji-lookatmedancehiphoprap.gif,dancespanishbiala.png,demonvampireblood.png,devilemoji.png,devilemojievilbad.png,devilfacemaddemon.png,disappearfastcloudzoomvoosh.png,disappointmentcringeshamepity.png,disappointsadbummedfrownconfused.png,disgustboredshamecringe.png,dogcaninek9animal.png,dressclothesfashion.png,droolnastysillycuteemojisusqueerwierd.jpg,earsbodypart.png,easrtemojicreepy.gif,eggplantveggievegtablefruitd.png,elephant.jpg,Emoji-Psck (100).png,Emoji-Psck (101).png,Emoji-Psck (109).png,Emoji-Psck (110).png,Emoji-Psck (113).png,Emoji-Psck (115).png,Emoji-Psck (123).png,Emoji-Psck (128).png,Emoji-Psck (129).png,Emoji-Psck (130).png,Emoji-Psck (136).png,Emoji-Psck (151).png,Emoji-Psck (152).png,Emoji-Psck (153).png,Emoji-Psck (157).png,Emoji-Psck (158).png,Emoji-Psck (159).png,Emoji-Psck (184).png,Emoji-Psck (185).png,Emoji-Psck (186).png,Emoji-Psck (187).png,Emoji-Psck (188).png,Emoji-Psck (190).png,Emoji-Psck (191).png,Emoji-Psck (192).png,Emoji-Psck (193).png,Emoji-Psck (194).png,Emoji-Psck (229).png,Emoji-Psck (230).png,Emoji-Psck (231).png,Emoji-Psck (232).png,Emoji-Psck (233).png,Emoji-Psck (238).png,Emoji-Psck (254).png,Emoji-Psck (260).png,Emoji-Psck (264).png,Emoji-Psck (283).png,Emoji-Psck (284).png,Emoji-Psck (285).png,Emoji-Psck (287).png,Emoji-Psck (289).png,Emoji-Psck (31).png,Emoji-Psck (32).png,Emoji-Psck (42).png,Emoji-Psck (43).png,Emoji-Psck (47).png,Emoji-Psck (49).png,Emoji-Psck (50).png,Emoji-Psck (51).png,Emoji-Psck (52).png,Emoji-Psck (53).png,Emoji-Psck (54).png,Emoji-Psck (55).png,Emoji-Psck (56).png,Emoji-Psck (58).png,Emoji-Psck (59).png,Emoji-Psck (62).png,Emoji-Psck (66).png,Emoji-Psck (67).png,Emoji-Psck (70).png,Emoji-Psck (72).png,Emoji-Psck (73).png,Emoji-Psck (74).png,Emoji-Psck (77).png,Emoji-Psck (84).png,Emoji-Psck (86).png,Emoji-Psck (87).png,Emoji-Psck (88).png,Emoji-Psck (94).png,Emoji-Psck (95).png,Emoji-Psck (96).png,Emoji-Psck (97).png,Emoji-Psck (98).png,Emoji-Psck (99).png,emoji-violet-demonevildevil.gif,emojis-music-beatstypedropsoundraprockemotraphiphopcountrygospelpop.gif,eyesfacesballs.png,familymomdadkid.png,feetprints.png,fistbump.png,foodcheeseburger.png,foodhamcheseburger.png,gaydudes.png,gemdiamond.png,giftboxpresentbirthday.png,gimmedatneckthoyoulooked.png,glasses.png,globespinearth.gif,goofiefaceslily.png,goofyemoji.png,goofypunksilly.png,graduationcapcollegeuniversityclasses.png,haertbroken.png,hairbarbershop.png,hairdress.jpg,haloangle.png,halogoodangle.png,handclap.png,handpeacesignsfingers.png,happyemoji.png,happygleepleasure.png,happygrinsmile.png,happyhandshug.png,happythumbsup.png,hatgarden1960lady1950.png,healthhospital.png,heartgift.png,heartshape.png,hellasussweatythristywierd.jpg,highheelbootshoe.png,highheelshoe.png,hijabmuslimterroristwoman.png,hoeemojihotcutethot.png,hospitalbluiding.png,hotfireburnroast.png,hotheatthristy_spicy_fuego.gif,hot_face_256_tired-thristy-wantswater.gif,househomerent.png,How-Many-Upvotes.gif,huhconfused unclear puzzled strange question emoji.png,hunteatangrycat.png,images.txt,inloveemoji.png,iphonecalltextsmart.png,katanaswordmacheteharamexcutionsepukustabcutbeheaddieviolence.png,kawaiicatcuteplushie.png,kingqueencrown.png,kisslips.png,kisspng-smiley-discord-emoji-slack-emote-emoji-discord-android.jpg,kisspng-smiley-emoticon-animated-film-gif-5b2d0e1228e7e0.6245992415296793781676.jpg,kittenshocked.png,knifegunthuggangstermafiadumbhoodbangdieviolence.png,laughfunnyemojitears.png,laughmadcrazyinsanedanger.png,laughsmiletoungueout.png,laughtearsineye.png,laughwithtearsineyes.gif,lesbiancouple.png,liftedhadpraised.png,lightbulbelectricity.png,lipskissbbllipjobrhinoplastybotoxfillers.png,lockedsecuresafeprivate.png,love-cute-aww-peace-hug-trucemakeup_clear.gif,loveflowersemoji.png,lovehappyhug.gif,loveheartcircle.png,lovemailletter.png,lying-face_pinociho.png,magictricktophat.png,makeuplipstick.png,maskcovidvirusgermsbacteria.png,medichealth.png,messagecloudtxet.png,mind-blown-emoji-ng5fps7bt0pmdrmh.gif,mommasboykidsinglemotherblondiechildsupport.png,moneybag$.png,moneyflywingscash.png,moneyman.png,moneyrollingincashdollarsigneyes.gif,monkeyanimal.png,monkeyfaceanimalzoo.png,nails-makeup-vaintityfairbeautyemoji.gif,nasty-ugh-emoji.png,nerdsmartgeekemoji.gif,no-emoji-way-sike.gif,noiseclap.png,nopeconsentnaheww.png,nosefacebody.png,number0.png,number1.png,number10.png,number2.png,number5.png,number6.png,number7.png,number8.png,number9.png,numer3.png,numer4.png,okaysign.png,okaysignhand.png,okaysignpunchfaceemojifightviolence.png,oldladywomanageboomerracistgrandma.png,oldmanelderracistboomerage.png,paintfingernails.png,pants.png,party_face_emoji_fun_birthday_cake_celebrate.gif,peaceokaymeditategoatee.png,peopleusers.png,periodtbiglipbeautyshoerachettrashnailsextensionbimbohood-middle.png,personuser.png,phewreliefemoji.png,pillmedicinedrugsillegal.png,pinatapartyballons.png,piratehatemojithinking.png,playercoolfancyswaghardfresh.png,playlordjesusworshipholybiblegod.png,plussign.png,pointedhand.png,pointhandfinger.png,pointupanddown.png,pokerfaceeyeblankface.png,policelawjailcops.png,poopcrapstinkyshitdumpdookiechoclate.png,profilepic.png,profilepicother.png,puckerkissface.png,pumpkinscaryhalloween.png,queenwhiteblondgirlprincess.png,raindrops.png,realhandokaysignpowerupwhite.png,ringdiamondgem.png,robotemoji.png,robotIcon.png,romancestraight.png,runfearchasethristyfastquickpredatorprey.png,saddepressed.png,sadsunkedheaddepressed.png,santahohochristmas.png,satisfiedfinerelief.png,scarfclothescold.png,school.png,schoolbackpack.png,shamecringe-discord-emoji-embrass-emojis.png,shirttiesuitclothes.png,shockeddead.png,shockedemojistunned.png,shockedsuprised.png,shoefancyhighheelred.png,shoeleatherchurchformal.png,shoesjordannikehoopsports.png,shootingstarspaceorbit.png,sick vomit.gif,sickillvirusemoji.png,skullheaddeademoji.png,sleepboringsnoringzzz.png,smack face hit stung kiss puckeremoji-in-the-store-com-emojis.png,smartgeeknerdemoji.png,smilegun-discord-emoji-evil-violencedanger.png,smiley-emoji.gif,smiley.gif,smokethoughthughoodbuffbeastmacho.gif,smokeweeddrugpackopsdead.png,smoochkissemoji.png,soundIcon.png,spinningglobeicon.gif,stankyfartsmell.png,starcirclesconcussion.png,sticktongue.png,stonepizza.jpg,straightcouplerelatationship.png,stunnedshockfrozen.png,suicidegunviolenceemoji-cringe-die.png,sweatconcernedpuzzled.png,tanktopshirtclothes.png,tearcrysadfrown.png,teasetauntsillyemoji.png,thinking-emoji-30.webp,thonk-custom-emojis-for-discord-115629712990osoaio11m.png,thoughbuffsmokenose.png,thoughtbubblecloud.png,throwup-vomit-sick-nasty-gross-eww.gif,thumbsdown.png,thumbsupemoji.png,thumbup.png,tie.png,tongueout.png,toungesillyface.png,treeandhouse.png,tshirtbasicpoloclothes.png,tunicasianjapanchina.png,twerk-emojisusgayqueerbigbooty.gif,twirlhandsovertheheaddance.png,umbrellarainweather.png,unlockedopenunsecure.png,vacc.png,vomitemojisickill.png,vomiting-ill-sick-gross-nasty.gif,walkbumsadnerdshooterhipplainsuccess.png,waterdropsrain.png,weepmoancryemoji-nooooo.png,whiteboyblondblueeyes.png,widehappyopensmille.png,widesmileemoji.png,winkfaceemoji.png,worryconcernwatchprayshock.png,zzzzsleeptiredboring.png";
var images = imagesStr.split(",");
var audiosStr = "100115__noisecollector__raw_cat_vomiting.mp3,104920__ekokubza123__punch-remake.wav,162763__unfa__applause-4.flac,172490__geroglp__slap.mp3,216197__rsilveira_88__cartoon_punch_03.wav,216781__castironcarousel__punch-4.aiff,239594__xtrgamr__unimpressedyay_01.wav,246303__vikuserro__mad-dude.wav,246304__vikuserro__ey-shouting.wav,246305__vikuserro__excited.wav,246306__vikuserro__aroused.wav,246307__vikuserro__yes-decisive.wav,246308__vikuserro__vomiting.wav,246309__vikuserro__sadness.wav,246310__vikuserro__meh-vocal.wav,255540__xtrgamr__sarcastic-clapping.wav,257780__xtrgamr__man-oof.wav,277022__sandermotions__applause-1.wav,317382__tobiaskosmos__slap-to-the-face.wav,341011__vikuserro__ouch.wav,341012__vikuserro__yawning-just-woke-up.wav,341013__vikuserro__duck-dies.wav,341014__vikuserro__chainsaw.wav,341015__vikuserro__dog-hit.wav,341016__vikuserro__cleaning-teeth.wav,341017__vikuserro__chainsaw-ii.wav,341018__vikuserro__barking-2.wav,341019__vikuserro__go-away-bitch.wav,341020__vikuserro__dragon-sound.wav,341031__vikuserro__yahoo-jump.wav,341032__vikuserro__yeb-hitting.wav,341033__vikuserro__oh-no.wav,341034__vikuserro__mniam-mniam-hungry.wav,341035__vikuserro__hop-jump.wav,341036__vikuserro__hehehe-laughter.wav,341037__vikuserro__snooty-teen.wav,341038__vikuserro__sneezing.wav,341039__vikuserro__whiny-female.wav,341040__vikuserro__mad-father.wav,341041__vikuserro__dog-stimulation.wav,341042__vikuserro__snore.wav,347547__masgame__applause.mp3,370710__podsburgh__vomiting-on-the-ground-remixed.flac,388525__anko6__vomit.wav,399290__chestnutjam__gagging (1).wav,399290__chestnutjam__gagging.wav,419784__14gpanskamuzatko_matej__10-vomit-scream-male (1).wav,419784__14gpanskamuzatko_matej__10-vomit-scream-male.wav,442257__jonastisell__slap-with-reverb.mp3,445998__breviceps__fart-1.wav,448380__vikuserro__strong-man-lift.wav,47356__fotoshop__oof.wav,480682__craigsmith__r02-06-medium-crowd-applause.wav,51746__erkanozan__clap.wav,57813__timtube__pukeing.wav,58836__opposit__longfart1.wav,64128__ifartinurgeneraldirection__an-awesome-fart (1).mp3,64128__ifartinurgeneraldirection__an-awesome-fart.mp3,64130__ifartinurgeneraldirection__complaining-fart.mp3,64137__ifartinurgeneraldirection__splatter-fart.mp3,71037__ifartinurgeneraldirection__fart-20.mp3,71203__ifartinurgeneraldirection__morning-fart.mp3,amber-aleart-djlunatique.com.mp3,and checkmate.mp3,Andrew-Tate-DUMBASS-djlunatique.com.mp3,Andrew-Tate-I-AM-A-GIFT-TO-FEMALES-CREATED-BY-THE-ONE-ABOVE-djlunatique.com.mp3,Andrew-Tate-WHAT-COLOR-IS-YOUR-BUGATTI-djlunatique.com.mp3,Android-meme-djlunatique.com.mp3,angels-singing.mp3,angry-cat-djlunatique.com.mp3,animan-studios-theme_fEsuoxZ.mp3,anime-sneeze-djlunatique.com.mp3,anime-wow-sound-effect.mp3,Another-One-Meme-Sound-Effect-djlunatique.com.mp3,army-yelling-djlunatique.com.mp3,asian-person-laughing-djlunatique.com.mp3,ASMR-Chips-Sound-Effect-djlunatique.com.mp3,audio.txt,auuugh-djlunatique.com.mp3,ayy-stop.mp3,bad-to-the-bone.mp3,badMove.wav,bill-cosby-sounds-djlunatique.com.mp3,bing-chilling-meme-mp3-djlunatique.com.mp3,bing-chilling_fcdGgUc.mp3,Black-Man-Crying-Meme-djlunatique.com.mp3,boom-bam-bop-djlunatique.com.mp3,BoomBamBopBadaBopBoompPow-djlunatique.com.mp3,boondocks-easy-way-or-the-hard-way.mp3,boondocks-mans-butt.mp3,boondocks-massa-deez-nutz.mp3,boondocks-nibba-moment.mp3,boondocks-the-hard-way.mp3,Borat-if-you-dont-vote-for-him-he-will-take-power-djlunatique.com.mp3,Borat-She-must-be-tight-djlunatique.com.mp3,boring-djlunatique.com.mp3,Brahh-djlunatique.com.mp3,break-monitor-djlunatique.com.mp3,brrr-skibidi-dop-dop-djlunatique.com.mp3,calm-nature-sounds-djlunatique.com.mp3,can-I-put-my-balls-in-yo-jaws-sound-effect-djlunatique.com.mp3,cash-register-sound-fx.mp3,cash.mp3,censor-beep-1.mp3,checkmate.mp3,click.wav,Come on, let’s go outside We gonna fight.mp3,cr1tikal-is-registered.mp3,crownMoved.wav,cuteanimeroar_bybakster.mp3,daddy-chill-mcjuggernuggets-mp3cut.mp3,daequan-come-here-boy-sound-effect.mp3,damn-son-whered-you-find-this_2.mp3,danger-alarm-sound-effect-meme.mp3,dbz-teleport.mp3,death-by-deathclaws-fallout_-new-vegas.mp3,deez-nuts-got-eem-original-vine-mp3cut.mp3,Discord Leave Sound Effect - djlunatique.com.mp3,Discord-Leave-louader-djlunatique.com.mp3,dmx-bitch-please.mp3,do-me-a-favor-stfu-meme.mp3,donald-trump-fake-news-sound-effect.mp3,dragoballthememusic.mp3,drop.wav,easalert1_audacityoutput.mp3,EnemyCrowned.wav,EnemyDeposed.wav,error_windows XP.mp3,everybody-shut-the-fuck-up.mp3,excuse-me-bruh-sound-effect-djlunatique.com.mp3,explosion-roblox-djlunatique.com.mp3,fbi-open-up-sfx.mp3,free-twitch_fgjropa.mp3,fuck-it-all_C4QLyLJ.mp3,fuck-this-shit-im-out.mp3,fukthatbitch.mp3,GameStart.mp3,gandalf_shallnotpass.mp3,george-micael-wham-careless-whisper-1.mp3,german nazi mad-husband.wav,get-rickroll-djlunatique.com.mp3,get-shit-on-for-sound-audiotrimmer.mp3,gigachad-sound-affect-but-better-djlunatique.com.mp3,girl-stfu-i-dont-gotta-explain-sht-to-you-iamzoie-1-1_ztAb282.mp3,god-damn-1.mp3,gokuyelling.mp3,good-job_d15pHHg.mp3,goofy-ahh.mp3,goofy-yell.mp3,gulp-gulp-gulp.mp3,gunreload.mp3,gunshot-one.mp3,ha-gay.mp3,hallelujahshort.swf.mp3,He Need Some Milk Sound Effect.mp3,heres-what-immigrants-think-about-the-wall-original-video-audiotrimmer.mp3,hes-pulling-his-c-out.mp3,holy-final.mp3,Hot-nigga-djlunatique.com.mp3,hurryup.wav,i-like-ya-and-i-want-ya.mp3,illuminati-confirmed-hq.mp3,im-fast-as-f-boi.mp3,Im-scared-djlunatique.com.mp3,im-the-biggest-bird_4A73UnO.mp3,im-the-captain-now_8Zulh97.mp3,infant baby crying.mp3,insert-cash-or-select-payment-type.mp3,i_have_the_power_of_god_and_anime_on_my_side.mp3,Joker Why So Serious Sound Effect.mp3,kamehameha.swf.mp3,KingCrowned.wav,kingDeposed.wav,laugh-peter-griffin-nerdy-goofy.mp3,leroy-jenkins.swf.mp3,llorando-crying-baby.mp3,LoseGame.wav,man hit and hurt.wav,Man-crying-Sound-Effect-djlunatique.com.mp3,maro-jump-sound-effect_1.mp3,mc-hammer-u-cant-touch-this.mp3,merge.mp3,mlg-airhorn.mp3,more-than-water.mp3,Mr-Beast-DO-SPEAKERS-LIKE-SPRINKLES-djlunatique.com.mp3,Mr-Beast-DONALD-TRUMP-djlunatique.com.mp3,Mr-Beast-IF-YOU-LEAVE-IN-THE-NEST-5-MINUTES-ILL-GIVE-YOU-4000-DOLLARS-djlunatique.com.mp3,Mr-Beast-WHATS-UP-GUYS-djlunatique.com.mp3,mynameisjeff.mp3,naruto-the-raising-fighting-spirit-extended-audiotrimmer_7wvXRts.mp3,newTurn.wav,nfl.mp3,nioce.mp3,no homo.mp3,no-1-bullshit-guy.mp3,no-god-please-no-noooooooooo.mp3,nooo.mp3,nooo.swf.mp3,nope_01.mp3,nuclear-alarm-siren.mp3,ny-video-online-audio-converter.mp3,o-kurwa-djlunatique.com.mp3,oh-my-god-bro-oh-hell-nah-man.mp3,Oh-shit-djlunatique.com.mp3,ohhellno.mp3,ohhhhh-n.mp3,outro-song_oqu8zAg.mp3,over9000.swf.mp3,p-hub-intro.mp3,panjabi-mc-mundian-to-bach-ke-the-dictator-soundtrack-0s-7s-djztxj2gpfk.mp3,pause-that-shh.mp3,pause_KzBkT4p.mp3,pieceKilled.wav,pieceMove.wav,Plain-Jane-AsAP-Ferg-Sound-Effect-djlunatique.com.mp3,pokemon-red-blue-music-wild-pokemon-victory-theme-1.mp3,puking_and_diarrhea.mp3,record-scratch-2.mp3,rizz-sounds.mp3,run-vine-sound-effect_1.mp3,sacrfice-my-own-life-djlunatique.com.mp3,Sad Violin - Sound Effect.mp3,Seagull Beach Sound Effect.mp3,Seinfeld-Bass-Transition-djlunatique.com (1).mp3,Seinfeld-Bass-Transition-djlunatique.com.mp3,seinfeld-theme_1.mp3,sensational-future.mp3,she-belongs-to-the-streets-future-meme.mp3,shut-it-down.mp3,shut-the-fuck-up_FRj0JUo.mp3,shut-up-bitch-dwayne-the-rock-johnson.mp3,shut-up-djlunatique.com.mp3,sick-dragon.wav,sitcom-laughing-1.mp3,Slap-ahh-djlunatique.com.mp3,sleeping_HwTkaox.mp3,sound-effect-giveaway-2-he-needs-some-milk.mp3,sound-effect-gucci-gang-lil-pump_UvkSCOH.mp3,sponge-stank-noise.mp3,stewie-tuba.mp3,stfu-you-nasty-btch-1-75-speed-up.mp3,Stop-the-cap-right-now-djlunatique.com.mp3,surprise-motherfucker.mp3,swag-like-ohio.mp3,td_crying.mp3,td_cryingagain.mp3,they-ask-you-how-you-are-and-you-just-have-to-say-that-youre-fine-sound-effect_IgYM1CV.mp3,thisissparta.swf.mp3,tmp_7901-951678082.mp3,Tom-scream-djlunatique.com.mp3,tuba-knocked-out.mp3,tuba_1.mp3,tuba_hwu62g6.mp3,u-gae.mp3,uglygod.mp3,ultra-gay-seal_1.mp3,uncle-ruckus.mp3,unlce-ruckus-im-black-now.mp3,unlce-ruckus-rap-beef.mp3,unlce-ruckus-zoologist.mp3,untitled_1071.mp3,untitled_AqTw4cf.mp3,ur-mom-djlunatique.com.mp3,ussr-anthem-short2.mp3,vegeta-something-just-snapped_s9osoEc.mp3,video0-online-audio-converter_L0R7wUM.mp3,video0_k03U0Iy.mp3,vine-boom.mp3,waaaahwannn waring click sus among us soundfx.mp3,we-do-not-care_phB0mEB.mp3,wet-fart_1.mp3,What's your name sir my name is deez.mp3,what-are-you-doing-in-my-swamp-.mp3,what-did-you-say-boondocks.mp3,whiteman_3euyqUy.mp3,who-want-smoke.mp3,Why Are You Running Sound Effect - DJ Lunatique.mp3,Why You Coming Fast Sound Effect.mp3,Why-are-you-gay-Sound-Effect-djlunatique.com.mp3,Why-hello-there-old-sport-djlunatique.com.mp3,Wind Sound Effect.mp3,windows-xp-startup_1ph012N.mp3,WinGame.wav,wouldnt-let-that-shit-happen-to-me-tho_1u2eJEj.mp3,wrong-answer-sound-effect.mp3,wtf_boom.mp3,yanp.mp3,yeet-sound-effect.mp3,yeet_ivPgINo.mp3,you need to leave.mp3,you-stupid-ni_fEVypaY.mp3,you-what-spongebob.mp3,YouAreAnIdiot-djlunatique.com.mp3,Your-goofy-ahh-uncle-has-a-message-djlunatique.com.mp3,zias-stop-the-cap_RjHQpxU.mp3";
var audio = audiosStr.split(",");
var videosStr = "arabian camels sahara desert.mp4,DASH_96 - Copy.mp4,Footage Of An Elephant - Copy.mp4,he dead gif.mp4,Human Feeding The Little Squirrel - Copy.mp4,large-adult-brown-bear-relaxing-and-scratching-in-the-forest_hhtaknef__a5a1d685451329008fae4c4d8fcf0a2a__P360 - Copy.mp4,Pexels Videos 1508067.mp4,Pexels Videos 3616.mp4,Pexels Videos 3828.mp4,swiggityswootybooty.mp4,testdummy.mp4,The Bear Suckled Her Cubs.mp4,Video Of Goldfinches Eating.mp4,videoblocks-close-up-of-beautiful-grey-wolf-standing-in-the-forest-observing_h-p4vckgm__b4028b078dee273685f3e2c398327689__P360.mp4,videoblocks-close-up-of-large-adult-brown-bear-walking-free-in-the-forest-at-night_rnidmmbxz__a33c6960ec3b6639575f5e93dbcda765__P360.mp4,videoblocks-eurasian-wolf-canis-lupus-lupus-1_rwmtgm8ec__c6231f1487418053efa23e91f2e61b74__P360.mp4,videoblocks-lion-yawns-at-amsterdam-zoo_bqoumoog___d2c59e634f343d2c6ad630632f8bf41f__P360.mp4,videoblocks-male-lion-shakes-and-then-lays-on-grass_hrc6seyrd__124bdebf044b05ac8a08f66d08462d3e__P360.mp4,videos.txt"
var videos = videosStr.split(",");

// Save the canvas image

let saveCanvasButton = document.getElementById('saveCanvas');
let saveScreenshotButton = document.getElementById('saveScreenshot');

saveCanvasButton.addEventListener('click', () => {
    let link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = drawCanvas.toDataURL('image/png');
    link.click();
});

saveScreenshotButton.addEventListener('click', () => {
    let temporaryCanvas = document.createElement('canvas');
    let temporaryCtx = temporaryCanvas.getContext('2d');

    temporaryCanvas.width = video.videoWidth;
    temporaryCanvas.height = video.videoHeight;

    // Draw the video frame to the temporary drawCanvas.
    temporaryCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(drawCanvas, 0, 0);

    // Now save this composite image.
    let link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = temporaryCanvas.toDataURL('image/png');
    link.click();
});

function canvas2video() {
    let temporaryCanvas = document.createElement('canvas');
    let temporaryCtx = temporaryCanvas.getContext('2d');

    temporaryCanvas.width = video.videoWidth;
    temporaryCanvas.height = video.videoHeight;

    // // Draw the video frame to the temporary drawCanvas.
    // temporaryCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(videoCanvas, 0, 0);
    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(mediaCanvasFloat, 0, 0);
    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(drawCanvas, 0, 0);

    const stream = temporaryCanvas.captureStream(25);
}

// var socket = io();

// socket.on('mediaList', function (Imgfiles, Sndfiles, Vidfiles) {

//     images = Imgfiles;
//     audios = Sndfiles;
//     videos = Vidfiles;

// });

// socket.emit('mediaList', data);


