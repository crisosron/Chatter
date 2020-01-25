import React, {useState} from "react";
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch";
import CommunicationEntitiesBar from "./side-bar-sub-components/CommunicationEntityBar";
import SearchResultsBar from "./side-bar-sub-components/SearchResultsBar";
import SearchBar from "./side-bar-sub-components/SearchBar";
import MiscBar from "./side-bar-sub-components/MiscBar";

export default function SideBar(props){
    const toggleOptions = ["Friends", "Groups", "Search"];
    const searchModes = ["Friends", "Groups", "Users and Groups"];
    // const defaultCommEntities = ["First comm entity", "Second Comm entity", "Third Comm entity"];
    const [commEntities, setCommEntities] = useState([]);

    // These are the communication entities that are shown in the search 
    const [generalSearchUserCommEntities, setGeneralSearchUserCommEntities] = useState([]);
    const [generalSearchGroupCommEntities, setGeneralSearchGroupCommEntities] = useState([]);

    // Keeps track of the current mode that this SideBar component adheres to
    const [selectedMode, setSelectedMode] = useState(toggleOptions[0]);

    // Keeps track of the searching mode, (possible modes are: search friends, search known groups, search unknown users and groups)
    const [searchMode, setSearchMode] = useState(searchModes[0]);
    
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

    const updateGeneralSearchUserEntities = (userCommEntities) => {
        setGeneralSearchUserCommEntities(userCommEntities);
    }

    const updateGeneralSearchGroupEntities = groupCommEntities => {
        setGeneralSearchGroupCommEntities(groupCommEntities);
    }

    // Resets the current displayed communication entities to the default comm entities to display
    const resetDefaultCommEntities = () => {
        setCommEntities([]);
    }

    const handleToggleSwitchPressed = (selectedOptionIndex) => {
        let selectedOption = toggleOptions[selectedOptionIndex];
        if(selectedOption === "Friends"){
            // TODO: Temporary
            let newCommEntities = [];
            for(let i = 0; i < 5; i++) {

                // IMPORTANT: Notice the negated condition here, this is because the value of selectedMode has to be changed at the end
                // of this function to trigger the rendering corßrectly. (This is because we are using hooks, it can be more intuitive
                // if we used a class to represent this component since we can call setState easily)
                if(selectedMode !== "Friends") newCommEntities.push("SomeUsername" + i);
                else newCommEntities.push("SomeGroupName" + i);
                setCommEntities([]);
            }
            setSearchMode("Friends");

        }else if(selectedOption === "Groups"){
            // TODO: Temporary
            let newCommEntities = [];
            for(let i = 0; i < 5; i++) {
                
                // IMPORTANT: Notice the negated condition here, this is because the value of selectedMode has to be changed at the end
                // of this function to trigger the rendering corßrectly. (This is because we are using hooks, it can be more intuitive
                // if we used a class to represent this component since we can call setState easily)
                if(selectedMode !== "Friends") newCommEntities.push("SomeUsername" + i);
                else newCommEntities.push("SomeGroupName" + i);
            }
            setSearchMode("Groups");
            setCommEntities([]);

        }else{
            setSearchMode("General Search");
        }

        setSelectedMode(selectedOption)
    }
    
    if(selectedMode === "Search"){
        return(
            <div id="sideBar">
                <ToggleSwitch id="friendGroupToggleSwitch" onClick={handleToggleSwitchPressed} style={toggleSwitchStyles} options={toggleOptions}/>    
                <SearchBar mode={searchMode} updateGeneralSearchUserEntities={updateGeneralSearchUserEntities} updateGeneralSearchGroupEntities={updateGeneralSearchGroupEntities} resetDefaultCommEntities={resetDefaultCommEntities}/>
                <SearchResultsBar groupCommunicationEntities={generalSearchGroupCommEntities} userCommunicationEntities={generalSearchUserCommEntities} />
                <MiscBar />
            </div>
        );
    }

    return(
        <div id = "sideBar">
            <ToggleSwitch id="friendGroupToggleSwitch" onClick={handleToggleSwitchPressed} style={toggleSwitchStyles} options={toggleOptions}/>
            <SearchBar mode={selectedMode} updateCommEntities={updateCommEntities} resetDefaultCommEntities={resetDefaultCommEntities}/>
            <CommunicationEntitiesBar id="communicationEntitiesBar" communicationEntities={commEntities} mode={selectedMode}/>
            <MiscBar />
        </div>
    )
}
