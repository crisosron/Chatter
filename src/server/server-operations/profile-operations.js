const PROFILE_EVENTS = require("../../events/profile-events");
const {User} = require("../database-document-models/user-model");
class ProfileOperations{
    static getUserInfo(clientSocket, userID){
        User.findById(userID, (err, res) => {
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

    static getPendingFriendRequests(clientSocket, userID){

        function cb(pendingFriendRequest){
            clientSocket.emit(PROFILE_EVENTS.DELIVER_PENDING_FRIEND_REQUEST, {
                pendingFriendRequest: pendingFriendRequest
            });
        }

        User.findById(userID, (err, res) => {
            if(err){
                console.log("Error in ProfileOperations.getPendingFriendRequests: ", err);
                return;
            }

            for(let i = 0; i < res.pendingFriendRequests.length; i++){
                const pendingUserID = res.pendingFriendRequests[i];
                User.findById(pendingUserID, (err, res) => {
                    console.log(res);
                    cb({pendingFriendID: res._id, pendingFriendUserName: res.userName});
                });
            }
        });

        
    }
}

module.exports = ProfileOperations;