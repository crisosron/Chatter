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
    static createGroup(clientSocket, dbConnection, data){

        dbConnection.singleDocumentExistsInCollection("groups", {groupName: data.groupName}, groupExists => {
            if(groupExists){
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
}

module.exports = UserActionOperations;