const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");
const USER_ACTION_EVENTS = require("../../constants/events/user-action-events");
const mongoose = require("mongoose");
const shortid = require("shortid");
/**
 * Adds a user to another user's friends list
 * @param clientSocket {Socket} - Socket object of the client that issued the add request
 * @param data {Object} - Object passed through socket io events, should contain `addingUserID` and `userToAddID`
*/
function addFriend(clientSocket, data){
    
    // Outer findByID allows us to check validity of preconditions
    User.findById(data.addingUserID, (err, addingUser) => {

        if(err){
            console.log("Error in UserActionOperations.addFriend: ", err);
            return;
        }

        // Checking if the addingUser already has the userToAdd in pendingFriendRequests, or if they are already a friend
        const userToAddObjectID = mongoose.Types.ObjectId(data.userToAddID);

        if(addingUser.pendingFriendRequests.includes(userToAddObjectID)){ // If the request has already been sent previously
            clientSocket.emit(USER_ACTION_EVENTS.ADD_FRIEND_DENIED, {
                reason: "You already have a pending friend request with this user"
            });                
            return;

        }else if(addingUser.friends.includes(userToAddObjectID)){ // If they are already friends
            clientSocket.emit(USER_ACTION_EVENTS.ADD_FRIEND_DENIED, {
                reason: "This user has already been added"
            });
            return;
        }

        // Adding ObjectID of userToAdd into pendingFriendRequests of addingUser
        User.findOneAndUpdate(
            {_id: data.addingUserID}, // Condition
            {$addToSet: {pendingFriendRequests: data.userToAddID}}, // Update query
            (err, doc) => {
                if(err) console.log("Error placing userToAdd into addingUser pending friend requests: ",err);
            }
        );
        
        // Adding ObjectID of addingUser into pendingFriendRequests of userToAdd
        User.findOneAndUpdate(
            {_id: data.userToAddID}, // Condition
            {$addToSet: {pendingFriendRequests: data.addingUserID}}, // Update query
            (err, doc) => {
                if(err) console.log("Error placing addingUser into userToAdd pending friend requests: ",err);
            }
        );
        
        clientSocket.emit(USER_ACTION_EVENTS.ADD_FRIEND_SENT);
            
    });
}

function generateGroupCode(clientSocket){
    clientSocket.emit(USER_ACTION_EVENTS.DELIVER_JOIN_CODE, {
        generatedJoinCode: shortid.generate()
    });
}

function confirmFriendRequest(clientSocket, data){
}

module.exports = {addFriend, generateGroupCode, confirmFriendRequest};