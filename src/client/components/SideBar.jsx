import React, {useState, useEffect} from "react"
import ToggleSwitch from "./side-bar-sub-components/ToggleSwitch"
import CommunicationEntityBar from "./side-bar-sub-components/CommunicationEntityBar"
export default function SideBar(props){
    const [selectedCommEntityBarIndex, setSelectedCommEntityBarIndex] = useState(-1); // No CommunicationEntityBar is initally selected
    const testCommEntities = ["FirstUsername", "SecondUsername", "ThirdUsername", "FourthUsername"];

    // Custom styling for the toggle switch
    const toggleSwitchStyles = {
        margin: "2% auto 2% auto", 
        width: "95%",
        height: "5%",
    }

    const commBarClicked = () => {
        console.log(`CommEntityBar selected for: ${testCommEntities[selectedCommEntityBarIndex]}`);
    }
    
    return(
        <div id = "sideBar">
            {/* TODO: Insert actual react components in here instead of just divs */}
           <ToggleSwitch id="friendGroupToggleSwitch" mainColor="#fff8e8" secondaryColor="#454955" style={toggleSwitchStyles} options={["Friends", "Groups"]}/>
            <div id="searchBar">
            </div>

            {/* TODO: We can probably decrease coupling of these operations from SideBar by making CommunicationEntites its own component */}
            <CommunicationEntityBar id="communicationEntityBar" communicationEntities={testCommEntities}/>

            <div id="settings">
            </div>
        </div>
    )
}
