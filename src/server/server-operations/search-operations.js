const SEARCH_EVENTS = require("../../events/search-events");
const ServerOperationsUtilities = require("../server-operations/server-operations-utilities");
class SearchOperations{

    /**
     * Performs a search through the database based on some string query
     * @param clientSocket {Socket} - Socket object of the client that requested the search
     * @param dbConnection {DatabaseConnection} - DatabaseConnection object to perform the query with the databse
     * @param data {Object} - Object passed through socket io events. In this case, it should contain stringQuery which is the value to be searched for in the collections 
     * @param mode {String} - Indicates whether we are searching for "Friends" or "Groups"
    */
    static search(clientSocket, dbConnection, data, mode){

        // Notice the usage of RegExp - This is so we can do a substring search when looking for the docs in the database
        // (Similar to doing LIKE data.stringQuery% in SQL but case insensitive)
        const query = mode === "Friends" ? {userName: new RegExp(data.stringQuery, 'i')} : {groupName: new RegExp(data.stringQuery, 'i')}; 

        // TODO: Need to filter out clientSocket's user name from the results
        dbConnection.findDocumentsInCollection(mode === "Friends" ? "users" : "groups", query, (results) => {
            if(results.length === 0){
                console.log("No results found as a result of the query for SEARCH_EVENTS.SEARCH_FRIENDS");
                clientSocket.emit(SEARCH_EVENTS.NO_RESULTS_FOUND, {
                    notification: ServerOperationsUtilities.createNotification("danger", "No results found", `No results for '${data.stringQuery}'`)
                });
                return;
            }

            const resultingNames = [];

            results.forEach(element => {
                if(mode === "Friends") resultingNames.push(element.userName);
                else resultingNames.push(element.groupName);
            });

            clientSocket.emit(SEARCH_EVENTS.DELIVER_RESULTS, {results: resultingNames});
        });
    }

    /**
     * Performs a search for both usernames and groupnames for a given string
     * @param clientSocket {Socket} - Socket object of the client that issued the general search 
     * @param dbConnection {DatabaseConnection} - {@link DatabaseConnection} object to perform the query with the database
     * @param data {Object} - Object passed through socket.io events. In this case, it should contain stringQuery
    */
    static generalSearch(clientSocket, dbConnection, data){
        const userNameQuery = {userName: new RegExp(data.stringQuery, 'i')}
        const groupNameQuery = {groupName: new RegExp(data.stringQuery, 'i')}
        const resultingUserNames = [];
        const resultingGroupNames = [];

        dbConnection.findDocumentsInCollection("users", userNameQuery, (results) => {
            results.forEach(element => {
                resultingUserNames.push(element.userName);
            });
        });

        dbConnection.findDocumentsInCollection("groups", groupNameQuery, (results) => {
            results.forEach(element => {
                resultingGroupNames.push(element.groupName);
            });
        });
        
        clientSocket.emit(SEARCH_EVENTS.DELIVER_GENERAL_SEARCH_RESULTS, {
            resultingUserNames: resultingUserNames,
            resultingGroupNames: resultingGroupNames
        });

    }

}

module.exports = SearchOperations;