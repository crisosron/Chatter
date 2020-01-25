const SEARCH_EVENTS = require("../../events/search-events");
const ServerOperationsUtilities = require("../server-operations/server-operations-utilities");
const CommunicationEntity = require("./communication-entity");
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
                clientSocket.emit(SEARCH_EVENTS.NO_RESULTS_FOUND, {
                    notification: ServerOperationsUtilities.createNotification("danger", "No results found", `No results for '${data.stringQuery}'`)
                });
                return;
            }

            const resultingCommEntities = [];

            results.forEach(element => {
                if(mode === "Friends") resultingCommEntities.push(new CommunicationEntity(element.userName, element._id));
                else resultingCommEntities.push(new CommunicationEntity(element.userName, element._id));
            });

            clientSocket.emit(SEARCH_EVENTS.DELIVER_RESULTS, {results: resultingCommEntities});
        });
    }

    /**
     * Performs a search for both usernames and groupnames for a given string
     * @param clientSocket {Socket} - Socket object of the client that issued the general search 
     * @param dbConnection {DatabaseConnection} - {@link DatabaseConnection} object to perform the query with the database
     * @param data {Object} - Object passed through socket.io events. In this case, it should contain stringQuery
    */
    static generalSearch(clientSocket, dbConnection, data){
        console.log("Inside generalSearch method. Querying for string: ", data.stringQuery);
        const userNameQuery = {userName: new RegExp(data.stringQuery, 'i')}
        const groupNameQuery = {groupName: new RegExp(data.stringQuery, 'i')}
        const resultingUserCommEntities = [];
        const resultingGroupCommEntities = [];

        dbConnection.findDocumentsInCollection("users", userNameQuery, (results) => {
            for(let result in results){
                resultingUserCommEntities.push(new CommunicationEntity(result.userName, result._id));
            }
        });
        console.log("Ended first findDocumentsInCollection call. resultingUserCommEntities.length: ", resultingUserCommEntities.length);

        dbConnection.findDocumentsInCollection("groups", groupNameQuery, results => {
            for(let result in results){
                resultingGroupCommEntities.push(new CommunicationEntity(result.groupName, result._id));
            }
        });
        console.log("Ended first findDocumentsInCollection call. resultingUserCommEntities.length: ", resultingUserCommEntities.length);


        // dbConnection.findDocumentsInCollection("users", userNameQuery, (results) => {
        //     if(results.length === 0) console.log("No results found for users");
        //     results.forEach(element => {
        //         console.log(`Adding user ${element.userName} to resultingUserCommEntities`);
        //         resultingUserCommEntities.push(new CommunicationEntity(element.userName, element._id));
        //         console.log("resultingUserCommEntites.length: ", 1);
        //     });

        //     dbConnection.findDocumentsInCollection("groups", groupNameQuery, (results) => {
        //         if(results.length === 0) console.log("No results found for users");
        //         results.forEach(element => {
        //             console.log(`Adding group ${element.groupName} to resultingGroupCommEntities`);
        //             resultingGroupCommEntities.push(new CommunicationEntity(element.groupName, element._id));
        //             console.log("resultingGroupCommEntites.length: ", 1);
        //         });
        //     });

        //     clientSocket.emit(SEARCH_EVENTS.DELIVER_GENERAL_SEARCH_RESULTS, {
        //         resultingUserCommEntities: resultingUserCommEntities,
        //         resultingGroupCommEntities: resultingGroupCommEntities
        //     });
    
        // });
        

    }

}

module.exports = SearchOperations;