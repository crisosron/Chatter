require('dotenv/config');
const express = require("express");
const app = express();
const DatabaseConnection = require("./database-connection");

// Importing event enums
const REGISTER_EVENTS = require("../events/register-events");
const LOGIN_EVENTS = require("../events/login-events");
const SEARCH_EVENTS = require("../events/search-events");
const USER_ACTION_EVENTS = require("../events/user-action-events");
const PROFILE_EVENTS = require("../events/profile-events");

// Singleton classes for their static methods
const LoginRegistrationOperations = require("./server-operations/login-registration-operations");
const SearchOperations = require("./server-operations/search-operations");
const UserActionOperations = require("./server-operations/user-action-operations");
const ProfileOperations = require("./server-operations/profile-operations");

// Server setup
const EXPRESS_SERVER_PORT = process.env.SERVER_PORT || 5000;

// Middleware to handle raw json
app.use(express.json());

// Middleware to handle encoded data from form submissions
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Handles login
app.get("/", (req, res) => {
    console.log(req.body);
});

// Handles user registration
app.use("/", require("./routes/login-register-routes"));

app.listen(EXPRESS_SERVER_PORT, () => console.log("Express server listening on port number: ", EXPRESS_SERVER_PORT));

// Server setup
// let io = require("socket.io")();
// io.listen(process.env.SERVER_PORT);
// console.log("Server listening on port number: ", process.env.SERVER_PORT);

// Initialises the connection to the database
let dbConnection = new DatabaseConnection();

// io.on("connection", clientSocket => {
//     console.log("New client connected: ", clientSocket.id);
//     clientSocket.on(REGISTER_EVENTS.REQUEST_REGISTRATION, data => {
//         LoginRegistrationOperations.registerUser(clientSocket, data);
//     });

//     clientSocket.on(LOGIN_EVENTS.REQUEST_LOGIN, data => {
//         LoginRegistrationOperations.login(clientSocket, data);
//     });

//     clientSocket.on(SEARCH_EVENTS.SEARCH_FRIENDS, data => {
//         SearchOperations.searchFriends(clientSocket, data);
//     });

//     clientSocket.on(SEARCH_EVENTS.SEARCH_GROUPS, data => {
//         SearchOperations.searchGroups(clientSocket, data);
//     });

//     clientSocket.on(SEARCH_EVENTS.SEARCH_UNKNOWN_USERS, data => {
//         SearchOperations.searchUnknownUsers(clientSocket, data);
//     });

//     clientSocket.on(SEARCH_EVENTS.SEARCH_UNKNOWN_GROUPS, data => {
//         SearchOperations.searchUnknownGroups(clientSocket, data);
//     });

//     clientSocket.on(USER_ACTION_EVENTS.CREATE_GROUP, data => {
//         UserActionOperations.createGroup(clientSocket, data);
//     });

//     clientSocket.on(USER_ACTION_EVENTS.GENERATE_JOIN_CODE, () => {
//         UserActionOperations.generateGroupCode(clientSocket);
//     });

//     clientSocket.on(USER_ACTION_EVENTS.ADD_FRIEND, data => {
//         UserActionOperations.addFriend(clientSocket, data);
//     });

//     clientSocket.on(PROFILE_EVENTS.GET_USER_INFO, data => {
//         ProfileOperations.getUserInfo(clientSocket, data.id);
//     });

//     clientSocket.on(PROFILE_EVENTS.GET_PENDING_FRIEND_REQUESTS, data => {
//         ProfileOperations.getPendingFriendRequests(clientSocket, data.id);
//     });
// });