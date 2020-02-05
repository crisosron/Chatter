import React, {useState, useEffect} from "react"
import "./views-css-files/search-view-styles.css";
import SearchBar from "./views-sub-components/SearchBar";
import CommunicationEntityBar from "./views-sub-components/CommunicationEntityBar"
export default function SearchView(props){
    const [commEntities, setCommEntities] = useState([]);
    const [currentSearchMode, setCurrentSearchMode] = useState("Users");
    
    const updateCommEntities = (newCommEntities) => {
        setCommEntities(newCommEntities);
    }

    const resetCommEntities = () => {
        setCommEntities([]);
    } 

    const handleTogglePressed = (selectedMode) => {
        setCurrentSearchMode(selectedMode);
    }

    return(
        <div id="searchViewWrapper" className="centeredContent">
            <div id="searchViewContent">
                <div id="topBarDiv">
                    <div id="searchModeToggleWrapper">
                        <div id="userToggleDiv" className={"toggleDiv centeredContent " + (currentSearchMode === "Friends" ? "selectedToggleDiv":"")} onClick={() => {handleTogglePressed("Friends")}}>Users</div>
                        <div id="groupToggleDiv" className={"toggleDiv centeredContent " + (currentSearchMode === "Groups" ? "selectedToggleDiv":"")} onClick={() => {handleTogglePressed("Groups")}}>Groups</div>
                    </div>
                    <div id="searchBarWrapper" className="centeredContent">
                        <SearchBar mode={currentSearchMode} updateCommEntities={updateCommEntities} resetCommEntities={resetCommEntities}/>
                    </div>
                </div>
                <div id="resultsDiv"></div>
            </div>
        </div>
    )
}