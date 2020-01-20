import React, {Component} from "react";
import SEARCH_EVENTS from "../../../events/search-events";
import socket from "../../../index";
import "./side-bar-sub-components-css-files/search-bar-styles.css"
export default class SearchBar extends Component{
    componentDidMount(){
        const searchBarInput = document.getElementById("searchBarInput");
        searchBarInput.addEventListener("keydown", (e) => {
            if(e.keyCode !== 13) return;

            // The way the querying works is that, we should send a socket io event back to the server with the contents of searchBarInput
            // then the server will query for results with the given value, then send those results to SideBar so that the current
            // CommunicationEntities can be updated

            const value = searchBarInput.value;

            if(value === "") return;

            if(this.props.mode === "Friends"){
                socket.emit(SEARCH_EVENTS.SEARCH_FRIENDS, {stringQuery: value});
                return;
            }

            socket.emit(SEARCH_EVENTS.SEARCH_GROUPS, {stringQuery: value});
        });
    }

    render(){
        return(
            <div id="searchBar">
                <input id="searchBarInput" type="text" placeholder={"Search " + this.props.mode}></input>
            </div>
        );
    }
}
// export default function SearchBar(props){

//     useEffect(() => {
//         const searchBarInput = document.getElementById("searchBarInput");
//         searchBarInput.addEventListener("keydown", (e) => {
//             if(e.keyCode !== 13) return; // If not enter key pressed, ignore

//             // The way the querying works is that, we should send a socket io event back to the server with the contents of searchBarInput
//             // then the server will query for results with the given value, then send those results to SideBar so that the current
//             // CommunicationEntities can be updated
//             const value = searchBarInput.value;
//             if(value === "") {
//                 console.log("Empty search string, returning");
//                 return;
//             };

//             if(props.mode === "Friends"){
//                 socket.emit(SEARCH_EVENTS.SEARCH_FRIENDS, {stringQuery: value});
//                 return;
//             }

//             socket.emit(SEARCH_EVENTS.SEARCH_GROUPS, {stringQuery: value});
//         }, []);
//     });

//     return(
//         <div id="searchBar">
//             <input id="searchBarInput" type="text" placeholder={"Search " + props.mode}></input>
//         </div>
//     );
// }