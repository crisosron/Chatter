import React, {useState, useEffect} from "react"
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch"
export default function SideBar(props){
    const toggleSwitchStyles = {
        backgroundColor: "#fcd581",
        color: "#454955",
        margin: "2% 0 2% 0",
        width: "100%",
        height: "5%",
    }
    
    return(
        <div id = "sideBar">
            {/* TODO: Insert actual react components in here instead of just divs */}
           <ToggleSwitch id="friendGroupToggleSwitch" style={toggleSwitchStyles} options={["Friends", "Groups"]}/>
            <div id="searchBar">
            </div>
            <div id="communicationEntities">
            </div>
            <div id="settings">
            </div>
        </div>
    )
}
