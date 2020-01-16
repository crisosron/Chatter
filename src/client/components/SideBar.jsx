import React, {useState, useEffect} from "react";
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch";
import CommunicationEntitiesBar from "./side-bar-sub-components/CommunicationEntityBar";
import SearchBar from "./side-bar-sub-components/SearchBar";
import MiscBar from "./side-bar-sub-components/MiscBar";
export default function SideBar(props){
    // const testCommEntities = ["FirstUsername", "SecondUsername", "ThirdUsername", "FourthUsername"];
    const testCommEntities = [];
    for(let i = 0; i < 20; i++)
        testCommEntities.push("SomeUsername");
    const toggleOptions = ["Friends", "Groups"];
    const [selectedMode, setSelectedMode] = useState(toggleOptions[0]);

    // Custom styling for the toggle switch
    const toggleSwitchStyles = {
        margin: "2% auto 2% auto", 
        width: "95%",
        height: "5%",
    }
    
    return(
        <div id = "sideBar">
            {/* TODO: Insert actual react components in here instead of just divs */}
            <ToggleSwitch id="friendGroupToggleSwitch" mainColor="#fff8e8" secondaryColor="#454955" style={toggleSwitchStyles} options={toggleOptions}/>
            <SearchBar mode={selectedMode} />
            <CommunicationEntitiesBar id="communicationEntitiesBar" communicationEntities={testCommEntities}/>
            <MiscBar />
        </div>
    )
}
