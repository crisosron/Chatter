import React, {useState} from "react";
import "../css-files/sidebar-styles.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import SideBarOption from "./SideBarOption";
import {Link} from "react-router-dom";

// Importing icons and images
import friendsIconPath from "../../res/icons/ic_side_bar_option_friends_24px.png";
import groupsIconPath from "../../res/icons/ic_side_bar_option_groups_24px.png";
import searchIconPath from "../../res/icons/ic_side_bar_option_search_24px.png";
import settingsIconPath from "../../res/icons/ic_side_bar_option_settings_24px.png";
import sideBarLogoPath from "../../res/images/side_bar_chatter_logo.png"

export default function SideBar(props){
    const selectedNavOptionIndex = parseInt(sessionStorage.getItem("selectedNavOptionIndex"));

    // These represent the data that needs to be displayed for each link in the SideBar
    const sideBarOptionsData = [
        {title: "Friends", linkPath: "/chat", iconPath: friendsIconPath},
        {title: "Groups", linkPath: "/group-chat", iconPath: groupsIconPath},
        {title: "Search", linkPath: "/search", iconPath: searchIconPath},
        {title: "Settings", linkPath: "/settings", iconPath: settingsIconPath},
    ];

    return(
        <div id="sideBar">
            <div id="logoDiv">
                <Link to="/">
                    {/* TODO: Perform graceful exit somehow by asking for confirmation and logging the user out if approved */}
                    <img src={sideBarLogoPath} alt="logo" />
                </Link>
            </div>
            {sideBarOptionsData.map((elem, index) => {
                return(
                    <SideBarOption iconPath={elem.iconPath} index={index} isSelected={index === selectedNavOptionIndex ? true : false} linkPath={elem.linkPath}>{elem.title}</SideBarOption>
                );
            })}

        </div>

    );
}
