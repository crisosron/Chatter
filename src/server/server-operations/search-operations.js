import SEARCH_EVENTS from "../../events/search-events";
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
                clientSocket.emit(SEARCH_EVENTS.NO_RESULTS_FOUND);
                return;
            }

            const resultingNames = [];
            results.map((value, index) => {
                resultingNames.push(value.userName);
            });

            clientSocket.emit(SEARCH_EVENTS.DELIVER_RESULTS, {results: resultingNames});
        });
    }

}

module.exports = SearchOperations;