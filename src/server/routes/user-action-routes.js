const express = require("express");
const router = express.Router();
const {User} = require("../database-document-models/user-model");
const {Group} = require("../database-document-models/group-model");
const io = require("../socket");
const mongoose = require("mongoose");
const USER_ACTION_EVENTS = require("../../events/user-action-events");

router.post("/create-group", (req, res) => {
    console.log("in router.post for /create-group");
    Group.findOne({groupName: req.body.groupName}, (err, res) => {

        // If a group with the given name already exists, deny the group creation
        if(res){
            io.to(req.body.clientSocketID).emit(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, {
                reason: `A group with the name ${req.body.groupName} already exists`
            });

        } else if(req.body.groupName.length < 2){
            io.to(req.body.clientSocketID).emit(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, {
                reason: `A group name must have at least 2 characters`
            });
        
        }else{
            let newGroup = new Group({
                groupName: req.body.groupName,
                members: [mongoose.Types.ObjectId(req.body.creatorID)],
                description: req.body.groupDescription,
                joinCode: req.body.joinCode
            });
    
            newGroup.save();

            // TODO: Fix this, the group._id is not being added to the array of groups that the creator is associated with
            User.findOneAndUpdate({_id: req.body.creatorID}, {$addToSet: {groups: newGroup._id}});
            io.to(req.body.clientSocketID).emit(USER_ACTION_EVENTS.CREATE_GROUP_SUCCESS);
        }
    });
});

module.expots = router;