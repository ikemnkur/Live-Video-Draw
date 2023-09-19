let myLiveVideoDiv = document.getElementById('myLiveVideoDIV');
// myLiveVideoDiv.id = "myVid";
let video = document.getElementById('video');
let selectedLiveVideoID = myLiveVideoDiv.id;

let videoCanvas = document.getElementById('videoCanvas');
let mainCanvas = document.getElementById('mainCanvas');
let drawCanvas = document.getElementById('drawCanvas');
let eraseCanvas = document.getElementById('eraseCanvas');
let textCanvas = document.getElementById('textCanvas');
let tempMediaCanvas = document.getElementById('tempMediaCanvas');
let mediaCanvas = document.getElementById('mediaCanvas');

var videoCTX = videoCanvas.getContext('2d');
var mainCTX = mainCanvas.getContext('2d');
let drawCTX = drawCanvas.getContext('2d');
let eraseCTX = eraseCanvas.getContext('2d');
let textCTX = textCanvas.getContext('2d');
let tempMediaCTX = tempMediaCanvas.getContext('2d');
let mediaCTX = mediaCanvas.getContext('2d');

let mediaMessage = document.getElementById('mediaMessage');

selectStream(myLiveVideoDiv);

// Select this  as the new liveVideo to draw onabort.
myLiveVideoDiv.addEventListener("click", () => {
    if (selectedLiveVideoID != myLiveVideoDiv.id) {
        selectStream(myLiveVideoDiv);
    }
})

// Update the elements to 
function selectStream(liveVideo) {
    selectedLiveVideoID = liveVideo.id
    console.log("New live video selected: ", selectedLiveVideoID)
    video = liveVideo.children[0];
    videoCanvas = liveVideo.children[1];
    tempMediaCanvas = liveVideo.children[2];
    mainCanvas = liveVideo.children[3];
    drawCanvas = liveVideo.children[4];
    eraseCanvas = liveVideo.children[5];
    mediaCanvas = liveVideo.children[6];
    textCanvas = liveVideo.children[7];

    videoCTX = videoCanvas.getContext('2d');
    drawCTX = drawCanvas.getContext('2d');
    mainCTX = mainCanvas.getContext('2d');
    eraseCTX = eraseCanvas.getContext('2d');
    textCTX = textCanvas.getContext('2d');
    tempMediaCTX = tempMediaCanvas.getContext('2d');
    mediaCTX = mediaCanvas.getContext('2d');

    setupEventListeners();
}


//Drag Image or video around on the screen
let moveMedia = false;
let moveText = false;

//The link to the media file on the server
let mediaLink = '';

// let size = 1;
let angle = 0;
let time = 0;

// loops, 1 to 100 steps
var interval = setInterval(() => {
    time++;
    if (time > 99) time = 0;
}, 50);

let drawing = false;
let x = 0;
let y = 0;

