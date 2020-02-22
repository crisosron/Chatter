import React, {useState} from "react";
import "../css-files/sidebar-styles.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {Link} from "react-router-dom";

export default function SideBar(props){
    const [selectedNavOptionIndex, setSelectedNavOptionIndex] = useState(-1);
    const toggleSwitchOptions = [
        {title: "Friends", linkPath: "/chat"},
        {title: "Groups", linkPath: "/group-chat"},
        {title: "Search", linkPath: "/search"},
        {title: "Profile", linkPath: "/profile"}
    ];

    const handleNavOptionClicked = index => {
        setSelectedNavOptionIndex(index);
    }

    const handleSettingsContextMenuOptionClicked = (e, data) => {
        if(data.action === "Create Group") props.changeDisplayedView("createGroup");
        else if(data.action === "View Profile") props.changeDisplayedView("profile");
    }

    return(
        <div id="sideBar">
            <div id="logoDiv">
                <h1>Chatter</h1>
            </div>

            {/* TODO: Good practice? */}
            <div className="spacerDiv" />

            <div id="navigationOptionsDiv">
                {toggleSwitchOptions.map((elem, index) => {
                    return(
                        <Link className={"navOption " + (index === selectedNavOptionIndex ? "selectedNavOption" : "")} to={{
                            pathname: elem.linkPath,
                        }}>
                            <div onClick={handleNavOptionClicked}>
                                {elem.title}
                            </div>
                        </Link>
                    )
                })}
                
            </div>

            <div className="spacerDiv" />

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
