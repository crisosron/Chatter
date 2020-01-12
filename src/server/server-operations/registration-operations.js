const {User} = require("../database-document-models/user-model");
const REGISTER_EVENTS = require("../../events/register-events");
class RegistrationOperations{

    /**
     * Registers a new user by adding them to the database. Performs precondition checks on whether or not the supplied details are already
     * in use by another user
     * @param clientSocket {Object} - Socket of the client that requested the registration of a new user
     * @param dbConnection {DatabaseConnection} - Connection to the database
     * @param data {Object} - An object passed through socket.io events. For this method, data should include userName, email and password
     * 
    */
    static registerUser(clientSocket, dbConnection, data){

        // Outer documentExistsInCollection call checks if the username is already in use
        // Note that a callback function is required since documentExistsInCollection uses findOne native MongoDB method, which in turn,
        // also uses a callback function to determine whether or not there is a result with the given query. The callback function
        // is asynchronous and cannot return a value, therefore we must pass a callback function to documentExistsInCollection so that the callback
        // func that is passed in as a parameter can be called within the callback function used inside findOne with the results of the query
        dbConnection.documentExistsInCollection("users", {userName: data.userName}, userNameExists => {
            if(userNameExists) {
                clientSocket.emit(REGISTER_EVENTS.REGISTRATION_DENIED, {
                    message: "Username already exists"
                });
                return;
            }

            // Inner documentExistsInCollection call checks if the email is already in use
            dbConnection.documentExistsInCollection("users", {email: data.email}, emailExists => {
                if(emailExists){
                    clientSocket.emit(REGISTER_EVENTS.REGISTRATION_DENIED, {
                        message: "Email already in use"
                    });
                    return;
                }

                // Creating a new User document to be stored into the database
                let newUser = new User({
                    userName: data.userName,
                    password: data.password,
                    email: data.email
                });

                // Storing the new User document to the database
                newUser.save();

                clientSocket.emit(REGISTER_EVENTS.REGISTRATION_SUCCESSFUL);
            })
        });
    }
}

module.exports = RegistrationOperations;