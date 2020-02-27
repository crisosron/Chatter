import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar";
import IndividualChatViewContent from "./views-content-components/IndividualChatViewContent";
export default function IndividualChatView(props){
    console.log(props);
    return(
        <div id="mainWrapper">
            <SideBar thisUser={props.location.thisUser} />
            <div id="mainView">
                <IndividualChatViewContent thisUser={props.location.thisUser}/>
            </div>
        </div>
    );
}