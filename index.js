// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const http = require('http');

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const users = [];

/**
 *  App Configuration
 */



/**
 * Routes Definitions
 */

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


/**
 * Socket.io Definition
 */

 io.on('connection', (socket) => {

    users.push(socket.id);

    io.emit('user connect');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        io.emit('user disconnect');
    });
  });

/**
 * Server Activation
 */

server.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});