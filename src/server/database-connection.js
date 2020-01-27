require('dotenv/config');
const mongoose = require("mongoose");
class DatabaseConnection{
    constructor(){

        // Establishing a connection to the database
        mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        this._dbConnection = mongoose.connection;
        this._dbConnection.once("open", () => {
            console.log("Succesfully established a connection with MongoDB database");
        });
    }

    /**
     * Determines whether or not there is a document in the supplied colleciton that satisfies the supplied query
     * @param collectionName {String} - Name of the collection to find the document in
     * @param query {Object} - Query object (using MongoDB)
     * @param cb {Function} - A calllback function that should be called with the results of this function
    */
    findSingleDocument(collectionName, query, cb){
        const collection = this._dbConnection.collection(collectionName);
        collection.findOne(query, function(err, result){
            if(err){
                console.log("Error in singleDocumentExistsInCollection(collectionName, query, cb): ", err);
                return;
            }
            
            // Calling the callback function that needs to use the result of this async callback function
            cb(result);
        });
    }

    /**
     * Finds all documents in a given collection with the matching query
     * @param collectionName {String} - Name of the collection to find the documents in
     * @param query {Object} - Query object (using MongoDB)
     * @param cb {Function} - A calllback function that should be called with the results of this function
    */
    findDocumentsInCollection(collectionName, query, cb){
        const collection = this._dbConnection.collection(collectionName);
        collection.find(query).toArray((err, results) => {
            if(err){
                console.log("Error in findDocumentsInCollection(collectionName, query, cb): ", err);
                return;
            }
            cb(results);
        });
    }
}

module.exports = DatabaseConnection;