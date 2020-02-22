require('dotenv/config');
const express = require("express");
const app = express();
const DatabaseConnection = require("./database-connection");
const io = require("./socket");

// Obtaining express and socket io server port numbers from .env
const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT || 5000;

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

app.listen(EXPRESS_SERVER_PORT, () => console.log("Express server listening on port number: ", EXPRESS_SERVER_PORT));

// Initialises the connection to the database
let dbConnection = new DatabaseConnection();

// Handles user login/registration operations
app.use("/", require("./routes/login-register-routes"));

// Handles user action operations (eg add friends, create groups)
app.use("/chat", require("./routes/login-register-routes"));
