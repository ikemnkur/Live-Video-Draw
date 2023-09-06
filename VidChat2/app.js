const myPeer = new Peer(undefined, {
    host: '/', 
    port: '3001'
});

const peers = {};
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);
    
    // Answering a call
    myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
    });

    // Existing code for sending a message and updating the chat
    // ...
});

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}

myPeer.on('open', id => {
    // This assumes you're using Socket.io or a similar library for server-client communication
    socket.emit('join-room', ROOM_ID, id); 
});

socket.on('user-connected', userId => {
    // Handle new user connection
    connectToNewUser(userId, stream);
});

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
        video.remove();
    });
    peers[userId] = call;
}

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close();
});


const messageContainer = document.getElementById('messages');
const messageForm = document.getElementById('send');
const messageInput = document.getElementById('msg-input');

socket.on('room-message', data => {
    insertMessage(data.name, data.message);
});

messageForm.addEventListener('click', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-room-message', {room: ROOM_ID, message: message});
    insertMessage('Me', message);
    messageInput.value = '';
});

function insertMessage(name, message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = `${name}: ${message}`;
    messageContainer.append(messageElement);
}
