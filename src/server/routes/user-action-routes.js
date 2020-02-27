const express = require("express");
const router = express.Router();
const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");
const io = require("../socket");
const mongoose = require("mongoose");
const USER_ACTION_EVENTS = require("../../events/user-action-events");

router.post("/create-group", (req, res) => {
    console.log("in router.post for /create-group");
    console.log(req.body);
    Group.findOne({groupName: req.body.groupName}, (err, doc) => {

        if(err){
            console.log("Error in /create-group route: ", err);
            return;
        }

        // Checking preconditions
        // If a group with the given name already exists, deny the group creation
        if(doc){
            io.to(req.body.clientSocketID).emit(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, {
                reason: `A group with the name '${req.body.groupName}' already exists`
            });

        }else if(req.body.groupName.length < 2){
            io.to(req.body.clientSocketID).emit(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, {
                reason: `A group name must have at least 2 characters`
            });
        
        }else{

            // Creating a new group using the Group model and saving it to the database
            let newGroup = new Group({
                groupName: req.body.groupName,
                members: [mongoose.Types.ObjectId(req.body.creatorID)],
                description: req.body.groupDescription,
                joinCode: req.body.joinCode
            });
    
            newGroup.save();

            // TODO: Check postcondition that members has req.body.creatorID
            io.to(req.body.clientSocketID).emit(USER_ACTION_EVENTS.CREATE_GROUP_SUCCESS);
        }
    });
});

module.exports = router;