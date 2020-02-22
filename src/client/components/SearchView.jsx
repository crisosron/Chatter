import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar";
import SearchViewContent from "./views-content-components/SearchViewContent";
export default function SearchView(props){
    return(
        <div id="mainWrapper">
            <SideBar thisUser={props.location.state.thisUser} />
            <div id="mainView">
                <SearchViewContent thisUser={props.location.state.thisUser}/>
            </div>
        </div>
    );
}