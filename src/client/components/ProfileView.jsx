import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar";
import ProfileViewContent from "./views-content-components/ProfileViewContent";
export default function ProfileView(props){
    return(
        <div id="mainWrapper">
            <SideBar thisUser={props.location.state.thisUser} />
            <div id="mainView">
                <ProfileViewContent thisUser={props.location.state.thisUser}/>
            </div>
        </div>
    );
}