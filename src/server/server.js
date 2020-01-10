require('dotenv/config');
const mongoose = require("mongoose");

// Server setup
let io = require("socket.io")();
io.listen(process.env.SERVER_PORT);
console.log("Server listening on port number: ", process.env.SERVER_PORT);

// Establishing connection with mongo db server
mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once("open", () => {
    console.log("Succesfully established a connection with MongoDB database");
});

io.on("connection", clientSocket => {
    console.log("Client connection detected: ", clientSocket.id);
});