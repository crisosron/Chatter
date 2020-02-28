import React, {useState, useEffect} from "react";
import "./views-content-css-files/create-group-view-styles.css";
import USER_ACTION_EVENTS from "../../../events/user-action-events";
import NotificationHandler from "../../notification-handler";
import socket from "../../../index";
import shortid from "shortid";
import axios from "axios";

export default function CreateGroupDisplayView(props){
    const [joinCode, setJoinCode] = useState(shortid.generate());

    const handleCreateGroupPressed = () => {
        const groupNameInputField = document.getElementById("groupNameInputField");
        const groupDescriptionInputField = document.getElementById("groupDescriptionInputField");

        // Checking that the entered group name is valid
        if(groupNameInputField.value.length < 2){
            NotificationHandler.createNotification("danger", "Group Creation Denied", "Group name must have at least 2 characters");
            groupNameInputField.value = "";
        }

        // Data object to send to server via POST request
        const data = {
            groupName: groupNameInputField.value,
            groupDescription: groupDescriptionInputField.value,
            joinCode: joinCode,
            creatorID: props.thisUser.id,
            clientSocketID: socket.id
        }

        axios.post("http://localhost:8000/create-group", data);
    }

    useEffect(() => {
        socket.on(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, (data) => {
            NotificationHandler.createNotification("danger", "Group Creation Denied", data.reason);
            document.getElementById("groupNameInputField").value = "";
            document.getElementById("groupDescriptionInputField").value = "";
        });

        socket.on(USER_ACTION_EVENTS.CREATE_GROUP_SUCCESS, () => {
            NotificationHandler.createNotification("success", "Group Created", "Your group has been created and is ready for use!");
        });

        return () => {
            socket.removeEventListener(USER_ACTION_EVENTS.CREATE_GROUP_SUCCESS);
            socket.removeEventListener(USER_ACTION_EVENTS.CREATE_GROUP_DENIED);
        }

    }, []);

    return(
        <div id="createGroupViewWrapper">
            <div id="createGroupViewContent">
                <h1>Create a Group</h1>
                <div id="groupDetailsInput">
                    <h2 className="groupDetailsInputLabel">Group Name</h2>
                    <input className="groupDetailsInputField" id="groupNameInputField" placeholder="2 Characters Minimum" type="text" />

                    <h2 className="groupDetailsInputLabel">Group Description</h2>
                    <input className="groupDetailsInputField" id="groupDescriptionInputField" type="text" />

                    <h2 className="groupDetailsInputLabel">Generated Group Code</h2>
                    <input className="groupDetailsInputField disabledInputField" type="text" value={joinCode} disabled />

                    <button id="createGroupButton" onClick={handleCreateGroupPressed}>Create Group</button>
                </div>
            </div>
        </div>
    )
}