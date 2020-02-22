import React, {useState, useEffect} from "react";
import CommunicationEntityBar from "./views-sub-components/CommunicationEntityBar";
import SearchBar from "./views-sub-components/SearchBar";
import ChatPane from "./views-sub-components/ChatPane";
import "./views-content-css-files/communication-view-styles.css";
export default function IndividualChatViewContent(props){
    let [friendCommEntities, setFriendCommEntities] = useState([]); // TODO: Fetch all friends of thisUser from db
    let [selectedCommEntity, setSelectedCommEntity] = useState(null); // The selectedCommEntity will be the comm entity that thisUser will be communicating with
    const updateCommEntities = (friendCommEntities) => {
        console.log(`Called updateCommEntities: ${friendCommEntities}`);
        setFriendCommEntities(friendCommEntities);
    }

    const resetCommEntities = () => {
        setFriendCommEntities([]);
    }

    const changeChatPane = (selectedCommEntity) => {
        // Reminder that the contents of selectedCommEntity: selectedCommEntity._id, selectedCommEntity._name
        setSelectedCommEntity(selectedCommEntity);
    }

    return (
        <div id="communicationViewWrapper">
            <div id="communicationViewSideBarWrapper">
                <div id="communicationEntitySearchBarWrapper">
                    <SearchBar mode="Friends" updateCommEntities={updateCommEntities} resetCommEntities={resetCommEntities}>Search Friends</SearchBar>
                </div>
                <CommunicationEntityBar mode="Friends" changeChatPane={changeChatPane} communicationEntities={friendCommEntities}></CommunicationEntityBar>
            </div>
            <ChatPane selectedCommEntity={selectedCommEntity}></ChatPane>
        </div>
    );
}