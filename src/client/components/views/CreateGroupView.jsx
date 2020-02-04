import React, {useState, useEffect} from "react";
import "./views-css-files/create-group-view-styles.css";
import USER_ACTION_EVENTS from "../../../events/user-action-events";
import NotificationHandler from "../../notification-handler";
import socket from "../../../index";

export default function CreateGroupDisplayView(props){
    const [joinCode, setJoinCode] = useState(null);
    const handleCreateGroupPressed = () => {
        const groupName = document.getElementById("groupNameInputField").value;
        const groupDescription = document.getElementById("groupDescriptionInputField").value;

        // TODO: Group code will be generated via shortid lib in the serverside, passed to this components as props
        socket.emit(USER_ACTION_EVENTS.CREATE_GROUP, {
            groupName: groupName,
            groupDescription: groupDescription,
            joinCode: joinCode,
            creatorID: props.thisUser.id
        });
    }

    useEffect(() => {
        socket.emit(USER_ACTION_EVENTS.GENERATE_JOIN_CODE);
        socket.on(USER_ACTION_EVENTS.DELIVER_JOIN_CODE, data => setJoinCode(data.generatedJoinCode));
        
        socket.on(USER_ACTION_EVENTS.CREATE_GROUP_DENIED, (data) => {
            NotificationHandler.createNotification("danger", "Group Creation Denied", data.reason);
            document.getElementById("groupNameInputField").value = "";
            document.getElementById("groupDescriptionInputField").value = "";
        });

        socket.on(USER_ACTION_EVENTS.CREATE_GROUP_SUCCESS, () => {
            NotificationHandler.createNotification("success", "Group Created", "Your group has been created and is ready for use!");
        });
    }, []);

    return(
        <div id="createGroupViewWrapper">
            <div id="createGroupViewContent">
                <h1>Create a Group</h1>
                <div id="groupDetailsInput">
                    <h2 className="groupDetailsInputLabel">Group Name</h2>
                    <input className="groupDetailsInputField" id="groupNameInputField" type="text" />

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