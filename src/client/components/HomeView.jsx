import React from "react";
import "../css-files/chat-divs.css";
import SideBar from "./SideBar";
import HomeViewContent from "./views-content-components/HomeViewContent";

// HomeView is the entry point
export default function HomeView(props){
    return(
        <div id="mainWrapper">
            {/* Note that thisUser is provided to HomeView via props.location.state.thisUser since the user is redirected to HomeView directly from the Login component
            Other View components can access thisUser via props.location.thisUser as the other View components are accessible via the SideBar component and provides thisUser
            via a Link element (See SideBar).*/}
            <SideBar />
            <div id="mainView">
                <HomeViewContent />
            </div>
        </div>
    );
}