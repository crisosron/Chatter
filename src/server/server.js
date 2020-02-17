require('dotenv/config');
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const DatabaseConnection = require("./database-connection");

// Obtaining express and socket io server port numbers from .env
const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT || 5000;
// const SOCKET_IO_SERVER_PORT = process.env.SOCKET_IO_SERVER_PORT || 5001

// Middleware to handle raw json
app.use(express.json());

// Middleware to handle encoded data from form submissions
app.use(express.urlencoded({extended: false}));

// Middleware to allow the proper usage of axios with CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(EXPRESS_SERVER_PORT, () => console.log("Express server listening on port number: ", EXPRESS_SERVER_PORT));

// Handles user login/registration operations
app.use("/", require("./routes/login-register-routes"));

// Initialises the connection to the database
let dbConnection = new DatabaseConnection();

io.on('connection', clientSocket => {
    console.log("A new client connected");
});