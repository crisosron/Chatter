const {User} = require("../database-document-models/user-model");
const ServerOperationsUtilities = require("./server-operations-utilities");
const REGISTER_EVENTS = require("../../events/register-events");
const LOGIN_EVENTS = require("../../events/login-events");

class LoginRegistrationOperations{

    /**
     * Registers a new user by adding them to the database. Performs precondition checks on whether or not the supplied details are already
     * in use by another user
     * @param clientSocket {Object} - Socket of the client that requested the registration of a new user
     * @param data {Object} - An object passed through socket.io events. For this method, data should include userName, email and password
    */
    static registerUser(clientSocket, data){
        User.findOne({userName: data.userName}, (err, res) => {
            if(err){
                console.log(`Error in LoginRegistrationOperations.registerUser with userName query: ${err}`);
                return;
            }

            // If the given username is already registered, deny registration
            if(res !== null){
                clientSocket.emit(REGISTER_EVENTS.REGISTRATION_DENIED, {
                    notification: ServerOperationsUtilities.createNotification("danger", "Registration Denied", "Username already exists")
                });
                return;
            }

            User.findOne({email: data.email}, (err, res) => {
                if(err){
                    console.log(`Error in LoginRegistrationOperations.registerUser with email query: ${err}`);
                    return;
                }

                // If the given email is already in use, deny registration
                if(res !== null){
                    clientSocket.emit(REGISTER_EVENTS.REGISTRATION_DENIED, {
                        notification: ServerOperationsUtilities.createNotification("danger", "Registration Denied", "Email is already in use")
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

                clientSocket.emit(REGISTER_EVENTS.REGISTRATION_SUCCESSFUL, {
                    notification: ServerOperationsUtilities.createNotification("success", "Registration Succesful", "Please wait to be redirected to login page"),
                });
            });
        });
    }

    /**
     * Logs a client in by checking their supplied details against the database
     * @param clientSocket {Object} - Socket of the client that issued the login request
     * @param data {Object} - Object passed through socket.io events. Should contain userName and password properties
    */
    static login(clientSocket, data){
        User.findOne({userName: data.userName, password: data.password}, (err, result) => {
            if(err){
                console.log(`Error in LoginRegistrationOperations.login: ${err}`);
                return;
            }

            if(result){
                clientSocket.emit(LOGIN_EVENTS.LOGIN_SUCCESFUL, {
                    notification: ServerOperationsUtilities.createNotification("success", "Login Succesful", "Please wait to be redirected")                  ,
                    thisUser: {
                        id: result._id, // Id of document in the database
                    }
                });
                return;
            }

            clientSocket.emit(LOGIN_EVENTS.LOGIN_DENIED, {
                notification: ServerOperationsUtilities.createNotification("danger", "Login Denied", "Please check your login credentials")
            });    
        });
    }
}

module.exports = LoginRegistrationOperations;