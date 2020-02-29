const SEARCH_EVENTS = require("../../events/search-events");
const CommunicationEntity = require("./communication-entity");
const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");

/**
 * Performs a search for friends of the user
 * @param clientSocket {Socket} - Socket object of the client that requested the search
 * @param data {Object} - Object passed through socket io events. In this case, it should contain stringQuery which is the value to be searched for in the collections 
*/
function searchFriends(clientSocket, data){
    // Notice the usage of RegExp - This is so we can do a substring search when looking for the docs in the database
    // (Similar to doing LIKE data.stringQuery% in SQL but case insensitive)
    const query = {userName: new RegExp(data.stringQuery, 'i')};

    // TODO: Need to filter out clientSocket's user name from the results
    User.find(query, (err, res) => {
        if(err){
            console.log("Error with search: ", err);
            return;
        }

        if(res.length === 0){
            clientSocket.emit(SEARCH_EVENTS.NO_RESULTS_FOUND, {
                message: `No results for: ${data.stringQuery}`
            });
            return;
        }

        // Creating CommunicationEntity objects for every result
        const resultingCommEntities = [];
        res.forEach(element => {
            resultingCommEntities.push(new CommunicationEntity(element.userName, element._id));
        });

        clientSocket.emit(SEARCH_EVENTS.DELIVER_RESULTS, {results: resultingCommEntities});
    });
}

/**
 * Performs a search for groups in the database that the user is in based on a given groupName
 * @param clientSocket {Socket} - Socket object of the client that requested the search
 * @param data {Object} - Object passed through socket io events. In this case, it should contain stringQuery which is the value to be searched for in the collections 
*/
function searchGroups(clientSocket, data){
    const query = {groupName: new RegExp(data.stringQuery, 'i')};

    Group.find(query, (err, res) => {
        if(err){
            console.log("Error with search: ", err);
            return;
        }

        if(res.length === 0){
            clientSocket.emit(SEARCH_EVENTS.NO_RESULTS_FOUND, {
                message: `No results for: ${data.stringQuery}`
            });
            return;
        }

        // Creating CommunicationEntity objects for every result
        const resultingCommEntities = [];
        res.forEach(element => {
            resultingCommEntities.push(new CommunicationEntity(element.groupName, element._id));
        });

        clientSocket.emit(SEARCH_EVENTS.DELIVER_RESULTS, {results: resultingCommEntities});
    });
}


/**
 * Performs a search for usernames around the same as the given string in the data parameter
 * @param clientSocket {Socket} - Socket object of the client that issued the general search 
 * @param data {Object} - Object passed through socket.io events. In this case, it should contain stringQuery and thisUser
*/
function searchUnknownUsers(clientSocket, data){
    const userNameQuery = {userName: new RegExp(data.stringQuery, 'i')}

    // Obtaining users with a username that is around the same as data.stringQuery and emitting it to frontend
    User.find(userNameQuery, (err, res) => {
        const resultingUserCommEntities = [];
        res.forEach(element => {

            // Filters out thisUser from the results of the query
            if(element._id.toString() === data.thisUser.id) return; // Similar to continue keyword in a js foreach loop

            resultingUserCommEntities.push(new CommunicationEntity(element.userName, element._id));
        });

        clientSocket.emit(SEARCH_EVENTS.DELIVER_UNKNOWN_USER_SEARCH_RESULTS, {
            resultingUserCommEntities: resultingUserCommEntities
        });    
    });
}

/**
 * Performs a search for group names around the same as the given string in the data parameter
 * @param clientSocket {Socket} - Socket object of the client that issued the general search 
 * @param data {Object} - Object passed through socket.io events. In this case, it should contain stringQuery
*/
function searchUnknownGroups(clientSocket, data){
    const groupNameQuery = {groupName: new RegExp(data.stringQuery, 'i')}

    // Obtaining groups with a groupName that is around the same as data.stringQuery and emitting it to backend
    Group.find(groupNameQuery, (err, res) => {
        const resultingGroupCommEntities = [];
        res.forEach(element => {
            resultingGroupCommEntities.push(new CommunicationEntity(element.groupName, element._id));
        });

        clientSocket.emit(SEARCH_EVENTS.DELIVER_UNKNOWN_GROUP_SEARCH_RESULTS, {
            resultingGroupCommEntities: resultingGroupCommEntities
        });
    });
}

module.exports = {searchFriends, searchGroups, searchUnknownUsers, searchUnknownGroups};