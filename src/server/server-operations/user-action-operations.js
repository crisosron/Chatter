const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");
const ServerOperationsUtilities = require("./server-operations-utilities");
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
                clientSocket.emit(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, {
                    notification: ServerOperationsUtilities.createNotification("danger", "Group Creation Denied", "Groupname is already in use by another group")
                });

            }else{
                let newGroup = new Group({
                    groupName: data.groupName,
                    members: [], // TODO: Need to put creator in here
                    description: "This is a test group" // TODO: Temporary
                });
        
                newGroup.save();

                clientSocket.emit(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, {
                    notification: ServerOperationsUtilities.createNotification("success", "Group Creation Success", "Your group has been created and is ready for use")
                });
            }
        });
    }

    /**
     * Adds a user to another user's friends list
     * @param clientSocket {Socket} - Socket object of the client that issued the add request
     * @param data {Object} - Object passed through socket io events, should contain `addingUserID` and `userToAddID`
    */
    static addFriend(clientSocket, data){

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
    }
}

module.exports = UserActionOperations;