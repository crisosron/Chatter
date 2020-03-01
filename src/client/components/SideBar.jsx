import React, {useState} from "react";
import "../css-files/sidebar-styles.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {Link} from "react-router-dom";

export default function SideBar(props){
    const [selectedNavOptionIndex, setSelectedNavOptionIndex] = useState(-1);
    const navOptions = [
        {title: "Home", linkPath: "/home"},
        {title: "Friends", linkPath: "/chat"},
        {title: "Groups", linkPath: "/group-chat"},
        {title: "Search", linkPath: "/search"},
        {title: "Profile", linkPath: "/profile"}
    ];

    const handleNavOptionClicked = index => {
        setSelectedNavOptionIndex(index);
    }

    return(
        <div id="sideBar">
            <div id="logoDiv">
                <h1>Chatter</h1>
            </div>

            {/* TODO: Good practice? */}
            <div className="spacerDiv" />

            <div id="navigationOptionsDiv">

                {/* Rendering navigation options */}
                {navOptions.map((elem, index) => {
                    return(
                        <Link className={"navOption sideBarLink" + (index === selectedNavOptionIndex ? "selectedNavOption" : "")} to={{
                            pathname: elem.linkPath,
                        }} key={"linkElem"+elem.title}>
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
                <Link className="sideBarLink" to={{
                    pathname: "/create-group",
                }}>
                    <MenuItem className="settingsMenuItem" data={{action: "Create Group"}}>Create Group</MenuItem>
                </Link>
                <MenuItem className="settingsMenuItem" data={{action: "Logout"}}>Logout</MenuItem>
            </ContextMenu>

        </div>
    )
}
