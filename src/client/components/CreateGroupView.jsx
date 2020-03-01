import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar";
import CreateGroupViewContent from "./views-content-components/CreateGroupViewContent";
export default function CreateGroupView(props){
    return(
        <div id="mainWrapper">
            <SideBar />
            <div id="mainView">
                <CreateGroupViewContent />
            </div>
        </div>
    );
}