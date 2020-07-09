// ################# DEPRECATED (SEE ISSUE #18) FOR DETAILS ################# //
// Temporarily deprecated since it contains potentially useful logic to be used in FriendsView and GroupsView

import React, {useState, useEffect} from "react";
import CommunicationEntityBar from "../CommunicationEntityBar";
import SearchBar from "../SearchBar";
import ChatPane from "../ChatPane";
import "./views-content-css-files/communication-view-styles.css"
export default function GroupChatViewContent(props){
    let [groupCommEntities, setGroupCommEntities] = useState([]); // TODO: Fetch all groups of thisUser from db
    let [selectedCommEntity, setSelectedCommEntity] = useState(null); // The selectedCommEntity will be the comm entity that thisUser will be communicating with
    const updateCommEntities = (groupCommEntities) => {
        setGroupCommEntities(groupCommEntities);
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
                    <SearchBar mode="Groups" updateCommEntities={updateCommEntities} resetCommEntities={resetCommEntities}>Search Groups</SearchBar>
                </div>
                <CommunicationEntityBar mode="Groups" changeChatPane={changeChatPane} communicationEntities={groupCommEntities}></CommunicationEntityBar>
            </div>
            <ChatPane selectedCommEntity={selectedCommEntity}></ChatPane>
        </div>
    );
}