import React from "react";
import "./side-bar-sub-components-css-files/search-bar-styles.css"
export default function SearchBar(props){
    //TODO: Add listener for every key - Should re-render with new results everytime it re-renders
    return(
        <div id="searchBar">
            <input id="searchBarInput" type="text" placeholder={"Search " + props.mode}></input>
        </div>
    );
}