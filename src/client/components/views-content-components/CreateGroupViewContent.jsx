import React, {useState} from "react";
import "./views-content-css-files/create-group-view-styles.css";
import NotificationHandler from "../../notification-handler";
import socket from "../../../index";
import shortid from "shortid";
import axios from "axios";

export default function CreateGroupDisplayView(props){
    const [joinCode, setJoinCode] = useState(shortid.generate());
    const thisUser = JSON.parse(localStorage.getItem("thisUser"));

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
            creatorID: thisUser.id,
            clientSocketID: socket.id
        }

        // Sending post request to create a group with user provided input
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/create-group`, data)
        .then(res => { // Handling response from server

            // Handling group creation failure by showing notification
            if(res.data.createGroupFailed){
                NotificationHandler.createNotification("danger", "Group Creation Denied", res.data.reason);
                return;
            }

            // Handling group creation success
            NotificationHandler.createNotification("success", "Group Created", "Your group has been created and is ready for use!");
        });
    }

    return(
        <div id="createGroupViewWrapper">
            <div id="createGroupViewContent">
                <h1>Create a Group</h1>
                <div id="groupDetailsInput">
                    <h2 className="groupDetailsInputLabel">Group Name</h2>
                    <input className="groupDetailsInputField" id="groupNameInputField" placeholder="2 Characters Minimum" type="text" maxLength="20" />

                    <h2 className="groupDetailsInputLabel">Group Description</h2>
                    <input className="groupDetailsInputField" id="groupDescriptionInputField" type="text" maxLength="200" />

                    <h2 className="groupDetailsInputLabel">Generated Group Code</h2>
                    <input className="groupDetailsInputField disabledInputField" type="text" value={joinCode} disabled />

                    <button id="createGroupButton" onClick={handleCreateGroupPressed}>Create Group</button>
                </div>
            </div>
        </div>
    )
}