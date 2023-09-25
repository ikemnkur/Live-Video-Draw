// const { setInterval } = require("timers/promises");

const socket = io("/");
const videoGrid = document.getElementById("video-grid");
// const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
// myVideo.muted = true;

backBtn.addEventListener("click", () => {
  document.querySelector(".main__left").style.display = "flex";
  document.querySelector(".main__left").style.flex = "1";
  document.querySelector(".main__right").style.display = "none";
  document.querySelector(".header__back").style.display = "none";
});

showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});

const user = prompt("Enter your name");

var peer = new Peer({
  host: '127.0.0.1',
  port: 3030,
  path: '/peerjs',
  config: {
    'iceServers': [
      { url: 'stun:stun01.sipphone.com' },
      { url: 'stun:stun.ekiga.net' },
      { url: 'stun:stunserver.org' },
      { url: 'stun:stun.softjoys.com' },
      { url: 'stun:stun.voiparound.com' },
      { url: 'stun:stun.voipbuster.com' },
      { url: 'stun:stun.voipstunt.com' },
      { url: 'stun:stun.voxgratia.org' },
      { url: 'stun:stun.xten.com' },
      {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      },
      {
        url: 'turn:192.158.29.39:3478?transport=tcp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      }
    ]
  },

  debug: 3
});

// --------- Merge the user's drawings with the video stream  ---------//
// The temporaray canavas will be used to merge all the videos and canvases together as one stream of images
let temporaryCanvas = document.createElement('canvas');
let temporaryCtx = temporaryCanvas.getContext('2d');
temporaryCanvas.width = video.videoWidth;
temporaryCanvas.height = video.videoHeight;
let canvasCompositeStream = temporaryCanvas.captureStream(30); //this is the stream for the temporary canvas



// overlay all the relavent canvases together
function canvas2videoF() {
  if (videoCanvas != undefined) {
    // // Draw the video frame to the temporary drawCanvas.
    temporaryCtx.drawImage(videoCanvas, 0, 0);
    // Then draw the temporary media like videos on top of that.
    temporaryCtx.drawImage(tempMediaCanvas, 0, 0);
    // Then draw the main canvas (drawings) on top of that.
    temporaryCtx.drawImage(mainCanvas, 0, 0);
  }
}

// Update the temporary canvas @ 30 fps
var updateCompositeCanvas = setInterval(() => {
  canvas2videoF();
}, 1000 / 30);

var myVideoStream;

var videoObj;

navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((mystream) => {

    myVideoStream = canvasCompositeStream;
    let stream = myVideoStream;
    // addVideoStream(myVideo, stream);
    // videoGrid.append(document.getElementById("liveVideo"))

    // add someone else's video stream to videoGrid
    peer.on("call", (call) => {
      console.log('when someone calls me');
      call.answer(stream);
      const video = document.createElement("video");
      video.id = "otherVideo";
      // console.log("im last to join");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    //Set user name when someone connects
    socket.on("user-connected", (userId, userName) => {
      connectToNewUser(userId, stream);
      newUsername = userName;
      console.log("New username: " + newUsername);
    });
  });

// temporarily store the name of the last user to join the video chat call.
let newUsername = ""
// Store the number of live video streams
let liveVideoCount = 0;

const connectToNewUser = (userId, stream) => {
  console.log('I call someone' + userId);
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  video.id = newUsername + "#video";
  console.log("im first to join");
  console.log(newUsername + " joined")
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

peer.on("open", (id) => {
  console.log('my id is' + id);
  socket.emit("join-room", ROOM_ID, id, user);
});

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  createNewLiveVideo(stream);
  liveVideoCount++;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};


let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
  if (text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

inviteButton.addEventListener("click", (e) => {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
});

socket.on("createMessage", (message, userName) => {
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${userName === user ? "me" : userName
    }</span> </b>
        <span>${message}</span>
    </div>`;
});



function createNewLiveVideo(stream) {

  let liveVideoTemp = document.getElementById("myLiveVideoDIV");
  var liveVideoDiv = liveVideoTemp.cloneNode(true);
  liveVideoDiv.id = liveVideoDiv.id + "#" + newUsername;

  let temporaryCanvas = document.createElement('canvas');
  let temporaryCtx = temporaryCanvas.getContext('2d');
  temporaryCanvas.width = 320;
  temporaryCanvas.height = 240;

  // async function firstFunction() {  // copys the image to the other canvas


  let video = liveVideoDiv.children[0];
  let videoCanvas = liveVideoDiv.children[1];
  let mainCanvas = liveVideoDiv.children[2];
  let tempMediaCanvas = liveVideoDiv.children[3];
  let drawCanvas = liveVideoDiv.children[4];
  let eraseCanvas = liveVideoDiv.children[5];
  let textCanvas = liveVideoDiv.children[6];
  let mediaCanvas = liveVideoDiv.children[7];
  let finalVideo = liveVideoDiv.children[8];

  let videoCTX = videoCanvas.getContext('2d');
  let mainCTX = mainCanvas.getContext('2d');
  let drawCTX = drawCanvas.getContext('2d');
  let eraseCTX = eraseCanvas.getContext('2d');
  let textCTX = textCanvas.getContext('2d');
  let tempMediaCTX = tempMediaCanvas.getContext('2d');
  let mediaCTX = mediaCanvas.getContext('2d');

  let myVideoStream = temporaryCanvas.captureStream(30);

  // var mergedStream = mergeStreams(myVideoStream, userAudioSource);
  //this video stream to the VideoCanvas
  video.srcObject = stream;

  //this video stream to the finalVideo obj
  // finalVideo.srcObject = mergedStream;
  finalVideo.srcObject = myVideoStream;

  liveVideoDiv.addEventListener("click", () => {
    if (selectedLiveVideoID != liveVideoDiv.id) {
      selectStream(liveVideoDiv)
    }
  });

  function canvas2video(videoCanvas, tempMediaCanvas, drawCanvas) {
    // Draw the video frame to the temporary drawCanvas.
    temporaryCtx.drawImage(videoCanvas, 0, 0);
    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(tempMediaCanvas, 0, 0);
    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(drawCanvas, 0, 0);
  }

  let updates = setInterval(() => {
    canvas2video(videoCanvas, tempMediaCanvas, drawCanvas);
  }, 1000 / 30);

  var children = liveVideoDiv.children;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    child.id = child.id + "#" + newUsername;
  }

  video.play();
  // finalVideo.play();

  // return;
  // }

  // async function secondFunction() {  // clears the canvas
  // await firstFunction();
  // videoObj = liveVideoDiv;
  setTimeout(() => {
    videoGrid.append(liveVideoDiv);
  }, 1000);

  finalVideo.addEventListener("loadedmetadata", () => {
    finalVideo.play();
    finalVideo.id = "OtherFinalVideo"
    videoGrid.append(finalVideo);
  });



  // };

  // secondFunction();
}

function mergeStreams(videoStream, audioStream) {
  var mergedStream = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);
  return mergedStream;
}



// function createNewLiveVideo(stream) {

//   let liveVideoDiv = document.getElementById("myLiveVideoDIV"+liveVideoCount);
//   // var liveVideoDiv = liveVideoTemp.cloneNode(true);
//   // liveVideoDiv.id = liveVideoDiv.id + "#" + newUsername;

//   let temporaryCanvas = document.createElement('canvas');
//   let temporaryCtx = temporaryCanvas.getContext('2d');
//   temporaryCanvas.width = 320;
//   temporaryCanvas.height = 240;

//   // async function firstFunction() {  // copys the image to the other canvas


//   let video = liveVideoDiv.children[0];
//   let videoCanvas = liveVideoDiv.children[1];
//   let mainCanvas = liveVideoDiv.children[2];
//   let tempMediaCanvas = liveVideoDiv.children[3];
//   let drawCanvas = liveVideoDiv.children[4];
//   let eraseCanvas = liveVideoDiv.children[5];
//   let textCanvas = liveVideoDiv.children[6];
//   let mediaCanvas = liveVideoDiv.children[7];
//   let finalVideo = liveVideoDiv.children[8];

//   let videoCTX = videoCanvas.getContext('2d');
//   let mainCTX = mainCanvas.getContext('2d');
//   let drawCTX = drawCanvas.getContext('2d');
//   let eraseCTX = eraseCanvas.getContext('2d');
//   let textCTX = textCanvas.getContext('2d');
//   let tempMediaCTX = tempMediaCanvas.getContext('2d');
//   let mediaCTX = mediaCanvas.getContext('2d');

//   let myVideoStream = temporaryCanvas.captureStream(30);

//   // var mergedStream = mergeStreams(myVideoStream, userAudioSource);
//   //this video stream to the VideoCanvas
//   video.srcObject = stream;
//   //this video stream to the finalVideo obj
//   // finalVideo.srcObject = mergedStream;
//   finalVideo.srcObject = myVideoStream;

//   liveVideoDiv.addEventListener("click", () => {
//     if (selectedLiveVideoID != liveVideoDiv.id) {
//       selectStream(liveVideoDiv)
//     }
//   });

//   function canvas2video(videoCanvas, tempMediaCanvas, drawCanvas) {
//     // Draw the video frame to the temporary drawCanvas.
//     temporaryCtx.drawImage(videoCanvas, 0, 0);
//     // Then draw the main canvas (drawing) on top of that.
//     temporaryCtx.drawImage(tempMediaCanvas, 0, 0);
//     // Then draw the main canvas (drawing) on top of that.
//     temporaryCtx.drawImage(drawCanvas, 0, 0);
//   }

//   let updates = setInterval(() => {
//     canvas2video(videoCanvas, tempMediaCanvas, drawCanvas);
//   }, 1000 / 30);

//   var children = liveVideoDiv.children;
//   for (var i = 0; i < children.length; i++) {
//     var child = children[i];
//     child.id = child.id + "#" + newUsername;
//   }

//   video.play();
//   // finalVideo.play();

//   // return;
//   // }

//   // async function secondFunction() {  // clears the canvas
//   // await firstFunction();
//   // videoObj = liveVideoDiv;
//   setTimeout(() => {
//     videoGrid.append(liveVideoDiv);
//   }, 1000);

//   finalVideo.addEventListener("loadedmetadata", () => {
//     finalVideo.play();
//     finalVideo.id = "OtherFinalVideo";
//     videoGrid.append(finalVideo);
//   });

//   // };

//   // secondFunction();
// }