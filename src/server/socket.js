const io = require("socket.io")();
const SOCKET_IO_SERVER_PORT = process.env.SOCKET_IO_SERVER_PORT || 5001
io.listen(SOCKET_IO_SERVER_PORT);
console.log(`Socket.IO server listening on port: ${SOCKET_IO_SERVER_PORT}`);

// Importing event constants
const SEARCH_EVENTS = require("../events/search-events");

// Importing search operation functions
const searchOperations = require("./socket-operations/search-operations");

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
});

module.exports = io;