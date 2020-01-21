import React, {useEffect} from "react";
import SEARCH_EVENTS from "../../../events/search-events";
import socket from "../../../index";
import {store} from "react-notifications-component";
import "./side-bar-sub-components-css-files/search-bar-styles.css";
export default function SearchBar(props){
    console.log(`SearchBar props: ${props}`)
    useEffect(() => {
        const searchBarInput = document.getElementById("searchBarInput");
        searchBarInput.addEventListener("keydown", (e) => {
            console.log("Handling keydown");
            if(e.keyCode === 8 && searchBarInput.value.length === 1){
                // TODO: Invoke clear button press here
            }

            // If not enter key pressed, exit the method
            if(e.keyCode !== 13) return; 

            // The way the querying works is that, we should send a socket io event back to the server with the contents of searchBarInput
            // then the server will query for results with the given value, then send those results to SideBar so that the current
            // CommunicationEntities can be updated

            if(searchBarInput.value === ""){
                // socket.emit(SEARCH_EVENTS.INVALID_SEARCH_STRING)
                return;
            }

            if(props.mode === "Friends"){
                socket.emit(SEARCH_EVENTS.SEARCH_FRIENDS, {stringQuery: searchBarInput.value});
                return;
            }

            socket.emit(SEARCH_EVENTS.SEARCH_GROUPS, {stringQuery: searchBarInput.value});
        });

        // Setting up socket.io event listeners for SEARCH_EVENT responses from server
        socket.on(SEARCH_EVENTS.DELIVER_RESULTS, data => {
            let newCommEntities = [];
            for(let i = 0; i < data.results.length; i++) newCommEntities.push(data.results[i]);
            props.updateCommEntities(newCommEntities);
        });

        socket.on(SEARCH_EVENTS.NO_RESULTS_FOUND, data => {
            store.addNotification(data.notification);
        });

    }, []);

    return(
        <div id="searchBar">
            <input id="searchBarInput" type="text" placeholder={"Search " + props.mode}></input>
            <button id="searchBarClearButton">Clear</button>
        </div>
    );
}