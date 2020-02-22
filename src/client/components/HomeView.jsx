import React from "react";
import "../css-files/chat-divs.css";
import SideBar from "./SideBar";
import HomeViewContent from "./views-content-components/HomeViewContent";
export default function HomeView(props){
    return(
        <div id="mainWrapper">
            <SideBar thisUser={props.location.state.thisUser} />
            <div id="mainView">
                <HomeViewContent thisUser={props.location.state.thisUser}/>
            </div>
        </div>
    );
}