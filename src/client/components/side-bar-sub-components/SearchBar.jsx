import React from "react";
import SEARCH_EVENTS from "../../../events/search-events";
import socket from "../../../index";
import {store} from "react-notifications-component";
import "./side-bar-sub-components-css-files/search-bar-styles.css";

export default class SearchBar extends React.Component{
    componentDidMount(){
        const searchBarInput = document.getElementById("searchBarInput");
        searchBarInput.addEventListener("keydown", (e) => {
            if(e.keyCode === 8 && searchBarInput.value.length === 1){
                this.props.resetDefaultCommEntities();
            }

            // If not enter key pressed, exit the method
            if(e.keyCode !== 13) return; 

            if(searchBarInput.value === ""){
                this.props.resetDefaultCommEntities();
                return;
            }

            if(this.props.mode === "Friends") socket.emit(SEARCH_EVENTS.SEARCH_FRIENDS, {stringQuery: searchBarInput.value});
            else if(this.props.mode === "Groups") socket.emit(SEARCH_EVENTS.SEARCH_GROUPS, {stringQuery: searchBarInput.value});
            else socket.emit(SEARCH_EVENTS.PERFORM_GENERAL_SEARCH, {stringQuery: searchBarInput.value});
            
        });

        // Setting up socket.io event listeners for SEARCH_EVENT responses from server
        socket.on(SEARCH_EVENTS.DELIVER_RESULTS, data => {
            let newCommEntities = [];
            for(let i = 0; i < data.results.length; i++) newCommEntities.push(data.results[i]);
            this.props.updateCommEntities(newCommEntities);
        });

        socket.on(SEARCH_EVENTS.NO_RESULTS_FOUND, data => {
            store.addNotification(data.notification);
        });
    }

    handleClearButtonClicked = () => {
        document.getElementById("searchBarInput").value = "";
        this.props.resetDefaultCommEntities();
    }

    render(){
        return(
            <div id="searchBar">
                <input id="searchBarInput" type="text" placeholder={"Search"}></input>
                <button id="searchBarClearButton" onClick={this.handleClearButtonClicked}>Clear</button>
            </div>
        );
    }
}