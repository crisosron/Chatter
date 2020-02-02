import React, {useState} from "react";
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch";
import "../css-files/sidebar-styles.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default function SideBar(props){
    const toggleSwitchOptions = ["Friends", "Groups", "Search", "Profile"];

    const handleToggleSwitchPressed = (selectedOptionIndex) => {
        console.log(`Selected option: ${toggleSwitchOptions[selectedOptionIndex]}`);
    }

    const handleSettingsContextMenuOptionClicked = (e, data) => {
        console.log(`MenuOption clicked: ${data}`);
        if(data.action === "Create Group") props.changeDisplayedView("createGroup");
        else if(data.action === "View Profile") props.changeDisplayedView("profile");
    }

    return(
        <div id="sideBar">
            <div id="logoDiv">
                <h1>Chatter</h1>
            </div>

            <div id="navigationOptionsDiv">
                <ToggleSwitch onClick={handleToggleSwitchPressed} options={toggleSwitchOptions}/>
            </div>

            <ContextMenuTrigger id="settingsContextMenu" holdToDisplay={1}>
                <div id="settingsDiv">
                    <h2>Settings</h2>
                </div>
            </ContextMenuTrigger>

            <ContextMenu id="settingsContextMenu">
                <MenuItem className="settingsMenuItem" data={{action: "Create Group"}} onClick={handleSettingsContextMenuOptionClicked}>Create Group</MenuItem>
                <MenuItem className="settingsMenuItem" data={{action: "View Profile"}} onClick={handleSettingsContextMenuOptionClicked}>Profile</MenuItem>
                <MenuItem className="settingsMenuItem" data={{action: "Logout"}} onClick={handleSettingsContextMenuOptionClicked}>Logout</MenuItem>
            </ContextMenu>

        </div>
    )
}
