const SERVER_PORT_NUM = 8000;
let io = require("socket.io")();
io.listen(SERVER_PORT_NUM);
console.log("Server listening on port number: ", SERVER_PORT_NUM);

io.on("connection", clientSocket => {
    console.log("Client connection detected: ", clientSocket.id);
});
