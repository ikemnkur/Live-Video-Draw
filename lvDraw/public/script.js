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

let temporaryCanvas = document.createElement('canvas');
let temporaryCtx = temporaryCanvas.getContext('2d');
temporaryCanvas.width = video.videoWidth;
temporaryCanvas.height = video.videoHeight;


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
setInterval(() => {
  canvas2videoF();
}, 1000 / 30);

var myVideoStream;
let userDrawingStream = temporaryCanvas.captureStream(30);
var videoObj;

// navigator.mediaDevices
//   .getUserMedia({
//     audio: true,
//     video: true,
//   })
//   .then((stream) => { 

myVideoStream = userStream;
let stream = myVideoStream;
// addVideoStream(myVideo, stream);
// videoGrid.append(document.getElementById("liveVideo"))

// add someone else's video stream to videoGrid
peer.on("call", (call) => {
  console.log('someone call me');
  call.answer(stream);
  const video = document.createElement("video");
  video.id = "otherVideo";
  console.log("im last to join");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
});

socket.on("user-connected", (userId, userName) => {
  connectToNewUser(userId, stream);
  newUsername = userName;
  console.log("New username: " + newUsername);
});
// });

// temporarily store the name of the last user to join the video chat call.
let newUsername = ""

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
  videoObj = createNewLiveVideo(stream);
  video.addEventListener("loadedmetadata", () => {
    video.play();
    // var videoObj = createNewLiveVideo(stream);
    videoGrid.append(videoObj);
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
  let property = "I'm a property";
  let liveVideoTemp = document.getElementById("myLiveVideoDIV");
  let liveVideo = liveVideoTemp.cloneNode(true);
  liveVideo.id = liveVideo.id + "#" + newUsername;

  let temporaryCanvas = document.createElement('canvas');
  let temporaryCtx = temporaryCanvas.getContext('2d');
  temporaryCanvas.width = 320;
  temporaryCanvas.height = 240;

  let video = liveVideo.children[0];
  let videoCanvas = liveVideo.children[1];
  let mainCanvas = liveVideo.children[2];
  let tempMediaCanvas = liveVideo.children[3];
  let drawCanvas = liveVideo.children[4];
  let eraseCanvas = liveVideo.children[5];
  let textCanvas = liveVideo.children[6];
  let mediaCanvas = liveVideo.children[7];
  let finalVideo = liveVideo.children[8];

  let videoCTX = videoCanvas.getContext('2d');
  let mainCTX = mainCanvas.getContext('2d');
  let drawCTX = drawCanvas.getContext('2d');
  let eraseCTX = eraseCanvas.getContext('2d');
  let textCTX = textCanvas.getContext('2d');
  let tempMediaCTX = tempMediaCanvas.getContext('2d');
  let mediaCTX = mediaCanvas.getContext('2d');

  let myVideoStream = temporaryCanvas.captureStream(30);
  finalVideo.srcObject = myVideoStream;
  video.srcObject = stream;

  liveVideo.addEventListener("click", () => {
    if (selectedLiveVideoID != liveVideo.id) {
      selectStream(liveVideo)
    }
  });


  // videoPlay() {
  // ----------- Video Initialization ----------//
  // let video.addEventListener('play', function () {
  //   var $this = this; //cache
  //   (function loop() {
  //     if (!$let paused && !$let ended) {
  //       let videoCTX.drawImage($this, 0, 0);
  //       setTimeout(loop, 1000 / 30); // drawing at 30fps
  //     }
  //   })();
  // }, 0);

  // }



  // let myStream = stream;


  function canvas2video(videoCanvas, tempMediaCanvas, drawCanvas) {
    // Draw the video frame to the temporary drawCanvas.
    temporaryCtx.drawImage(videoCanvas, 0, 0);
    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(tempMediaCanvas, 0, 0);
    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(drawCanvas, 0, 0);
  }

  // let videoPlay();
  let updates = setInterval(() => {
    canvas2video(videoCanvas, tempMediaCanvas, drawCanvas);
  }, 1000 / 30);

  var children = liveVideo.children;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    child.id = child.id + "#" + newUsername;
  }

  return liveVideo;

}


// class liveVideoObj {
//   constructor() {
//     this.property = "I'm a property";
//     this.liveVideoTemp = document.getElementById("myLiveVideoDIV");
//     this.liveVideo = liveVideoTemp.cloneNode(true);
//     this.liveVideo.id = this.liveVideo.id + "#" + newUsername;

//     this.temporaryCanvas = document.createElement('canvas');
//     this.temporaryCtx = temporaryCanvas.getContext('2d');
//     this.temporaryCanvas.width = video.videoWidth;
//     this.temporaryCanvas.height = video.videoHeight;
//     this.stream;
//     this.myVideoStream = temporaryCanvas.captureStream(30);

//     this.video = this.liveVideo.children[0];
//     this.videoCanvas = this.liveVideo.children[1];
//     this.mainCanvas = this.liveVideo.children[2];
//     this.tempMediaCanvas = this.liveVideo.children[3];
//     this.drawCanvas = this.liveVideo.children[4];
//     this.eraseCanvas = this.liveVideo.children[5];
//     this.textCanvas = this.liveVideo.children[6];
//     this.mediaCanvas = this.liveVideo.children[7];

//     this.videoCTX = this.videoCanvas.getContext('2d');
//     this.mainCTX = this.mainCanvas.getContext('2d');
//     this.drawCTX = this.drawCanvas.getContext('2d');
//     this.eraseCTX = this.eraseCanvas.getContext('2d');
//     this.textCTX = this.textCanvas.getContext('2d');
//     this.tempMediaCTX = this.tempMediaCanvas.getContext('2d');
//     this.mediaCTX = this.mediaCanvas.getContext('2d');

//     this.liveVideo.addEventListener("click", () => {
//       if (selectedLiveVideoID != this.liveVideo.id) {
//         selectStream(this.liveVideo)
//       }
//     });
//   }

//   // videoPlay() {
//   // ----------- Video Initialization ----------//
//   // this.video.addEventListener('play', function () {
//   //   var $this = this; //cache
//   //   (function loop() {
//   //     if (!$this.paused && !$this.ended) {
//   //       this.videoCTX.drawImage($this, 0, 0);
//   //       setTimeout(loop, 1000 / 30); // drawing at 30fps
//   //     }
//   //   })();
//   // }, 0);

//   // }

//   method() {
//     console.log("Hello, I'm a method!");
//   }

//   setStream(stream) {
//     this.myStream = stream;
//   }

//   canvas2video(videoCanvas, tempMediaCanvas, drawCanvas) {
//     // Draw the video frame to the temporary drawCanvas.
//     temporaryCtx.drawImage(videoCanvas, 0, 0);
//     // Then draw the main canvas (drawing) on top of that.
//     temporaryCtx.drawImage(tempMediaCanvas, 0, 0);
//     // Then draw the main canvas (drawing) on top of that.
//     temporaryCtx.drawImage(drawCanvas, 0, 0);
//   }

//   updateCanvas() {
//     // this.videoPlay();
//     this.updates = setInterval(() => {
//       this.canvas2video(this.videoCanvas, this.tempMediaCanvas, this.drawCanvas);
//     }, 1000 / 30);
//   }

//   createElements() {
//     var children = this.liveVideo.children;
//     for (var i = 0; i < children.length; i++) {
//       var child = children[i];
//       child.id = child.id + "#" + newUsername;
//     }

//     // this.video.srcObject = stream;
//     // this.video.play();
//   }

//   renderElement() {
//     return this.liveVideo;
//   }


// }

// const obj = new liveVideoObj();
// console.log(obj.property);
// obj.method();