function setupEventListeners() {

    // ----------- Video Initialization ----------//
    video.addEventListener('play', () => {
        video.videoHeight = video.videoHeight / video.videoWidth * 320;
        video.videoWidth = 320;
        video.height = video.videoHeight / video.videoWidth * 320;
        video.width = 320;
        mainCanvas.width = video.videoWidth;
        mainCanvas.height = video.videoHeight;
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
        tempMediaCanvas.width = video.videoWidth;
        tempMediaCanvas.height = video.videoHeight;
    });

    video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                videoCTX.drawImage($this, 0, 0);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);

    // Canvas HUD elements
    eraseCanvas.addEventListener('mousedown', (e) => {
        if (mode === 'erase') {
            showEraser = true;
            console.log("showEraser: ", showEraser);

            x = e.offsetX;
            y = e.offsetY;
            drawing = true;
        }
    });

    eraseCanvas.addEventListener('mousemove', (e) => {
        if (mode === 'erase') {
            if (drawing === true) {
                if (eraseMain.checked) {
                    drawLine(mainCTX, x, y, e.offsetX, e.offsetY);
                } if (eraseDrawing.checked) {
                    drawLine(drawCTX, x, y, e.offsetX, e.offsetY);
                } if (eraseBoth.checked) {
                    drawLine(drawCTX, x, y, e.offsetX, e.offsetY);
                    drawLine(mainCTX, x, y, e.offsetX, e.offsetY);
                }
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
        }
    });

    eraseCanvas.addEventListener('mouseup', (e) => {
        if (mode === 'erase') {
            showEraser = false;
            console.log("showEraser: ", showEraser);

            if (drawing === true) {
                if (eraseMain.checked) {
                    drawLine(mainCTX, x, y, e.offsetX, e.offsetY);
                } if (eraseDrawing.checked) {
                    drawLine(drawCTX, x, y, e.offsetX, e.offsetY);
                } if (eraseBoth.checked) {
                    drawLine(drawCTX, x, y, e.offsetX, e.offsetY);
                    drawLine(mainCTX, x, y, e.offsetX, e.offsetY);
                }
                // if()
                // drawLine(drawCTX, x, y, e.offsetX, e.offsetY);
                // drawLine(mainCTX, x, y, e.offsetX, e.offsetY);
                x = 0;
                y = 0;
                drawing = false;
            }
        }
    });

    // Main Canvas
    drawCanvas.addEventListener('mousedown', (e) => {
        if (mode === 'draw') {
            x = e.offsetX;
            y = e.offsetY;
            drawing = true;
        }
    });

    drawCanvas.addEventListener('mousemove', (e) => {
        if (mode === 'draw') {
            if (drawing === true) {
                drawLine(drawCTX, x, y, e.offsetX, e.offsetY);
                x = e.offsetX;
                y = e.offsetY;
            }

            // Display the mouse coordinates.
            coordinatesDisplay.innerText = `${e.offsetX}, ${e.offsetY}`;
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
    });

    drawCanvas.addEventListener('mouseup', (e) => {
        if (mode === 'draw') {
            if (drawing === true) {
                drawLine(drawCTX, x, y, e.offsetX, e.offsetY);
                x = 0;
                y = 0;
                drawing = false;
            }
        }
    });

    // ---------------mouse move event listener
    textCanvas.addEventListener('mousemove', (e) => {
        if (mode === 'text') {
            // renderTextPreview();
            // Display the mouse coordinates.
            coordinatesDisplay.innerText = `${e.offsetX}, ${e.offsetY}`;
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
    });

    // Click the canvas to move the Image to the mouse position
    textCanvas.addEventListener('mousedown', (e) => {
        if (mode === 'text') {

            console.log("Mousedown");
            moveText = true;

            textCanvas.addEventListener('mousemove', (e) => {
                if (moveText)
                    moveDText(e);
            });

            function moveDText(e) {
                mouseX2 = e.offsetX;
                mouseY2 = e.offsetY;
                // renderImagePreview();
                coordinatesDisplay2.innerText = `${e.offsetX}, ${e.offsetY}`;
                console.log("Moveing Text");
            }

            textCanvas.addEventListener('mouseup', (e) => {
                moveText = false;
                console.log("Mouseup");
            });

        }
    });

    // textCanvas.addEventListener('click', finalizeText());

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



}

//// ------------------ Handle Text ----------------///////////

// Toolbox Text Editior Update Changes in Setting in Realtime
textInput.addEventListener('input', () => {
    renderTextPreview()
});
fontSelector.addEventListener('change', () => {
    renderTextPreview()
});
fontType.addEventListener('change', () => {
    renderTextPreview()
});
fontSizeSelector.addEventListener('change', () => {
    renderTextPreview()
});


// -----------rendering the text in real time at mouse position
function renderTextPreview() {
    textCTX.clearRect(0, 0, textCanvas.width, textCanvas.height);
    textCTX.font = `${fontType.value} ${fontSizeSelector.value}px ${fontSelector.value}`;
    textCTX.fillStyle = colorPicker.value;
    textCTX.globalCompositeOperation = 'source-over';

    let angle = textAngleSlider.value;
    let height = fontSizeSelector.value;
    let width = (textInput.value.length + 2) * fontSizeSelector.value / 2;

    // translate and rotate the canvas so that the image is centered
    textCTX.save();
    textCTX.translate(mouseX2, mouseY2);
    textCTX.rotate(angle * Math.PI / 180);
    textCTX.translate(-mouseX2, -mouseY2);

    // draw the "edit image" background behind the media object
    if (Math.floor(time / 10) % 2) textCTX.strokeStyle = '#ff0000';
    else textCTX.strokeStyle = '#000000';

    textCTX.globalAlpha = .4;
    textCTX.shadowColor = "#d53";
    textCTX.shadowBlur = 20;
    textCTX.lineJoin = "round";
    textCTX.lineWidth = 5;
    textCTX.strokeRect((mouseX2 - width / 2 - 4), (mouseY2 - height / 2 + 4), width, height);
    textCTX.globalAlpha = 1;

    // draw the image
    textCTX.fillText(textInput.value, mouseX2 - width / 2, mouseY2 + height / 2);
    // textCTX.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
    textCTX.restore();
}

// -------print the text to the main canvas
function finalizeText() {
    // if (mode === 'text') {
    ///////////////////// New
    textCTX.clearRect(0, 0, textCanvas.width, textCanvas.height);
    mainCTX.font = `${fontType.value} ${fontSizeSelector.value}px ${fontSelector.value}`;
    mainCTX.fillStyle = colorPicker.value;
    mainCTX.globalCompositeOperation = 'source-over';

    let angle = textAngleSlider.value;
    let height = fontSizeSelector.value;
    let width = (textInput.value.length + 2) * fontSizeSelector.value / 2;

    // translate and rotate the canvas so that the image is centered
    mainCTX.save();
    mainCTX.translate(mouseX2, mouseY2);
    mainCTX.rotate(angle * Math.PI / 180);
    mainCTX.translate(-mouseX2, -mouseY2);

    // draw the image
    // mainCTX.fillText(textInput.value, mouseX2, mouseY2);
    mainCTX.fillText(textInput.value, mouseX2 - width / 2, mouseY2 + height / 2);

    // textCTX.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
    mainCTX.restore();
    textInput.value = "";
    // }
}

// Draw the eraser square 
function renderEraserSquare(x, y) {
    // if (showEraser == true) {
    let size = strokeSizeSlider.value * 2;
    eraseCTX.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    // mainCTX.clearRect(x - size / 2, y - size / 2, size, size);
    eraseCTX.save();
    eraseCTX.globalCompositeOperation = 'source-over';
    eraseCTX.fillStyle = 'white';
    eraseCTX.strokeStyle = 'black';
    eraseCTX.lineWidth = 1;
    eraseCTX.fillRect(x - size / 2, y - size / 2, size, size);
    eraseCTX.strokeRect(x - size / 2, y - size / 2, size, size);
    eraseCTX.restore();
    // }
}

// Highlight tht eborer to indicated the user that drawing mode is active
function renderDrawingPreview(ctx) {
    if (Math.floor(time / 10) % 2 == 0) {
        drawCanvas.style.borderColor = '#ffff80';
    } else {
        drawCanvas.style.borderColor = '#90ffff';
    }
}

// Draw the line
function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    if (modeSelect.value === 'draw') {
        context.globalCompositeOperation = 'source-over';
        // context.strokeStyle = modeSelect.value === 'draw' ? colorPicker.value : '#FFFFFF';
        context.strokeStyle = colorPicker.value;
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
    }

    console.log("drawing line: ", modeSelect.value)
    context.closePath();
}


function renderImagePreview() {
    if (mediaLink != "") {
        // draw the media object
        if (mediaType === 'image') {
            mediaCTX.clearRect(0, 0, mediaCanvas.width, mediaCanvas.height);
            let sSize = sizeSlider.value;
            let HSize = sizeHSlider.value;
            let VSize = sizeVSlider.value;
            let base_image = new Image();
            let width, height;
            base_image.src = './media/image/' + mediaLink;
            if (editMode == 'simple') {
                width = sSize / 100 * base_image.width / 2;
                height = sSize / 100 * base_image.height / 2;
            } else {
                width = HSize / 100 * base_image.width / 2;
                height = VSize / 100 * base_image.height / 2;
            }
            // translate and rotate the canvas so that the image is centered
            mediaCTX.save();
            mediaCTX.translate(mouseX2, mouseY2);
            mediaCTX.rotate(angle * Math.PI / 180);
            mediaCTX.translate(-mouseX2, -mouseY2);

            // draw the "edit image" background behind the media object
            if (Math.floor(time / 10) % 2) mediaCTX.strokeStyle = '#ff0000';
            else mediaCTX.strokeStyle = '#000000';
            mediaCTX.globalAlpha = .4;
            mediaCTX.shadowColor = "#d53";
            mediaCTX.shadowBlur = 20;
            mediaCTX.lineJoin = "round";
            mediaCTX.lineWidth = 5;
            // mediaCTX.strokeStyle = "#38f";
            mediaCTX.strokeRect((mouseX2 - width / 2), (mouseY2 - height / 2), width, height);
            mediaCTX.globalAlpha = 1;

            // draw the image
            mediaCTX.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
            mediaCTX.restore();
        }

        if (mediaType === 'audio') {
            mediaCTX.clearRect(0, 0, mediaCanvas.width, mediaCanvas.height);
            let base_image = new Image();
            base_image.src = './media/image/soundIcon.png';
            let sSize = sizeSlider.value;
            if (editMode == 'simple') {
                width = sSize / 100 * base_image.width / 2;
                height = sSize / 100 * base_image.height / 2;
            } else {
                width = sizeHValue.value / 100 * base_image.width / 2;
                height = sizeVValue.value / 100 * base_image.height / 2;
            }
            // mediaCTX.rotate(angle * Math.PI / 180);
            mediaCTX.save();
            mediaCTX.translate(mouseX2, mouseY2);
            mediaCTX.rotate(angle * Math.PI / 180);
            mediaCTX.translate(-mouseX2, -mouseY2);

            // draw the "edit image" background behind the media object
            if (Math.floor(time / 10) % 2) mediaCTX.strokeStyle = '#ff0000';
            else mediaCTX.strokeStyle = '#000000';
            mediaCTX.globalAlpha = .4;
            mediaCTX.shadowColor = "#d53";
            mediaCTX.shadowBlur = 20;
            mediaCTX.lineJoin = "round";
            mediaCTX.lineWidth = 5;
            // mediaCTX.strokeStyle = "#38f";
            mediaCTX.strokeRect((mouseX2 - width / 2) - 7, (mouseY2 - height / 2) - 7, width + 14, height + 14);
            mediaCTX.globalAlpha = 1;
            mediaCTX.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);

            // mediaCTX.rotate(-angle * Math.PI / 180);
            mediaCTX.restore();
        }
    }
}

