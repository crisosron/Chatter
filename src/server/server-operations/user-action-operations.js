const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");
const USER_ACTION_EVENTS = require("../../events/user-action-events");
const mongoose = require("mongoose");
const shortid = require("shortid");
class UserActionOperations{

    /**
     * Creates a group and saves it into the database
     * @param clientSocket {Socket} - The socket of the group creator
     * @param data {Object} - Data passed through socket io events. In this method, data should contain groupName 
     * 
    */
    static createGroup(clientSocket, data){
        Group.findOne({groupName: data.groupName}, (err, res) => {

            // If a group with the given name already exists, deny the group creation
            if(res){
                clientSocket.emit(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, {
                    reason: `A group with the name ${data.groupName} already exists`
                });
            } else if(data.groupName.length < 2){
                clientSocket.emit(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, {
                    reason: `A group name must have at least 2 characters`
                });
            
            }else{
                let newGroup = new Group({
                    groupName: data.groupName,
                    members: [mongoose.Types.ObjectId(data.creatorID)],
                    description: data.groupDescription,
                    joinCode: data.joinCode
                });
        
                newGroup.save();

                // TODO: Fix this, the group._id is not being added to the array of groups that the creator is associated with
                User.findOneAndUpdate({_id: data.creatorID}, {$addToSet: {groups: newGroup._id}});
                clientSocket.emit(USER_ACTION_EVENTS.CREATE_GROUP_SUCCESS);
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
    
    static generateGroupCode(clientSocket){
        clientSocket.emit(USER_ACTION_EVENTS.DELIVER_JOIN_CODE, {
            generatedJoinCode: shortid.generate()
        });
    }

    static confirmFriendRequest(clientSocket, data){
    }
}

module.exports = UserActionOperations;