const SEARCH_EVENTS = require("../../events/search-events");
const ServerOperationsUtilities = require("../server-operations/server-operations-utilities");
const CommunicationEntity = require("./communication-entity");
const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");
class SearchOperations{

    /**
     * Performs a search through the database based on some string query
     * @param clientSocket {Socket} - Socket object of the client that requested the search
     * @param data {Object} - Object passed through socket io events. In this case, it should contain stringQuery which is the value to be searched for in the collections 
     * @param mode {String} - Indicates whether we are searching for "Friends" or "Groups"
    */
    static search(clientSocket, data, mode){

        // Notice the usage of RegExp - This is so we can do a substring search when looking for the docs in the database
        // (Similar to doing LIKE data.stringQuery% in SQL but case insensitive)
        const query = mode === "Friends" ? {userName: new RegExp(data.stringQuery, 'i')} : {groupName: new RegExp(data.stringQuery, 'i')}; 

        // TODO: Need to filter out clientSocket's user name from the results
        User.find(query, (err, res) => {
            if(err){
                console.log("Error with search: ", err);
                return;
            }

            if(res.length === 0){
                clientSocket.emit(SEARCH_EVENTS.NO_RESULTS_FOUND, {
                    notification: ServerOperationsUtilities.createNotification("danger", "No results found", `No results for '${data.stringQuery}'`)
                });
                return;
            }

            // Creating CommunicationEntity objects for every result
            const resultingCommEntities = [];
            res.forEach(element => {
                if(mode === "Friends") resultingCommEntities.push(new CommunicationEntity(element.userName, element._id));
                else resultingCommEntities.push(new CommunicationEntity(element.userName, element._id));
            });

            clientSocket.emit(SEARCH_EVENTS.DELIVER_RESULTS, {results: resultingCommEntities});
        });

    }

    /**
     * Performs a search for both usernames and groupnames for a given string
     * @param clientSocket {Socket} - Socket object of the client that issued the general search 
     * @param data {Object} - Object passed through socket.io events. In this case, it should contain stringQuery
    */
    static generalSearch(clientSocket, data){
        const userNameQuery = {userName: new RegExp(data.stringQuery, 'i')}
        const groupNameQuery = {groupName: new RegExp(data.stringQuery, 'i')}

        // Obtaining users with a username that is around the same as data.stringQuery and emitting it to frontend
        User.find(userNameQuery, (err, res) => {
            const resultingUserCommEntities = [];
            res.forEach(element => {

                // Filters out thisUser from the results of the query
                if(element._id.toString() === data.thisUser.id) return; // Similar to continue keyword in a js foreach loop

                resultingUserCommEntities.push(new CommunicationEntity(element.userName, element._id));
            });

            clientSocket.emit(SEARCH_EVENTS.DELIVER_GENERAL_SEARCH_USER_RESULTS, {
                resultingUserCommEntities: resultingUserCommEntities
            });    
        });

        // Obtaining groups with a groupName that is around the same as data.stringQuery and emitting it to backend
        Group.find(groupNameQuery, (err, res) => {
            const resultingGroupCommEntities = [];
            res.forEach(element => {
                resultingGroupCommEntities.push(new CommunicationEntity(element.groupName, element._id));
            });

            clientSocket.emit(SEARCH_EVENTS.DELIVER_GENERAL_SEARCH_GROUP_RESULTS, {
                resultingGroupCommEntities: resultingGroupCommEntities
            });
        });
    }

}

module.exports = SearchOperations;