let finalizeVideo = false;

function drawVideo(ctx) {
    base_video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                let sSize = sizeSlider.value; // combined scale factor slider
                let HSize = sizeHSlider.value; // horizontal scale factor slider
                let VSize = sizeVSlider.value; // vertical scale factor slider
                let angle = angleSlider.value;
                let width, height; // final sizes

                let vWidth = 300; // original size: width
                let vHeight = 300 * base_video.videoHeight / base_video.videoWidth; // original size: hieght

                if (editMode == 'simple') {
                    width = sSize / 100 * vWidth / 2;
                    height = sSize / 100 * vHeight / 2;
                } else {
                    width = HSize / 100 * vWidth / 2;
                    height = VSize / 100 * vHeight / 2;
                }

                ctx.clearRect(0, 0, mediaCanvas.width, mediaCanvas.height);
                ctx.save();
                ctx.translate(mouseX2, mouseY2);
                ctx.rotate(angle * Math.PI / 180);
                ctx.translate(-mouseX2, -mouseY2);

                // draw the "edit image" background behind the media object
                if (Math.floor(time / 10) % 2)
                    mediaCTX.fillStyle = '#ff0000';
                else
                    mediaCTX.fillStyle = '#000000';

                ctx.globalAlpha = .4;
                ctx.fillRect((mouseX2 - width / 2) - 3, (mouseY2 - height / 2) - 3, width + 6, height + 6);
                ctx.fill();
                ctx.globalAlpha = 1;

                ctx.drawImage($this, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
                ctx.restore();
                if (mediaType === 'video' && finalizeVideo == false) {
                    setTimeout(loop, 1000 / 30); // drawing at 30fps
                    return false;
                }


                base_video.addEventListener('ended', () => {
                    base_video.play();
                });

            }
        })();
    }, 0);
}

