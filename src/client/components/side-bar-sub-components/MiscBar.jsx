import React from "react";
import "./side-bar-sub-components-css-files/misc-bar-styles.css"
import socket from "../../../index";
import USER_ACTION_EVENTS from "../../../events/user-action-events";
export default function MiscBar(props){
    const backSign = "<";
    const forwardSign = ">";

    const handleSettingsClicked = () => {
        // TODO: Clicking settings will create a group - THIS IS TEMPORARY!
        socket.emit(USER_ACTION_EVENTS.CREATE_GROUP, {groupName: "TestGroup"});
    }

    return(
        <div id="miscBar">
            <button>{backSign}</button>
            <button>{forwardSign}</button>
            <button onClick={handleSettingsClicked}>Settings</button>
        </div>
    );
}