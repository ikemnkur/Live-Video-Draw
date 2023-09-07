let video = document.getElementById('video');

let videoCanvas = document.getElementById('videoCanvas');
let drawCanvas = document.getElementById('drawCanvas');
let eraseCanvas = document.getElementById('eraseCanvas');
let tempMediaCanvas = document.getElementById('tempMediaCanvas');
let mediaCanvas = document.getElementById('mediaCanvas');

let mcfCtx = mediaCanvas.getContext('2d')
let mediaCtx = mediaCanvas.getContext('2d');
var vcCTX = videoCanvas.getContext('2d');
let ctx = drawCanvas.getContext('2d');
let ctxH = eraseCanvas.getContext('2d');
let ctxMCF = tempMediaCanvas.getContext('2d');

// let colorPicker = document.getElementById('color-picker');
// let strokeSizeSlider = document.getElementById('stroke-size');
// let clearButton = document.getElementById('clear');
// let modeSelect = document.getElementById('mode');

// let angleSlider = document.getElementById('angleSlider');
// let sizeHSlider = document.getElementById('sizeHSlider');
// let sizeVSlider = document.getElementById('sizeVSlider');
// let sizeSlider = document.getElementById('sizeSlider');
// let durationSlider = document.getElementById('durationSlider');
// let offsetInput = document.getElementById('offsetDuration');
// let volumeSlider = document.getElementById('volumeSlider');

// let bvd = document.getElementById("base_video_div_")
// let mediaDisplay = document.getElementById("mediaDisplay")

// let showEraser = false;
// let ctxVal = false;

// let coordinatesDisplay = document.getElementById('coordinates');
// let coordinatesDisplay2 = document.getElementById('coordinates2');
// // the art mode( draw, erase, add text, add media)
// let mode = 'draw';
// // mouse moving position
// let mouseX = video.width / 2;
// let mouseY = video.height / 2;
// // mosue down position
// let mouseX2 = 320//video.width / 2;
// let mouseY2 = 240//video.height / 2;

// let textEditor = document.getElementById('TextEditor');
// let textCanvas = document.getElementById('textCanvas');
// let textCtx = textCanvas.getContext('2d');
// let textInput = document.getElementById('textInput');
// let fontSelector = document.getElementById('fontSelector');
// let fontType = document.getElementById('fontType');
// let fontSizeSelector = document.getElementById('fontSize');
// let textAngleSlider = document.getElementById('textAngleSlider');
// let textAngleValue = document.getElementById('textAngleValue');


let mediaLink = '';
// let base_video = document.getElementById('base_video');

let size = 1;
let angle = 0;
let time = 0;

// var audioLibrary = []
// var imageLibrary = []
// var videoLibrary = []

// loops, 1 to 100 steps
var interval = setInterval(() => {
    time++;
    if (time > 99) time = 0;
}, 50);



// navigator.mediaDevices.getUserMedia({ video: true, audio: false })
//     .then((stream) => {
        // video.srcObject = stream;
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
            tempMediaCanvas.width = video.videoWidth;
            tempMediaCanvas.height = video.videoHeight;
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
    // })
    // .catch((err) => {
    //     console.error("Error accessing media devices.", err);
    // });

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

// clearButton.addEventListener('click', () => {
//     ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
// });

// angleSlider.addEventListener('onchange', () => {
//     angle = angleSlider.value;
//     document.getElementById('angleValue').value = angle + " deg"
// });

// sizeSlider.addEventListener('input', () => {
//     // size = e.target.value/100;
//     size = sizeSlider.value/100;
//     document.getElementById('sizeValue').value = size + "%"
// });


// // MODE SELECTOR

// modeSelect.addEventListener('change', (e) => {

//     mode = e.target.value;
//     ctxH.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
//     var StrokeSizeEditor = document.getElementById('StrokeSizeEditor');
//     var ColorEditor = document.getElementById('ColorEditor');

//     if (mode === 'draw') {
//         drawCanvas.style.cursor = 'crosshair';
//         eraseCanvas.style.display = 'none';
//         textCanvas.style.display = 'none';
//         ColorEditor.style.display = 'block';
//         StrokeSizeEditor.style.display = 'block';
//     }

//     if (mode === 'erase') {
//         eraseCanvas.style.cursor = 'none';
//         eraseCanvas.style.display = 'block';
//         textCanvas.style.display = 'none';
//         ColorEditor.style.display = 'none';
//         StrokeSizeEditor.style.display = 'block';
//     } else {
//         eraseCanvas.style.display = 'none';
//     }

//     if (mode === 'text') {
//         textCanvas.style.cursor = 'move';
//         eraseCanvas.style.display = 'none';
//         textCanvas.style.display = 'block';
//         ColorEditor.style.display = 'block';
//         StrokeSizeEditor.style.display = 'none';
//         textEditor.style.display = 'block';
//         document.getElementById("textAngleSlider").style.display = 'block';
//     } else {
//         textEditor.style.display = 'none';
//         textCanvas.style.display = 'none';
//         textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
//         document.getElementById("textAngleSlider").style.display = 'none';
//     }

