const LOGIN_EVENTS = require("../../events/login-events");
const ServerOperationsUtilities = require("./server-operations-utilities");
class LoginOperations{
    static login(clientSocket, dbConnection, data){
        dbConnection.documentExistsInCollection("users", {userName: data.userName, password: data.password}, userExists => {
            if(userExists){
                clientSocket.emit(LOGIN_EVENTS.LOGIN_SUCCESFUL, {
                    notification: ServerOperationsUtilities.createNotification("success", "Login Succesful", "Please wait to be redirected")                  
                });
                return;
            }

            clientSocket.emit(LOGIN_EVENTS.LOGIN_DENIED, {
                notification: ServerOperationsUtilities.createNotification("danger", "Login Denied", "Please check your login credentials")
            });
            return;
        });
    }
}

module.exports = LoginOperations;