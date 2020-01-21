import React, {useState} from "react";
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch";
import CommunicationEntitiesBar from "./side-bar-sub-components/CommunicationEntityBar";
import SearchBar from "./side-bar-sub-components/SearchBar";
import MiscBar from "./side-bar-sub-components/MiscBar";

export default function SideBar(props){
    const toggleOptions = ["Friends", "Groups"];
    const defaultCommEntities = ["First comm entity", "Second Comm entity", "Third Comm entity"];
    const [commEntities, setCommEntities] = useState(defaultCommEntities);
    const [selectedMode, setSelectedMode] = useState(toggleOptions[0]);
    
    // Custom styling for the toggle switch
    const toggleSwitchStyles = {
        margin: "2% auto 2% auto", 
        width: "95%",
        height: "5%",
    }

    // TODO: Cohesion can be further increased if updateCommEntities and ressetDefaultCommEntities were located in CommunicaionEntitiesBar?
    const updateCommEntities = (newCommEntities) => {
        setCommEntities(newCommEntities);
    }

    // Resets the current displayed communication entities to the default comm entities to display
    const resetDefaultCommEntities = () => {
        setCommEntities(defaultCommEntities);
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
            <SearchBar mode={selectedMode} updateCommEntities={updateCommEntities} resetDefaultCommEntities={resetDefaultCommEntities}/>
            <CommunicationEntitiesBar id="communicationEntitiesBar" communicationEntities={commEntities} mode={selectedMode}/>
            <MiscBar />
        </div>
    )
}
