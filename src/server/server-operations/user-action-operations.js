const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");
const USER_ACTION_EVENTS = require("../../events/user-action-events");
const mongoose = require("mongoose");
class UserActionOperations{

    /**
     * Creates a group and saves it into the database
     * @param clientSocket {Socket} - The socket of the group creator
     * @param data {Object} - Data passed through socket io events. In this method, data should contain groupName 
     * 
    */
    static createGroup(clientSocket, data){
        Group.findOne({groupName: data.groupName}, (err, res) => {
            if(res){
                clientSocket.emit(USER_ACTION_EVENTS.CREATE_GROUP_DENIED); // TODO: Create notification for this in the front end. Failure reason is that the groupname is already in use

            }else{
                let newGroup = new Group({
                    groupName: data.groupName,
                    members: [], // TODO: Need to put creator in here
                    description: "This is a test group" // TODO: Temporary
                });
        
                newGroup.save();

                clientSocket.emit(USER_ACTION_EVENTS.CREATE_GROUP_SUCCESS); // TODO: Create notification for this in the front end.
            }
        });
    }

    /**
     * Adds a user to another user's friends list
     * @param clientSocket {Socket} - Socket object of the client that issued the add request
     * @param data {Object} - Object passed through socket io events, should contain `addingUserID` and `userToAddID`
    */
    static addFriend(clientSocket, data){

        // Outer findByID allows us to check validity of preconditions
        User.findById(data.addingUserID, (err, addingUser) => {

            // Checking if the addingUser already has the userToAdd in pendingFriendRequests, or if they are already a friend
            const userToAddObjectID = mongoose.Types.ObjectId(data.userToAddID);

            if(addingUser.pendingFriendRequests.includes(userToAddObjectID)){ // If the request has already been sent previously
                clientSocket.emit(USER_ACTION_EVENTS.ADD_FRIEND_DENIED, {
                    reason: "A friend request has already been sent to this user"
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
                {$addToSet: {pendingFriendRequests: mongoose.Types.ObjectId(data.userToAddID)}}, // Update query
            );
            
            // Adding ObjectID of addingUser into pendingFriendRequests of userToAdd
            User.findOneAndUpdate(
                {_id: data.userToAddID}, // Condition
                {$addToSet: {pendingFriendRequests: mongoose.Types.ObjectId(data.addingUserID)}}, // Update query
            );

            clientSocket.emit(USER_ACTION_EVENTS.ADD_FRIEND_SENT);
                
        });
    }

    static confirmFriendRequest(clientSocket, data){

    }
}

module.exports = UserActionOperations;