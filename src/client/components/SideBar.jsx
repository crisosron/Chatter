import React, {useState, useEffect} from "react";
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch";
import CommunicationEntitiesBar from "./side-bar-sub-components/CommunicationEntityBar";
import SearchBar from "./side-bar-sub-components/SearchBar";
import MiscBar from "./side-bar-sub-components/MiscBar";
export default function SideBar(props){
    const testCommEntities = [];
    for(let i = 0; i < 20; i++) testCommEntities.push("SomeUsername" + i);
    const toggleOptions = ["Friends", "Groups"];
    const [selectedMode, setSelectedMode] = useState(toggleOptions[0]);

    // Custom styling for the toggle switch
    const toggleSwitchStyles = {
        margin: "2% auto 2% auto", 
        width: "95%",
        height: "5%",
    }

    const handleNewSelectedMode = (selectedModeIndex) => {
        setSelectedMode(toggleOptions[selectedModeIndex]);
        // TODO: Update testCommEntities content based on selection in here
    }
    
    return(
        <div id = "sideBar">
            <ToggleSwitch id="friendGroupToggleSwitch" onClick={handleNewSelectedMode} style={toggleSwitchStyles} options={toggleOptions}/>
            <SearchBar mode={selectedMode} />
            <CommunicationEntitiesBar id="communicationEntitiesBar" communicationEntities={testCommEntities}/>
            <MiscBar />
        </div>
    )
}
