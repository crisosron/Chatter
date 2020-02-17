const io = require("socket.io")();
const SOCKET_IO_SERVER_PORT = process.env.SOCKET_IO_SERVER_PORT || 5001
io.listen(SOCKET_IO_SERVER_PORT);
console.log(`Socket.IO server listening on port: ${SOCKET_IO_SERVER_PORT}`);

io.on("connection", clientSocket => {
    console.log(`New client socket connected: ${clientSocket.id}`);
});

module.exports = io;