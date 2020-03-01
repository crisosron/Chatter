import React, {useState, useEffect} from "react"
import "./views-content-css-files/search-view-styles.css";
import SearchBar from "./views-sub-components/SearchBar";
import CommunicationEntityBar from "./views-sub-components/CommunicationEntityBar";
import CommunicationEntityActionBar from "./views-sub-components/CommunicationEntityActionBar";
import socket from "../../../index";
import USER_ACTION_EVENTS from "../../../events/user-action-events"
import NotificationHandler from "../../notification-handler";
export default function SearchViewContent(props){
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

    useEffect(() => {
        socket.on(USER_ACTION_EVENTS.ADD_FRIEND_DENIED, data => {
            NotificationHandler.createNotification("warning", "Sending of friend request has been denied", data.reason);
        });

        socket.on(USER_ACTION_EVENTS.ADD_FRIEND_SENT, () => {
            NotificationHandler.createNotification("success", "Friend Request Sent", "A friend request has been sent");
        });

        return function cleanup(){
            socket.removeListener(USER_ACTION_EVENTS.ADD_FRIEND_SENT);
            socket.removeListener(USER_ACTION_EVENTS.ADD_FRIEND_DENIED)
        }

    }, []);

    return(
        <div id="searchViewWrapper" className="centeredContent">
            <div id="searchViewContent">
                <h1>Search For New Users/Groups</h1>

                <div id="topBarDiv">
                    <div id="searchModeToggleWrapper">
                        <div id="userToggleDiv" className={"toggleDiv centeredContent " + (currentSearchMode === "Users" ? "selectedToggleDiv":"")} onClick={() => {handleTogglePressed("Users")}}>Users</div>
                        <div id="groupToggleDiv" className={"toggleDiv centeredContent " + (currentSearchMode === "Unknown Groups" ? "selectedToggleDiv":"")} onClick={() => {handleTogglePressed("Unknown Groups")}}>Groups</div>
                    </div>
                    <div id="searchBarWrapper">
                        <SearchBar id="searchInput" mode={currentSearchMode} style={{width: "75%"}} updateCommEntities={updateCommEntities} resetCommEntities={resetCommEntities}>{"Search " + currentSearchMode}</SearchBar>
                    </div>
                </div>
                <div id="resultsDiv">
                    <div id="resultingCommEntitiesDiv">
                        <CommunicationEntityBar mode={currentSearchMode} communicationEntities={commEntities}/>
                    </div>

                    <div id="resultingCommEntitiesActionsDiv">
                        {commEntities.map((value, index) => {
                            return <CommunicationEntityActionBar key={"actionBar" + value._id} isGroup={currentSearchMode === "Unknown Groups"} commEntity={value}/>
                        })}                           
                    </div>
                </div>
            </div>
        </div>
    )
}