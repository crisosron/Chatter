import React, {useState} from "react";
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch";
import CommunicationEntitiesBar from "./side-bar-sub-components/CommunicationEntityBar";
import SearchBar from "./side-bar-sub-components/SearchBar";
import MiscBar from "./side-bar-sub-components/MiscBar";

export default function SideBar(props){
    const toggleOptions = ["Friends", "Groups"];
    const [selectedMode, setSelectedMode] = useState(toggleOptions[0]);

    let testCommEntities = [];
    for(let i = 0; i < 20; i++) testCommEntities.push("SomeUsername" + i);
    const [commEntities, setCommEntities] = useState(testCommEntities);
    
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

        // TODO: Update testCommEntities content based on selection in here
    }
    
    return(
        <div id = "sideBar">
            <ToggleSwitch id="friendGroupToggleSwitch" onClick={handleNewSelectedMode} style={toggleSwitchStyles} options={toggleOptions}/>
            <SearchBar mode={selectedMode} />

            {/* TODO: Add an array of potential actions as props */}
            <CommunicationEntitiesBar id="communicationEntitiesBar" communicationEntities={commEntities} mode={selectedMode}/>
            <MiscBar />
        </div>
    )
}
