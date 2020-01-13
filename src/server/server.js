require('dotenv/config');
const DatabaseConnection = require("./database-connection");
const REGISTER_EVENTS = require("../events/register-events");
const LOGIN_EVENTS = require("../events/login-events");
const LoginRegistrationOperations = require("./server-operations/login-registration-operations");

// Server setup
let io = require("socket.io")();
io.listen(process.env.SERVER_PORT);
console.log("Server listening on port number: ", process.env.SERVER_PORT);

// Initialises the connection to the database
let dbConnection = new DatabaseConnection();

io.on("connection", clientSocket => {
    clientSocket.on(REGISTER_EVENTS.REQUEST_REGISTRATION, data => {
        LoginRegistrationOperations.registerUser(clientSocket, dbConnection, data);
    });

    clientSocket.on(LOGIN_EVENTS.REQUEST_LOGIN, data => {
        LoginRegistrationOperations.login(clientSocket, dbConnection, data);
    });
    
});