require('dotenv/config');
const express = require("express");
const app = express();

// ################### SERVER RELATED GENERAL SETUP ################### //
const SERVER_PORT = process.env.SERVER_PORT || 5000;

// app.listen returns an HTTP server so we can use app.listen instead of server = require("http").createServer.listen(...);
// This wil allow our middleware routes to be used (which would otherwise not be the case with server.listen(...))
const server = app.listen(SERVER_PORT, () => console.log("Server listening on port number: ", SERVER_PORT));
const io = require("socket.io")(server);
const DatabaseConnection = require("./database-connection");

// Starting the socket server
require("./socket-setup").start(io);

// Initialises the connection to the database
new DatabaseConnection();

// ################### EXPRESS RELATED SETUP/MIDDLEWARE ################### //
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

// Handles user login/registration operations
app.use("/", require("./routes/login-register-routes"));

// Handles user action operations (eg add friends, create groups)
app.use("/", require("./routes/user-action-routes"));

module.exports = server;