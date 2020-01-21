import React, {useState} from "react";
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch";
import CommunicationEntitiesBar from "./side-bar-sub-components/CommunicationEntityBar";
import SearchBar from "./side-bar-sub-components/SearchBar";
import MiscBar from "./side-bar-sub-components/MiscBar";
import SEARCH_EVENTS from "../../events/search-events";
import socket from "../../index";

export default function SideBar(props){
    const toggleOptions = ["Friends", "Groups"];
    const defaultCommEntities = ["First comm entity", "Second Comm entity", "Third Comm entity"];
    const [commEntities, setCommEntities] = useState(defaultCommEntities);
    const [selectedMode, setSelectedMode] = useState(toggleOptions[0]);

    socket.on(SEARCH_EVENTS.NO_RESULTS_FOUND, () => {
        // TODO: Set to default CommEntities to display
        setCommEntities(defaultCommEntities);
    });
        
    socket.on(SEARCH_EVENTS.DELIVER_RESULTS, data => {
        let newCommEntities = [];
        for(let i = 0; i < data.results.length; i++) newCommEntities.push(data.results[i]);
        setCommEntities(newCommEntities);
    });
    
    // Custom styling for the toggle switch
    const toggleSwitchStyles = {
        margin: "2% auto 2% auto", 
        width: "95%",
        height: "5%",
    }

    const handleNewSelectedMode = (selectedModeIndex) => {

        let newCommEntities = [];
        for(let i = 0; i < 5; i++) {

            // IMPORTANT: Notice the negated condition here, this is because the value of selectedMode has to be changed at the end
            // of this function to trigger the rendering correctly. (This is because we are using hooks, it can be more intuitive
            // if we used a class to represent this component since we can call setState easily)
            if(selectedMode !== "Friends") newCommEntities.push("SomeUsername" + i);
            else newCommEntities.push("SomeGroupName" + i);
        }

        setSelectedMode(toggleOptions[selectedModeIndex]);
        setCommEntities(newCommEntities);
    }
    
    return(
        <div id = "sideBar">
            <ToggleSwitch id="friendGroupToggleSwitch" onClick={handleNewSelectedMode} style={toggleSwitchStyles} options={toggleOptions}/>
            <SearchBar mode={selectedMode} />
            <CommunicationEntitiesBar id="communicationEntitiesBar" communicationEntities={commEntities} mode={selectedMode}/>
            <MiscBar />
        </div>
    )
}
