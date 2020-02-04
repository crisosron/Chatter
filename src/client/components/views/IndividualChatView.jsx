import React, {useState, useEffect} from "react";
import CommunicationEntityBar from "./views-sub-components/CommunicationEntityBar";
import SearchBar from "./views-sub-components/SearchBar";
import ChatPane from "./views-sub-components/ChatPane";
import "./views-css-files/individual-chat-view-styles.css";
export default function IndividualChatDisplayView(props){
    let friendCommEntities = useState([]); // TODO: Fetch all friends of thisUser from db
    return (
        <div id="individualChatViewWrapper">
            <div id="individualChatSideBarWrapper">
                <SearchBar mode="Friends" />
                <CommunicationEntityBar mode="Friends" communicationEntities={friendCommEntities}></CommunicationEntityBar>
            </div>
            <ChatPane></ChatPane>
        </div>

    );
}