function drawVideoTemp() {
    base_video.play();
    let timeO = false;
    base_video.addEventListener('play', function () {
        var $this = this; //cache
        console.log("start temp video");
        (function loop() {
            if (!$this.paused && !$this.ended) {
                let sSize = sizeSlider.value; // combined scale factor slider
                let HSize = sizeHSlider.value; // horizontal scale factor slider
                let VSize = sizeVSlider.value; // vertical scale factor slider
                let angle = angleSlider.value;
                let width, height; // final sizes

                let vWidth = 300; // original size: width
                let vHeight = 300 * base_video.videoHeight / base_video.videoWidth; // original size: hieght

                if (editMode == 'simple') {
                    width = sSize / 100 * vWidth / 2;
                    height = sSize / 100 * vHeight / 2;
                } else {
                    width = HSize / 100 * vWidth / 2;
                    height = VSize / 100 * vHeight / 2;
                }

                tempMediaCTX.clearRect(0, 0, tempMediaCTX.width, tempMediaCTX.height);
                tempMediaCTX.save();
                tempMediaCTX.translate(mouseX2, mouseY2);
                tempMediaCTX.rotate(angle * Math.PI / 180);
                tempMediaCTX.translate(-mouseX2, -mouseY2);

                tempMediaCTX.drawImage($this, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
                tempMediaCTX.restore();

                if (mediaType === 'video' && finalizeVideo == true)
                    setTimeout(loop, 1000 / 30); // drawing at 30fps

                // base_video.addEventListener('ended', () => {
                // base_video.play();
                if (timeO == false) {
                    setTimeout(() => {
                        finalizeVideo = false;
                        tempMediaCTX.clearRect(0, 0, tempMediaCTX.width, tempMediaCTX.height);
                        console.log('done with temp video');
                        return 'done';
                    }, mediaStopSlider.value - mediaStartSlider.value);
                    timeO = true;
                }
                // });
            }
        })();
    }, 0);
}

function finalizeMedia() {
    if (mode === 'addMedia') {
        mainCTX.globalCompositeOperation = 'source-over';
        if (mediaType === 'image') {
            mediaCTX.clearRect(0, 0, textCanvas.width, textCanvas.height);
            let base_image = new Image();
            base_image.src = './media/image/' + mediaLink;

            let sSize = sizeSlider.value;
            let HSize = sizeHSlider.value;
            let VSize = sizeVSlider.value;
            let angle = angleSlider.value;
            let width, height;
            if (editMode == 'simple') {
                width = sSize / 100 * base_image.width / 2;
                height = sSize / 100 * base_image.height / 2;
            } else {
                width = HSize / 100 * base_image.width / 2;
                height = VSize / 100 * base_image.height / 2;
            }

            mainCTX.save();
            mainCTX.translate(mouseX2, mouseY2);
            mainCTX.rotate(angle * Math.PI / 180);
            mainCTX.translate(-mouseX2, -mouseY2);
            mainCTX.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
            mainCTX.font = `12px ${fontSelector.value}`;
            mediaCTX.fillStyle = '#FFFFFF'
            mainCTX.fillText(mediaMessage.value, mouseX2, mouseY2 - height / 2 + 5);
            mainCTX.restore();

            clearMediaPreviewDiv();
            mediaMessage.value = '';
            // clear the drawn image on the canvas after timeVal seconds
            // clearMediaAfterTimeout(ctx, width, height);
        }

        if (mediaType === 'audio') {
            mediaCTX.clearRect(0, 0, textCanvas.width, textCanvas.height);
            base_image = new Image();
            base_image.src = './media/image/soundIcon.png';

            let VSize = sizeVSlider.value;
            let HSize = sizeHSlider.value;
            let sSize = sizeSlider.value;
            let angle = angleSlider.value;
            let width = HSize / 100 * 128;
            let height = VSize / 100 * 128;
            if (editMode == 'simple') {
                width = sSize / 100 * base_image.width / 2;
                height = sSize / 100 * base_image.height / 2;
            } else {
                width = HSize / 100 * base_image.width / 2;
                height = VSize / 100 * base_image.height / 2;
            }

            //Draw sound icon
            mediaCTX.save();
            mediaCTX.translate(mouseX2, mouseY2);
            mediaCTX.rotate(angle * Math.PI / 180);
            mediaCTX.translate(-mouseX2, -mouseY2);
            mediaCTX.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
            mediaCTX.font = `12px ${fontSelector.value}`;
            mediaCTX.fillStyle = '#FFFFFF'
            mediaCTX.fillText(mediaMessage.value, mouseX2, mouseY2 - height / 2 - 5);
            mediaCTX.restore();

            var sound = new Audio();
            sound.src = './media/audio/' + mediaLink;
            sound.play()

            clearMediaPreviewDiv();
            mediaMessage.value = '';
        }

        if (mediaType == 'video') {
            // tempMediaCanvas.dis
            console.log('started playing video')
            finalizeVideo = true;
            // let drawPermVideo = setInterval(() => {
            drawVideoTemp()
            console.log('playing video')
            // }, 1000 / 30);

            setTimeout(() => {
                // clearInterval(drawPermVideo);
                finalizeVideo = false;
                console.log('ended playing video')
            }, base_video.duration * 1000);
        }

    }
}

function finalizeDrawing() {
    mainCTX.strokeStyle = modeSelect.value === 'draw' ? colorPicker.value : '#FFFFFF';
    // let oldBackgroundColor = drawCanvas.style.backgroundColor;
    // drawCanvas.style.backgroundColor = "rgba(255, 255, 255, 0)"
    async function firstFunction() {
        mainCTX.globalCompositeOperation = 'source-over';
        mainCTX.drawImage(drawCanvas, 0, 0)
        return;
    }
    async function secondFunction() {
        await firstFunction();
        // drawCanvas.style.backgroundColor = oldBackgroundColor;
        drawCTX.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        // setTimeout(() => {
        // drawCTX.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        // }, 250);
    };
    secondFunction();

}

function clearMediaAfterTimeout(ctx, width, height) {
    var timeValue = document.getElementById('timeValue').value;
    let val = parseInt(timeValue);
    if (val == "") {
        val = 5;
    }
    let timeTillDelete = setTimeout(function () {
        console.log('clearMediaAfterTimeout: ', val);
        ctx.clearRect(mouseX2 - width / 2, mouseY2 - height / 2, width, height);
    }, val * 1000)
}

// Clear out the search term and results in the toolbox
function clearMediaPreviewDiv() {
    // Clear all the image in the display div
    document.querySelectorAll('#list').forEach(item => {
        item.style.background = '';
    });
    mediaLink = "";
}


//update media canvas preview at 30 fps
let CTXRender = setInterval(() => {
    if (mode === 'addMedia') {
        renderImagePreview(mediaCTX);
    } else if (mode === 'text') {
        renderTextPreview(textCTX);
    } else if (mode === 'draw') {
        renderDrawingPreview(drawCTX);
    }
}, 1000 / 30)

