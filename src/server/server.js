require("dotenv").config();

let io = require("socket.io")();
io.listen(process.env.SERVER_PORT);
console.log("Server listening on port number: ", process.env.SERVER_PORT);

io.on("connection", clientSocket => {
    console.log("Client connection detected: ", clientSocket.id);
});
