class SearchOperations{

    static searchFriends(clientSocket, dbConnection, data){
        const query = {userName: data.stringQuery};
        dbConnection.findDocumentsInCollection("users", query, (results) => {
            if(results.length === 0){
                // TODO: Emit SEARCH_EVENTS.NO_RESULTS_FOUND;
                console.log("No results found as a result of the query for SEARCH_EVENTS.SEARCH_FRIENDS");
                return;
            }

            // TODO: Emit userNames back to client side?
            console.log(`Results found for query: ${data.stringQuery} for SEARCH_EVENTS.SEARCH_FRIENDS`);
            console.log(`Number of results: ${results.length}`);
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