//     if (mode === 'addMedia') {
//         mediaContainer.style.display = 'block';
//         mediaCanvas.style.display = 'block';
//         mediaCanvas.style.cursor = 'move';
//         ColorEditor.style.display = 'none';
//         StrokeSizeEditor.style.display = 'none';
//     } else {
//         mediaContainer.style.display = 'none';
//         mediaCanvas.style.display = 'none';
//         mediaCanvas.style.cursor = 'regular';
//     }
// });

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

textCanvas.addEventListener('click', finalizeText);

// // ----------Angle Slider control
// textAngleSlider.addEventListener('input', () => {
//     textAngleValue.value = textAngleSlider.value;
// });
// textAngleValue.addEventListener('input', () => {
//     textAngleSlider.value = textAngleValue.value;
// });

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

// clicking on this button will finalize the image and render it arcoss the stream on the selected stream
let doneBtn = document.getElementById('doneBtn');
doneBtn.addEventListener('click', finalizeImage);

// let sendBtn = document.getElementById('sendBtn');
// sendBtn.addEventListener('click', () => {
//     ctxVal = !ctxVal
//     if (ctxVal)
//         sendBtn.style.background = "lightblue";
//     else
//         sendBtn.style.background = "lightgrey";
// });

// let videoBackBtn = document.getElementById('videoBackBtn');
// videoBackBtn.addEventListener('click', () => {
//     mediaDisplay.style.display = "block";
//     bvd.style.display = "none";
// });

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
            mediaCtx.strokeRect((mouseX2 - width / 2) - 7, (mouseY2 - height / 2) - 7, width + 14, height + 14);
            mediaCtx.globalAlpha = 1;
            mediaCtx.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);

            // mediaCtx.rotate(-angle * Math.PI / 180);
            mediaCtx.restore();
        }
        if (mediaType === 'video') {


            // base_video.addEventListener("ended", () => {
            //     // if (base_video.playing) { // checks if element is playing right now
            //     //     // Do anything you want to
            //     //     if (base_video.ended)
            //     //         base_video.play();
            //     // } else {
            //     //     base_video.play();
            //     // }
            //     // let loop = document.getElementById('medialoop').checked
            //     // if (loop) {
            //     base_video.play();
            //     // console.log("replaying video")
            //     // }
            // });
            // base_video.play();
            // drawVideo();
        }
    }
}

function drawVideo(ctx) {
    base_video.addEventListener('play', function () {
        var $this = this; //cache

        (function loop() {
            if (!$this.paused && !$this.ended) {
                angle = angleSlider.value
                // mediaCanvas.drawImage($this, 0, 0);
                let width = sizeHSlider.value / 50 * 320;
                let height = sizeVSlider.value / 50 * 240;
                ctx.clearRect(0, 0, mediaCanvas.width, mediaCanvas.height);
                // mediaCtx.drawImage($this, 0, 0, 120, 80);
                ctx.save();
                ctx.translate(mouseX2, mouseY2);
                ctx.rotate(angle * Math.PI / 180);
                ctx.translate(-mouseX2, -mouseY2);

                // draw the "edit image" background behind the media object
                if (Math.floor(time / 10) % 2)
                    mediaCtx.fillStyle = '#ff0000';
                else
                    mediaCtx.fillStyle = '#000000';

                ctx.globalAlpha = .4;
                ctx.fillRect((mouseX2 - width / 2) - 3, (mouseY2 - height / 2) - 3, width + 6, height + 6);
                ctx.fill();
                ctx.globalAlpha = 1;

                ctx.drawImage($this, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
                ctx.restore();
                if (mediaType === 'video')
                    setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);
}

//update media canvas preview at 30 fps
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
            //     ctx = tempMediaCanvas.getContext("2d");

            ctx.save();
            ctx.translate(mouseX2, mouseY2);
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-mouseX2, -mouseY2);
            ctx.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
            ctx = `12px ${fontSelector.value}`;
            ctx.fillText(mediaLink, mouseX2, mouseY2 - height / 2 - 5);
            ctx.restore();

            clearMediaPreviewDiv();

            // clear the drawn image on the canvas after timeVal seconds
            // clearMediaAfterTimeout(ctx, width, height);
        }

        if (mediaType === 'audio') {
            mediaCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
            base_image = new Image();
            base_image.src = './media/image/soundIcon.png';

            let VSize = sizeVSlider.value;
            let HSize = sizeHSlider.value;
            let angle = angleSlider.value;
            let width = HSize / 100 * 128;
            let height = VSize / 100 * 128;

            //Draw sound icon
            mcfCtx.save();
            mcfCtx.translate(mouseX2, mouseY2);
            mcfCtx.rotate(angle * Math.PI / 180);
            mcfCtx.translate(-mouseX2, -mouseY2);
            mcfCtx.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
            font = `12px ${fontSelector.value}`;
            ctx.fillText(mediaLink, mouseX2, mouseY2 - height / 2 - 5);
            mcfCtx.restore();

            var sound = new Audio();
            sound.src = './media/audio/' + mediaLink;
            sound.play()

            clearMediaPreviewDiv();
        }

        if (mediaType == 'video') {
            // tempMediaCanvas.dis

            let drawPermVideo = setInterval(() => {
                drawVideo(ctxMCF)
            }, 1000 / 30);

            setTimeout(() => {
                clearInterval(drawPermVideo);
            }, base_video.duration);
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
    document.querySelectorAll('#list').forEach(item => {
        item.style.background = '';
    });
    mediaLink = "";
}

