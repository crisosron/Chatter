require('dotenv/config');
const DatabaseConnection = require("./database-connection");
const REGISTER_EVENTS = require("../events/register-events");
const LOGIN_EVENTS = require("../events/login-events");
const RegistrationOperations = require("./server-operations/registration-operations");
const LoginOperations = require("./server-operations/login-operations");

// Server setup
let io = require("socket.io")();
io.listen(process.env.SERVER_PORT);
console.log("Server listening on port number: ", process.env.SERVER_PORT);

// Initialises the connection to the database
let dbConnection = new DatabaseConnection();

io.on("connection", clientSocket => {
    clientSocket.on(REGISTER_EVENTS.REQUEST_REGISTRATION, data => {
        RegistrationOperations.registerUser(clientSocket, dbConnection, data);
    });

    clientSocket.on(LOGIN_EVENTS.REQUEST_LOGIN, data => {
        LoginOperations.login(clientSocket, dbConnection, data);
    });
    
});