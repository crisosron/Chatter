require('dotenv/config');
const DatabaseConnection = require("./database-connection");

// Importing event enums
const REGISTER_EVENTS = require("../events/register-events");
const LOGIN_EVENTS = require("../events/login-events");
const SEARCH_EVENTS = require("../events/search-events");
const USER_ACTION_EVENTS = require("../events/user-action-events");

// Singleton classes for their static methods
const LoginRegistrationOperations = require("./server-operations/login-registration-operations");
const SearchOperations = require("./server-operations/search-operations");
const UserActionOperations = require("./server-operations/user-action-operations");
const ServerOperationsUtilities = require("./server-operations/server-operations-utilities");

// Server setup
let io = require("socket.io")();
io.listen(process.env.SERVER_PORT);
console.log("Server listening on port number: ", process.env.SERVER_PORT);

// Initialises the connection to the database
let dbConnection = new DatabaseConnection();

io.on("connection", clientSocket => {
    clientSocket.on(REGISTER_EVENTS.REQUEST_REGISTRATION, data => {
        LoginRegistrationOperations.registerUser(clientSocket, data);
    });

    clientSocket.on(LOGIN_EVENTS.REQUEST_LOGIN, data => {
        LoginRegistrationOperations.login(clientSocket, data);
    });

    clientSocket.on(SEARCH_EVENTS.SEARCH_FRIENDS, data => {
        SearchOperations.search(clientSocket, data, "Friends");
    });

    clientSocket.on(SEARCH_EVENTS.SEARCH_GROUPS, data => {
        SearchOperations.search(clientSocket, data, "Groups");
    });

    clientSocket.on(SEARCH_EVENTS.PERFORM_GENERAL_SEARCH, data => {
        SearchOperations.generalSearch(clientSocket, data);
    });

    clientSocket.on(USER_ACTION_EVENTS.CREATE_GROUP, data => {
        UserActionOperations.createGroup(clientSocket, data);
    });

    clientSocket.on(USER_ACTION_EVENTS.ADD_FRIEND, data => {
        console.log("Received event USER_ACTION_EVENTS.ADD_FRIEND");
        UserActionOperations.addFriend(clientSocket, data);
    });

    clientSocket.on(SEARCH_EVENTS.INVALID_SEARCH_STRING, () => {
        clientSocket.emit(SEARCH_EVENTS.INVALID_SEARCH_STRING, {
            notification: ServerOperationsUtilities.createNotification("danger", "Invalid Search Value", "Please enter a valid search keyword", 3000)
        });
    });
    
});