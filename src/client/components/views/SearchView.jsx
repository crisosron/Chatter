import React, {useState, useEffect} from "react"
import "./views-css-files/search-view-styles.css";
import SearchBar from "./views-sub-components/SearchBar";
import CommunicationEntityBar from "./views-sub-components/CommunicationEntityBar";
import CommunicationEntityActionBar from "./views-sub-components/CommunicationEntityActionBar";
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
        document.getElementById("searchInput").value = "";
        setCommEntities([]);
    }

    return(
        <div id="searchViewWrapper" className="centeredContent">
            <div id="searchViewContent">
                <h1>Search for Users/Groups</h1>

                <div id="topBarDiv">
                    <div id="searchModeToggleWrapper">
                        <div id="userToggleDiv" className={"toggleDiv centeredContent " + (currentSearchMode === "Users" ? "selectedToggleDiv":"")} onClick={() => {handleTogglePressed("Users")}}>Users</div>
                        <div id="groupToggleDiv" className={"toggleDiv centeredContent " + (currentSearchMode === "Groups" ? "selectedToggleDiv":"")} onClick={() => {handleTogglePressed("Groups")}}>Groups</div>
                    </div>
                    <div id="searchBarWrapper">
                        <SearchBar id="searchInput" mode={currentSearchMode} style={{width: "75%"}} updateCommEntities={updateCommEntities} resetCommEntities={resetCommEntities} thisUser={props.thisUser}/>
                    </div>
                </div>
                <div id="resultsDiv">
                    <div id="resultingCommEntitiesDiv">
                        <CommunicationEntityBar mode={currentSearchMode} communicationEntities={commEntities}/>
                    </div>

                    <div id="resultingCommEntitiesActionsDiv">
                        {commEntities.map((value, index) => {
                            return <CommunicationEntityActionBar key={"actionBar" + value._id} isGroup={currentSearchMode === "Groups"} thisUser={props.thisUser} commEntity={value}/>
                        })}                           
                    </div>
                </div>
            </div>
        </div>
    )
}