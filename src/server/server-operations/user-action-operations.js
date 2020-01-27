const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");
const ServerOperationsUtilities = require("./server-operations-utilities");
const USER_ACTION_EVENTS = require("../../events/user-action-events");
class UserActionOperations{

    /**
     * Creates a group and saves it into the database
     * @param clientSocket {Socket} - The socket of the group creator
     * @param dbConnection {DatabaseConnection} - {@link DatabaseConnection} instance so that the database can be manipulated
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
     * @param dbConnection {DatabaseConnection} - {@link DatabaseConnection} instance to manipulate the database
     * @param data {Object} - Object passed through socket io events, should contain `addingUserID` and `userToAddID`
    */
    static addFriend(clientSocket, dbConnection, data){
        User.findOne({_id: data.addingUserID}, (err, addingUser) => {
            console.log("In findOne cb for addingUser. addinguser.pendingFrienRequests.length: ", addingUser.pendingFriendRequests.length);
            if(err){
                console.log("Error detected with findOne: ", err);
                return;
            }
            addingUser.pendingFriendRequests.push(data.userToAddID);
            // console.log(addingUser);
            // console.log(addingUser.pendingFriendRequests.length);
        });

        User.findOne({_id: data.userToAddID}, (err, userToAdd) => {
            console.log("In findOne cb for userToAdd. addinguser.pendingFrienRequests.length: ", userToAdd.pendingFriendRequests.length);
            if(err){
                console.log("Error detected with findOne: ", err);
                return;
            }
            userToAdd.pendingFriendRequests.push(data.addingUserID);
            // console.log(userToAdd);
            // console.log(userToAdd.pendingFriendRequests.length);
        });

        User.findOne({_id: data.addingUserID}, (err, addingUser) => {
            console.log("------------ ADDING USER DETAILS -------------");
            console.log(addingUser);
        });

        User.findOne({_id: data.userToAddID}, (err, userToAdd) => {
            console.log("------------ USER TO ADD DETAILS -------------");
            console.log(userToAdd);
        });

    }
}

module.exports = UserActionOperations;