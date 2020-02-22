import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar";
import IndividualChatViewContent from "./views-content-components/IndividualChatViewContent";
export default function IndividualChatView(props){
    return(
        <div id="mainWrapper">
            <SideBar thisUser={props.location.state.thisUser} />
            <div id="mainView">
                <IndividualChatViewContent thisUser={props.location.state.thisUser}/>
            </div>
        </div>
    );
}