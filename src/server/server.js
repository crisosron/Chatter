require('dotenv/config');
const {User} = require('./database-document-models/user-model');
const mongoose = require("mongoose");

// Server setup
let io = require("socket.io")();
io.listen(process.env.SERVER_PORT);
console.log("Server listening on port number: ", process.env.SERVER_PORT);

// Establishing connection with mongo db server
//TODO: Put this in a new file?
mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
let dbConnection = mongoose.connection;
dbConnection.once("open", () => {
    console.log("Succesfully established a connection with MongoDB database");
});

io.on("connection", clientSocket => {
    clientSocket.on('register-user', (data) => {
        console.log(`${clientSocket.id} requestd to register a user with the following data: ${data.userName} + ${data.password} + ${data.email}`);
        let newUser = new User({
            userName: data.userName,
            password: data.password,
            email: data.email
        });
        
        newUser.save();
    });
});