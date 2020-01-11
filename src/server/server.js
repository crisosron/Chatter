require('dotenv/config');
const DatabaseConnection = require("./database-connection");
const REGISTER_EVENTS = require("../events/register-events");
const RegistrationOperations = require("./server-operations/registration-operations");

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
});