const io = require("socket.io")();
const SOCKET_IO_SERVER_PORT = process.env.SOCKET_IO_SERVER_PORT || 5001
io.listen(SOCKET_IO_SERVER_PORT);
console.log(`Socket.IO server listening on port: ${SOCKET_IO_SERVER_PORT}`);

// Importing event constants
const SEARCH_EVENTS = require("../events/search-events");
const USER_ACTION_EVENTS = require("../events/user-action-events");

// Importing search operation functions
const searchOperations = require("./socket-operations/search-operations");
const userActionOperations = require("./socket-operations/user-action-operations");


io.on("connection", clientSocket => {
    console.log(`New client socket connected: ${clientSocket.id}`);

    // Handling SEARCH_EVENTS
    clientSocket.on(SEARCH_EVENTS.SEARCH_FRIENDS, data => {
        searchOperations.searchFriends(clientSocket, data);
    });

    clientSocket.on(SEARCH_EVENTS.SEARCH_GROUPS, data => {
        searchOperations.searchGroups(clientSocket, data);
    });

    clientSocket.on(SEARCH_EVENTS.SEARCH_UNKNOWN_GROUPS, data => {
        searchOperations.searchUnknownGroups(clientSocket, data);
    });

    clientSocket.on(SEARCH_EVENTS.SEARCH_UNKNOWN_USERS, data => {
        searchOperations.searchUnknownUsers(clientSocket, data);
    });

    // Handling USER_ACTION_EVENTS
    clientSocket.on(USER_ACTION_EVENTS.ADD_FRIEND, data => {
        userActionOperations.addFriend(clientSocket, data);
    });
});

module.exports = io;