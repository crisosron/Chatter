import React from "react";
import "../css-files/view-styles.css"
import SideBar from "./SideBar";
import CommunicationEntityBar from "./CommunicationEntityBar";
import ChatPane from "./ChatPane"

export default function FriendsView(props){
    return(
        <div id="mainWrapper">

            {/* Sidebar is not contained within contentWrapper for grouping purposes. It is not expected to change across the different pages */}
            <SideBar />

            <div id="contentWrapper">
                {/* TODO: Determine appropriate props to pass to CommunicationEntityBar and ChatPane components */}
                <CommunicationEntityBar />
                <ChatPane />
            </div>
        </div>
    );
}