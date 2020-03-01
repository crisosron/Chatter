import React from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar";
import SearchViewContent from "./views-content-components/SearchViewContent";
export default function SearchView(props){
    return(
        <div id="mainWrapper">
            <SideBar />
            <div id="mainView">
                <SearchViewContent />
            </div>
        </div>
    );
}