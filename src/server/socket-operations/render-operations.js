const CommunicationEntity = require("./communication-entity");
const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");

function getFriends(clientSocket){
    console.log("Need to obtain friends");
}

function getGroups(clientSocket){
    console.log("Need to obtain groups thisUser is associated with");
}

module.exports = {getFriends, getGroups};