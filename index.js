let express = require('express');
let socket = require('socket.io');

// App setup
let app = express();


// Server setup
let server = app.listen(4000, () => {
    console.log("Project is running on localhost: 4000");
})


// Route setup
app.get("/", (res, req) => {
    req.sendFile(__dirname + "/public/index.html");
})


// Socket setup
let io = socket(server);
io.on("connection", (socket) => {
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name);
    })
})