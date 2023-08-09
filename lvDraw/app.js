const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const path = require('path');
const fs = require('fs');

// socket.on("sendImageToCanvas", (imagesrc, targetCanvas, roomId, userId, imgSentToCanvas, rotation, scale) => {
//     // var files = fs.readdirSync('./public/images/');
//     console.log("Imgs to room:", roomId, "by user:", userId);
//     io.emit('drawImageToCanvas', imagesrc, targetCanvas, roomId, userId, imgSentToCanvas, rotation, scale);
// })

var Imgfiles = fs.readdirSync('./media/image/');
var Sndfiles = fs.readdirSync('./media/audio/');
var Vidfiles = fs.readdirSync('./media/video/');


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {

    socket.emit('mediaList', Imgfiles, Sndfiles, Vidfiles)

    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

})

app.set('view engine', 'ejs');

// Create a views directory
const viewsDir = './views';
app.use(express.static(viewsDir));


// Render the template
app.get('/', (req, res) => {
    res.render('index');
});


// Serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Search for media files
app.get('/search', (req, res) => {
    const mediaType = req.query.mediaType;
    const query = req.query.q;

    if (!mediaType || !query || query.length < 3) {
        return res.json([]);
    }

    const dirPath = path.join(__dirname, 'media', mediaType);
    console.log("Directory Path", dirPath);
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory.');
        }

        const matchingFiles = files.filter(file => file.includes(query));
        console.log("Matching files for - " + query + " : " + matchingFiles)
        res.json(matchingFiles);
    });
});



server.listen(3000, () => {
    console.log('listening on *:3000');
});

// app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`);
// });
