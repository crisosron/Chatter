import React, {useState, useEffect} from "react"
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch"
import CommunicationEntityBar from "./side-bar-sub-components/CommunicationEntityBar"
export default function SideBar(props){
    const testCommEntities = ["First", "Second", "Third", "Fourth"];

    // Custom styling for the toggle switch
    const toggleSwitchStyles = {
        margin: "2% auto 2% auto", 
        width: "95%",
        height: "5%",
    }
    
    return(
        <div id = "sideBar">
            {/* TODO: Insert actual react components in here instead of just divs */}
           <ToggleSwitch id="friendGroupToggleSwitch" mainColor="#fcd581" secondaryColor="#454955" borderColor="#454955" style={toggleSwitchStyles} options={["Friends", "Groups"]}/>
            <div id="searchBar">
            </div>
            <div id="communicationEntities">
                {testCommEntities.map((value, index) => {
                    return <CommunicationEntityBar key={value.toLowerCase() + "communicationEntityBar"}>{value}</CommunicationEntityBar>
                })}
            </div>
            <div id="settings">
            </div>
        </div>
    )
}
