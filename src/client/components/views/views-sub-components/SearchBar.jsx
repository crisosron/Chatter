import React from "react";
import SEARCH_EVENTS from "../../../../events/search-events";
import socket from "../../../../index";
import "./views-sub-components-css-files/search-bar-styles.css";
import NotificationHandler from "../../../notification-handler";

export default class SearchBar extends React.Component{
    componentDidMount(){
        const searchBarInput = document.getElementById(this.props.id === undefined ? "searchBarInput":this.props.id);
        searchBarInput.addEventListener("keydown", (e) => {
            if(e.keyCode === 8 && searchBarInput.value.length === 1){
                this.props.resetCommEntities();
            }

            // If not enter key pressed, exit the method
            if(e.keyCode !== 13) return; 

            if(searchBarInput.value === ""){
                this.props.resetCommEntities();
                return;
            }

            // Emitting to server to perform search based on the mode selected
            if(this.props.mode === "Friends") {
                socket.emit(SEARCH_EVENTS.SEARCH_FRIENDS, {
                    stringQuery: searchBarInput.value,
                    thisUser: this.props.thisUser
                });
            }

            else if(this.props.mode === "Groups"){
                socket.emit(SEARCH_EVENTS.SEARCH_GROUPS, {
                    stringQuery: searchBarInput.value,
                    thisUser: this.props.thisUser
                });
            }

            else if(this.props.mode === "Users"){
                socket.emit(SEARCH_EVENTS.SEARCH_UNKNOWN_USERS, {
                    stringQuery: searchBarInput.value,
                    thisUser: this.props.thisUser
                });
            }

            else if(this.props.mode === "Groups"){
                socket.emit(SEARCH_EVENTS.SEARCH_UNKNOWN_GROUPS, {
                    stringQuery: searchBarInput.value,
                    thisUser: this.props.thisUser
                });
            }
        });

        // Setting up socket.io event listeners for SEARCH_EVENT responses from server
        socket.on(SEARCH_EVENTS.DELIVER_RESULTS, data => {
            this.props.updateCommEntities(data.results);
        });

        socket.on(SEARCH_EVENTS.DELIVER_UNKNOWN_USER_SEARCH_RESULTS, data => {
            if(data.resultingUserCommEntities === undefined) return;
            this.props.updateCommEntities(data.resultingUserCommEntities);
        });

        socket.on(SEARCH_EVENTS.DELIVER_UNKNOWN_GROUP_SEARCH_RESULTS, data => {
            this.props.updateCommEntities(data.resultingGroupCommEntities);
        });

        socket.on(SEARCH_EVENTS.NO_RESULTS_FOUND, data => {
            NotificationHandler.createNotification("danger", "No results found", data.message);
        });
    }

    componentWillUnmount(){
        socket.removeEventListener(SEARCH_EVENTS.NO_RESULTS_FOUND);
    }

    render(){
        return(
            <div className="searchBarWrapper"> {/*Using class here for better reusability of this component (same with input elem below)*/}
                <input id={this.props.id === undefined ? "searchBarInput" : this.props.id} style={this.props.style} className="searchBarInputField" type="text" placeholder={"Search " + this.props.mode}></input>
            </div>
        );
    }
}