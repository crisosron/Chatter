const PROFILE_EVENTS = require("../../events/profile-events");
const {User} = require("../database-document-models/user-model");
class ProfileOperations{
    static getUserInfo(clientSocket, dbID){
        User.findById(dbID, (err, res) => {
            if(err){
                console.log("Error in ProfileOperations.getUserInfo: ", err);
                return;
            }

            clientSocket.emit(PROFILE_EVENTS.DELIVER_USER_INFO, {
                userName: res.userName,
                password: res.password, // TODO: Consider security implications of this.........
                email: res.email
            });
        });
    }
}

module.exports = ProfileOperations;