const PROFILE_EVENTS = require("../../events/profile-events");
const {User} = require("../database-document-models/user-model");
    
/**
 *  Obtains information of the user with the provided userID
 *  @param clientSocket {Socket} - Socket object of the requesting client
 *  @param data {Object} - Data object passed through Socket.io events - In this case, it should containt `data.id` of the user in the Users collection whose info is obtained by this function
 */
function getUserInfo(clientSocket, data){
    User.findById(data.id, (err, res) => {
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
 *  @param data {Object} - Data object containing data.id of the user in the Users collection whose pending friend requests need to be obtained
 */
function getPendingFriendRequests(clientSocket, data){
    let pendingFriendRequests = [];

    /**
     *  Callback function called within nested User.findById (callback function needed due to asynchronous nature of mongoose db querying functions)
     *  @param pendingFriendRequest {Object} - An object that represents a pending friend request. Should contain {id:xxx, userName:xxx}
     *  @param isLastRequest {boolean} - If true, the callback function will emit pendingFriendRequests array to the client
     */
    const cb = (pendingFriendRequest, isLastRequest) => {
        pendingFriendRequests.push(pendingFriendRequest);
        if(isLastRequest) clientSocket.emit(PROFILE_EVENTS.DELIVER_PENDING_FRIEND_REQUEST, {pendingFriendRequests: pendingFriendRequests});
    }

    // Outer User.findById is used to find the user whose pending friend requests need to be obtained
    User.findById(data.id, (err, res) => {
        for(let i = 0; i < res.pendingFriendRequests.length; i++){

            // Inner User.findByID is used to get the usernames of the users who have pending friend requests with the issuing user
            User.findById(res.pendingFriendRequests[i], (err, res) => {
                cb({id: res._id, userName: res.userName}, i === res.pendingFriendRequests.length - 1);
            });
        }
    });
}

/**
 *  Function that confirms whether or not the password entered by the user to make changes to their account information is valid
 *  @param clientSocket {Socket} - Socket object of the client that issued the request
 *  @param data {Object} - Object containing data.id (of requesting User) data.enteredPassword to check against the actual password of the requesting user
 */
function requestEnableChanges(clientSocket, data){
    User.findById(data.id, (err, res) => {
        if(res.password === data.enteredPassword) clientSocket.emit(PROFILE_EVENTS.CONFIRM_ENABLE_CHANGES);
        else clientSocket.emit(PROFILE_EVENTS.DENY_ENABLE_CHANGES);
    });
}

module.exports = {getUserInfo, getPendingFriendRequests, requestEnableChanges};