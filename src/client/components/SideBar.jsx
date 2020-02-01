import React, {useState} from "react";
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch";
// import CommunicationEntitiesBar from "./side-bar-sub-components/CommunicationEntityBar";
// import SearchResultsBar from "./side-bar-sub-components/SearchResultsBar";
// import SearchBar from "./side-bar-sub-components/SearchBar";
// import MiscBar from "./side-bar-sub-components/MiscBar";
import "../css-files/sidebar-styles.css";

export default function SideBar(props){
    const toggleSwitchOptions = ["Friends", "Groups", "Search", "Profile"];
    const handleToggleSwitchPressed = (selectedOptionIndex) => {
        console.log(`Selected option: ${toggleSwitchOptions[selectedOptionIndex]}`);
    }

    return(
        <div id="sideBar">
            <div id="logoDiv">
                <h1>Chatter</h1>
            </div>

            <div id="navigationOptionsDiv">
                <ToggleSwitch onClick={handleToggleSwitchPressed} options={toggleSwitchOptions}/>
            </div>

            <div id="settingsDiv">
                <h2>Settings</h2>
            </div>


        </div>
    )
}
