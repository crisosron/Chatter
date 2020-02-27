import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar";
import GroupChatViewContent from "./views-content-components/GroupChatViewContent";
export default function GroupChatView(props){
    return(
        <div id="mainWrapper">
            <SideBar thisUser={props.location.thisUser} />
            <div id="mainView">
                <GroupChatViewContent thisUser={props.location.thisUser}/>
            </div>
        </div>
    );
}