import React from "react";
import "./side-bar-sub-components-css-files/misc-bar-styles.css"
import socket from "../../../index";
import USER_ACTION_EVENTS from "../../../events/user-action-events";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
export default function MiscBar(props){

    const handleClick = () => {
        // TODO: Clicking settings will create a group - THIS IS TEMPORARY!
        // socket.emit(USER_ACTION_EVENTS.CREATE_GROUP, {groupName: "TestGroup"});
    }

    return(
        <div id="miscBar">
            <ContextMenuTrigger id="settingsContextMenu" holdToDisplay={1}> {/*holdToDisplay prop makes it so that you can left click to show the context menu*/}
                <div id="settingsDiv">Settings</div>
            </ContextMenuTrigger>

            <ContextMenu id="settingsContextMenu">
                <MenuItem className="miscBarMenuItem">Create Group</MenuItem>
                <MenuItem className="miscBarMenuItem">Logout</MenuItem>
            </ContextMenu>

        </div>
    );
}