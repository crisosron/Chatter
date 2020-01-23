require('dotenv/config');
const DatabaseConnection = require("./database-connection");
const REGISTER_EVENTS = require("../events/register-events");
const LOGIN_EVENTS = require("../events/login-events");
const SEARCH_EVENTS = require("../events/search-events");
const LoginRegistrationOperations = require("./server-operations/login-registration-operations");
const SearchOperations = require("./server-operations/search-operations");
const ServerOperationsUtilities = require("./server-operations/server-operations-utilities");

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

    clientSocket.on(SEARCH_EVENTS.SEARCH_FRIENDS, data => {
        SearchOperations.search(clientSocket, dbConnection, data, "Friends");
    });

    clientSocket.on(SEARCH_EVENTS.SEARCH_GROUPS, data => {
        SearchOperations.search(clientSocket, dbConnection, data, "Groups");
    });

    clientSocket.on(SEARCH_EVENTS.PERFORM_GENERAL_SEARCH, data => {
        SearchOperations.generalSearch(clientSocket, dbConnection, data);
    });

    clientSocket.on(SEARCH_EVENTS.INVALID_SEARCH_STRING, () => {
        clientSocket.emit(SEARCH_EVENTS.INVALID_SEARCH_STRING, {
            notification: ServerOperationsUtilities.createNotification("danger", "Invalid Search Value", "Please enter a valid search keyword", 3000)
        });
    });
    
});