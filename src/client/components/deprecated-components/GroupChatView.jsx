// ################# DEPRECATED (SEE ISSUE #18) FOR DETAILS ################# //

import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "../SideBar";
import GroupChatViewContent from "./views-content-components/GroupChatViewContent";
export default function GroupChatView(props){
    return(
        <div id="mainWrapper">
            <SideBar />
            <div id="mainView">
                <GroupChatViewContent />
            </div>
        </div>
    );
}