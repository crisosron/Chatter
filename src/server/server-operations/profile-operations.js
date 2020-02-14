const PROFILE_EVENTS = require("../../events/profile-events");
const {User} = require("../database-document-models/user-model");
class ProfileOperations{
    
    /**
     *  Obtains information of the user with the provided userID
     *  @param clientSocket {Socket} - Socket object of the requesting client
     *  @param userID {string} - ID of the user in the Users collection whose information needs to be obtained
     */
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
    
    /**
     *  Gets all the pending friend requests of the user with the supplied userID and sends it to the requesting client
     *  @param clientSocket {Socket} - Socket object of the requesting client
     *  @param userID {String} - ID of the user in the Users collection whose pending friend requests need to be obtained
     */
    static getPendingFriendRequests(clientSocket, userID){
        let pendingFriendRequests = [];
        const cb = (pendingFriendRequest, isLastRequest) => {
            pendingFriendRequests.push(pendingFriendRequest);
            if(isLastRequest) clientSocket.emit(PROFILE_EVENTS.DELIVER_PENDING_FRIEND_REQUEST, {pendingFriendRequests: pendingFriendRequests});
        }

        User.findById(userID, (err, res) => {
            for(let i = 0; i < res.pendingFriendRequests.length; i++){
                User.findById(res.pendingFriendRequests[i], (err, res) => {
                    cb({id: res._id, userName: res.userName}, i === res.pendingFriendRequests.length - 1);
                });
            }
        });
    }
}

module.exports = ProfileOperations;