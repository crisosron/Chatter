import React, {useState, useEffect} from "react";
import CommunicationEntityBar from "./views-sub-components/CommunicationEntityBar";
import SearchBar from "./views-sub-components/SearchBar";
import ChatPane from "./views-sub-components/ChatPane";
import "./views-css-files/communication-view-styles.css";
export default function GroupChatView(props){
    let [groupCommEntities, setGroupCommEntities] = useState([]); // TODO: Fetch all groups of thisUser from db
    let [selectedCommEntity, setSelectedCommEntity] = useState(null); // The selectedCommEntity will be the comm entity that thisUser will be communicating with
    const updateCommEntities = (friendCommEntities) => {
        console.log(`Called updateCommEntities: ${friendCommEntities}`);
        setGroupCommEntities(friendCommEntities);
    }

    const resetCommEntities = () => {
        setGroupCommEntities([]);
    }

    const changeChatPane = (selectedCommEntity) => {
        // Reminder that the contents of selectedCommEntity: selectedCommEntity._id, selectedCommEntity._name
        setSelectedCommEntity(selectedCommEntity);
    }

    return (
        <div id="communicationViewWrapper">
            <div id="communicationViewSideBarWrapper">
                <div id="communicationEntitySearchBarWrapper">
                    <SearchBar mode="Groups" updateCommEntities={updateCommEntities} resetCommEntities={resetCommEntities}/>
                </div>
                <CommunicationEntityBar mode="Groups" changeChatPane={changeChatPane} communicationEntities={groupCommEntities}></CommunicationEntityBar>
            </div>
            <ChatPane selectedCommEntity={selectedCommEntity}></ChatPane>
        </div>
    );
}