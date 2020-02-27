import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar";
import CreateGroupViewContent from "./views-content-components/CreateGroupViewContent";
export default function CreateGroupView(props){
    return(
        <div id="mainWrapper">
            <SideBar thisUser={props.location.thisUser} />
            <div id="mainView">
                <CreateGroupViewContent thisUser={props.state.thisUser}/>
            </div>
        </div>
    );
}