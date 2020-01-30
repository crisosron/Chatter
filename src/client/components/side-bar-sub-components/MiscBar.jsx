import React from "react";
import "./side-bar-sub-components-css-files/misc-bar-styles.css"
import socket from "../../../index";
import USER_ACTION_EVENTS from "../../../events/user-action-events";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
export default function MiscBar(props){

    const handleMenuOptionClicked = (e, data) => {
        console.log(`MenuOption clicked: ${data}`);
        if(data.action === "Create Group") props.changeDisplayedView("createGroup");
        else if(data.action === "View Profile") props.changeDisplayedView("profile");
    }

    return(
        <div id="miscBar">
            <ContextMenuTrigger id="settingsContextMenu" holdToDisplay={1}> {/*holdToDisplay prop makes it so that you can left click to show the context menu*/}
                <div id="settingsDiv">Settings</div>
            </ContextMenuTrigger>

            <ContextMenu id="settingsContextMenu">
                <MenuItem className="miscBarMenuItem" data={{action: "Create Group"}} onClick={handleMenuOptionClicked}>Create Group</MenuItem>
                <MenuItem className="miscBarMenuItem" data={{action: "View Profile"}} onClick={handleMenuOptionClicked}>Profile</MenuItem>
                <MenuItem className="miscBarMenuItem" data={{action: "Logout"}} onClick={handleMenuOptionClicked}>Logout</MenuItem>
            </ContextMenu>

        </div>
    );
}