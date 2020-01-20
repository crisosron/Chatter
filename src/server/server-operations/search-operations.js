import SEARCH_EVENTS from "../../events/search-events";
class SearchOperations{

    static searchFriends(clientSocket, dbConnection, data){

        // Notice the usage of RegExp - This is so we can do a substring search when looking for the docs in the database
        // (Similar to doing LIKE data.stringQuery% in SQL but case isensitive)
        const query = {userName: new RegExp(data.stringQuery, 'i')}; 

        // TODO: Need to filter out clientSocket's user name from the results
        dbConnection.findDocumentsInCollection("users", query, (results) => {
            if(results.length === 0){
                console.log("No results found as a result of the query for SEARCH_EVENTS.SEARCH_FRIENDS");
                clientSocket.emit(SEARCH_EVENTS.NO_RESULTS_FOUND);
                return;
            }

            const resultingUserNames = [];
            results.map((value, index) => {
                resultingUserNames.push(value.userName);
            });

            clientSocket.emit(SEARCH_EVENTS.DELIVER_RESULTS, {results: resultingUserNames});
        });
    }

    static searchGroups(clientSocket, dbConnection, data){
        const query = {groupName: data.stringQuery};
        dbConnection.findDocumentsInCollection("groups", query, (results) => {
            if(results.length === 0){
                // TODO: Emit SEARCH_EVENTS.NO_RESULTS_FOUND;
                console.log("No results found as a result of the query for SEARCH_EVENTS.SEARCH_GROUPS");
                return;
            }

            // TODO: Emit userNames back to client side?
            console.log(`Results found for query: ${data.stringQuery} for SEARCH_EVENTS.SEARCH_GROUPS`);
            for(let result in results){
                console.log(result.groupName);
            }
        });
    }
}

module.exports = SearchOperations;