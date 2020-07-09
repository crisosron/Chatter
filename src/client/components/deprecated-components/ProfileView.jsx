// ################# DEPRECATED (SEE ISSUE #18) FOR DETAILS ################# //
import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "../SideBar";
import ProfileViewContent from "./ProfileViewContent";
export default function ProfileView(props){
    return(
        <div id="mainWrapper">
            <SideBar />
            <div id="mainView">
                <ProfileViewContent />
            </div>
        </div>
    );
}