const express = require("express");
const router = express.Router();
const {Group} = require("../database-document-models/group-model");
const mongoose = require("mongoose");

// Handling group creation route
router.post("/create-group", (req, res) => {
    Group.findOne({groupName: req.body.groupName}, (err, doc) => {

        if(err){
            console.log("Error in /create-group route: ", err);
            return;
        }

        // Checking preconditions
        // If a group with the given name already exists, deny the group creation
        if(doc){
            res.send({
                createGroupFailed: true,
                reason: `A group with the name '${req.body.groupName}' already exists`
            });
        
        // Checking the precondition that the groupname must have at least 2 characters
        }else if(req.body.groupName.length < 2){
            res.send({
                createGroupFailed: true,
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
    
            newGroup.save()
            .then(result => {
                // TODO: Check postcondition that members has req.body.creatorID
                res.send({
                    createGroupFailed: false
                });
            });
        }
    });
});

module.exports = router;